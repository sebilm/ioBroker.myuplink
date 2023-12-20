import axios, { AxiosError } from 'axios';
import * as fs from 'fs';
import jsonfile from 'jsonfile';
import * as session from './models/Session';

export default interface AuthOptions {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    authCode: string;
    sessionStoreFilePath: string;
    baseUrl: string;
    scope: string;
    timeout: number;
    userAgent: string;
    renewBeforeExpiry: number;
}

interface Session extends session.Session {
    expires_at?: number;
    authCode?: string;
}

export class AuthRepository {
    constructor(options: AuthOptions, log: ioBroker.Log) {
        this.log = log;
        this.options = options;

        axios.defaults.baseURL = options.baseUrl;
        axios.defaults.headers.common['user-agent'] = options.userAgent;
        axios.defaults.timeout = options.timeout;
    }

    private log: ioBroker.Log;
    private options: AuthOptions;
    private auth: Session | null | undefined;

    async getAccessToken(): Promise<string | undefined | null> {
        this.log.debug('getAccessToken()');

        if (await this.hasNewAuthCode()) {
            await this.clearSesssion();
        }
        if (!(await this.hasAccessToken())) {
            if (this.options.authCode) {
                const token = await this.getToken(this.options.authCode);
                await this.setSesssion(token);
            } else {
                this.log.error('You need to get and set a new Auth-Code. You can do this in the adapter setting.');
                return null;
            }
        }
        if (await this.isTokenExpired()) {
            this.log.debug('Token is expired / expires soon - refreshing');
            const token = await this.getRefreshToken();
            await this.setSesssion(token);
        }

        return await this.getSessionAccessToken();
    }

    private async getToken(authCode: string): Promise<Session> {
        this.log.debug('getToken()');
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
        this.log.debug('getRefreshToken()');
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
        this.log.debug(`send to ${url}: ${stringBody}`);
        try {
            const { data } = await axios.post<Session>(url, stringBody, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const expiresIn = data.expires_in ?? 1800;
            data.expires_at = Date.now() + expiresIn * 1000;
            this.log.debug(`TokenData: ${JSON.stringify(data, null, ' ')}`);
            return data;
        } catch (error) {
            throw await this.checkError(url, error);
        }
    }

    private async checkError(suburl: string, error: unknown): Promise<unknown> {
        this.log.error(`error from ${suburl}`);
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
        this.log.debug('Read session.');
        if (!this.options.sessionStoreFilePath || !fs.existsSync(this.options.sessionStoreFilePath)) {
            return;
        }
        this.auth = await jsonfile.readFile(this.options.sessionStoreFilePath, { throws: false });
    }

    private async getSessionAuthCode(): Promise<string | undefined | null> {
        this.log.silly('Get session authCode.');
        if (this.auth == null) {
            await this.readSession();
        }
        return this.auth ? this.auth.authCode : null;
    }

    private async getSessionAccessToken(): Promise<string | undefined | null> {
        this.log.silly('Get session access_token.');
        if (this.auth == null) {
            await this.readSession();
        }
        return this.auth ? this.auth.access_token : null;
    }

    private async getSessionRefreshToken(): Promise<string | undefined | null> {
        this.log.silly('Get session refresh_token.');
        if (this.auth == null) {
            await this.readSession();
        }
        return this.auth ? this.auth.refresh_token : null;
    }

    private async getSessionExpires(): Promise<number | undefined | null> {
        this.log.silly('Get session expires.');
        if (this.auth == null) {
            await this.readSession();
        }
        return this.auth ? this.auth.expires_at : null;
    }

    private async setSesssion(auth: Session): Promise<void> {
        this.log.debug('Set session.');
        if (auth.authCode == null) {
            auth.authCode = this.options.authCode;
        }
        this.auth = auth;
        this.log.debug(`sessionStoreFilePath: ${this.options.sessionStoreFilePath}`);
        if (!this.options.sessionStoreFilePath) {
            return;
        }
        await jsonfile.writeFile(this.options.sessionStoreFilePath, this.auth, { spaces: 2 });
    }

    private async clearSesssion(): Promise<void> {
        this.log.debug('Clear session.');
        await this.setSesssion({});
    }

    private async hasNewAuthCode(): Promise<boolean> {
        const authCode = await this.getSessionAuthCode();
        const hasNewAuthCode = authCode != null && authCode != this.options.authCode;
        this.log.debug('Has new auth code: ' + hasNewAuthCode);
        return hasNewAuthCode;
    }

    private async isTokenExpired(): Promise<boolean> {
        const expired = ((await this.getSessionExpires()) || 0) < Date.now() + this.options.renewBeforeExpiry;
        this.log.debug('Is token expired: ' + expired);
        return expired;
    }

    private async hasAccessToken(): Promise<boolean> {
        const hasToken = !!(await this.getSessionAccessToken());
        this.log.debug('Has access token: ' + hasToken);
        return hasToken;
    }
}
