import * as utils from '@iobroker/adapter-core';
import axios, { AxiosError } from 'axios';
import * as fs from 'fs';
import jsonfile from 'jsonfile';
import * as session from './models/Session';

export default interface Options {
    authCode: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    sessionStore: string;
    baseUrl: string;
    scope: string;
    timeout: number;
    userAgent: string;
    renewBeforeExpiry: number;
}

interface Session extends session.Session {
    expires_at?: number;
    expires_in?: number;
    authCode?: string;
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    scope?: string;
}

export class AuthRepository {
    constructor(options: Options, adapter: utils.AdapterInstance) {
        this.adapter = adapter;
        this.options = options;

        axios.defaults.baseURL = options.baseUrl;
        axios.defaults.headers.common['user-agent'] = options.userAgent;
        axios.defaults.timeout = options.timeout;
    }

    private adapter: utils.AdapterInstance;
    private options: Options;
    private auth: Session | null | undefined;

    async getAccessToken(): Promise<string | undefined | null> {
        this.adapter.log.debug('getAccessToken() called');

        if (await this.hasNewAuthCode()) {
            await this.clearSesssion();
        }
        if (!(await this.hasRefreshToken())) {
            if (this.options.authCode) {
                const token = await this.getToken(this.options.authCode);
                await this.setSesssion(token);
            } else {
                this.adapter.log.error('You need to get and set a new Auth-Code. You can do this in the adapter setting.');
                return null;
            }
        }
        if (await this.isTokenExpired()) {
            this.adapter.log.debug('Token is expired / expires soon - refreshing');
            const token = await this.getRefreshToken();
            await this.setSesssion(token);
        }

        return await this.getSessionAccessToken();
    }

    private async getToken(authCode: string): Promise<Session> {
        this.adapter.log.debug('token()');
        const data = {
            grant_type: 'authorization_code',
            client_id: this.options.clientId,
            client_secret: this.options.clientSecret,
            code: authCode,
            redirect_uri: this.options.redirectUri,
            scope: this.options.scope,
        };
        return await this.postTokenRequest(data);
    }

    private async getRefreshToken(): Promise<Session> {
        this.adapter.log.debug('Refresh token.');
        const data = {
            grant_type: 'refresh_token',
            refresh_token: await this.getSessionRefreshToken(),
            client_id: this.options.clientId,
            client_secret: this.options.clientSecret,
        };
        return await this.postTokenRequest(data);
    }

    private async postTokenRequest(body: any): Promise<Session> {
        const stringBody = new URLSearchParams(body).toString();
        const url = '/oauth/token';
        try {
            const { data } = await axios.post<Session>(url, stringBody, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const expiresIn = data.expires_in ?? 1800;
            data.expires_at = Date.now() + expiresIn * 1000;
            return data;
        } catch (error) {
            throw await this.checkError(url, error);
        }
    }

    private async checkError(suburl: string, error: unknown): Promise<unknown> {
        this.adapter.log.error(`error from ${suburl}`);
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response != null) {
                if (axiosError.response.status == 401) {
                    await this.clearSesssion();
                }
                if (axiosError.response.data != null) {
                    const responseText = JSON.stringify(axiosError.response.data, null, ' ');
                    const errorMessage = `${axiosError.response.statusText}: ${responseText}`;
                    return new Error(errorMessage);
                } else {
                    return new Error(axiosError.response.statusText);
                }
            }
        }
        return error;
    }

    private async readSession(): Promise<void> {
        this.adapter.log.debug('Read session.');
        if (!this.options.sessionStore || !fs.existsSync(this.options.sessionStore)) {
            return;
        }
        this.auth = await jsonfile.readFile(this.options.sessionStore, { throws: false });
    }

    private async getSessionAuthCode(): Promise<string | undefined | null> {
        this.adapter.log.silly('Get session authCode.');
        if (this.auth == null) {
            await this.readSession();
        }
        return this.auth ? this.auth.authCode : null;
    }

    private async getSessionAccessToken(): Promise<string | undefined | null> {
        this.adapter.log.silly('Get session access_token.');
        if (this.auth == null) {
            await this.readSession();
        }
        return this.auth ? this.auth.access_token : null;
    }

    private async getSessionRefreshToken(): Promise<string | undefined | null> {
        this.adapter.log.silly('Get session refresh_token.');
        if (this.auth == null) {
            await this.readSession();
        }
        return this.auth ? this.auth.refresh_token : null;
    }

    private async getSessionExpires(): Promise<number | undefined | null> {
        this.adapter.log.silly('Get session expires.');
        if (this.auth == null) {
            await this.readSession();
        }
        return this.auth ? this.auth.expires_at : null;
    }

    private async setSesssion(auth: Session): Promise<void> {
        this.adapter.log.debug('Set session.');
        if (auth.authCode == null) {
            auth.authCode = this.options.authCode;
        }
        this.auth = auth;
        if (!this.options.sessionStore) {
            return;
        }
        await jsonfile.writeFile(this.options.sessionStore, this.auth, { spaces: 2 });
    }

    private async clearSesssion(): Promise<void> {
        this.adapter.log.debug('Clear session.');
        await this.setSesssion({});
    }

    private async hasNewAuthCode(): Promise<boolean> {
        const authCode = await this.getSessionAuthCode();
        const hasNewAuthCode = authCode != null && authCode != this.options.authCode;
        this.adapter.log.debug('Has new auth code: ' + hasNewAuthCode);
        return hasNewAuthCode;
    }

    private async isTokenExpired(): Promise<boolean> {
        const expired = ((await this.getSessionExpires()) || 0) < Date.now() + this.options.renewBeforeExpiry;
        this.adapter.log.debug('Is token expired: ' + expired);
        return expired;
    }

    private async hasRefreshToken(): Promise<boolean> {
        const hasToken = !!(await this.getSessionRefreshToken());
        this.adapter.log.debug('Has refresh token: ' + hasToken);
        return hasToken;
    }
}
