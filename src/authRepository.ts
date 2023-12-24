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

        this.readSessionFromFile();
        if (this.hasNewAuthCode()) {
            this.setEmptySession();
        }
    }

    private log: ioBroker.Log;
    private options: AuthOptions;
    private auth: Session | undefined;

    async getAccessToken(): Promise<string | undefined> {
        this.log.debug('Get access token');

        if (!this.hasAccessToken()) {
            if (this.options.authCode) {
                const token = await this.getToken(this.options.authCode);
                await this.setSesssion(token);
            } else {
                this.log.error('You need to get and set a new Auth-Code. You can do this in the adapter setting.');
                return undefined;
            }
        }
        if (this.isTokenExpired()) {
            const token = await this.refreshToken();
            await this.setSesssion(token);
        }

        return this.auth?.access_token;
    }

    private async getToken(authCode: string): Promise<Session> {
        this.log.debug('Get token from the API');
        const data = {
            grant_type: 'authorization_code',
            client_id: this.options.clientId,
            client_secret: this.options.clientSecret,
            code: authCode,
            redirect_uri: this.options.redirectUri,
            scope: this.options.scope,
        };
        const session = await this.postTokenRequest(data);
        this.log.debug(`Token received. Refresh Token: ${session.refresh_token != undefined}. Expires In: ${session.expires_in}`);
        if (!session.refresh_token) {
            this.log.warn('Received token without Refresh Token.');
        }
        return session;
    }

    private async refreshToken(): Promise<Session> {
        this.log.debug('Refresh token at the API');
        const data = {
            grant_type: 'refresh_token',
            refresh_token: this.auth?.refresh_token,
            client_id: this.options.clientId,
            client_secret: this.options.clientSecret,
        };
        const session = await this.postTokenRequest(data);
        this.log.debug(`Token refreshed. Refresh Token: ${session.refresh_token != undefined}. Expires In: ${session.expires_in}`);
        if (!session.refresh_token) {
            this.log.warn('Received refreshed token without Refresh Token.');
        }
        return session;
    }

    private async postTokenRequest(body: any): Promise<Session> {
        const stringBody = new URLSearchParams(body).toString();
        const url = '/oauth/token';
        this.log.silly(`send to ${url}: ${stringBody}`);
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

    private checkError(suburl: string, error: unknown): Error | unknown {
        this.log.error(`error from ${suburl}`);
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response != null) {
                if (axiosError.response.status == 401) {
                    this.setEmptySession();
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

    private readSessionFromFile(): void {
        if (!this.options.sessionStoreFilePath || !fs.existsSync(this.options.sessionStoreFilePath)) {
            return;
        }
        this.log.debug(`Read session from file '${this.options.sessionStoreFilePath}'`);
        this.auth = jsonfile.readFileSync(this.options.sessionStoreFilePath, { throws: false });
    }

    private async setSesssion(auth: Session): Promise<void> {
        this.log.debug('Set session');
        if (auth.authCode == null) {
            auth.authCode = this.options.authCode;
        }
        this.auth = auth;
        if (!this.options.sessionStoreFilePath) {
            return;
        }
        this.log.debug(`Write session to file '${this.options.sessionStoreFilePath}'`);
        await jsonfile.writeFile(this.options.sessionStoreFilePath, this.auth, { spaces: 2 });
    }

    private hasNewAuthCode(): boolean {
        const hasNewAuthCode = this.auth?.authCode != this.options.authCode;
        this.log.debug(`Has new auth code: ${hasNewAuthCode}`);
        return hasNewAuthCode;
    }

    private setEmptySession(): void {
        this.log.debug('Set empty session.');
        this.auth = { authCode: this.options.authCode } as Session;
    }

    private isTokenExpired(): boolean {
        const expired = (this.auth?.expires_at || 0) < Date.now() + this.options.renewBeforeExpiry;
        this.log.debug('Is token expired: ' + expired);
        return expired;
    }

    private hasAccessToken(): boolean {
        const hasAccessToken = !!this.auth?.access_token;
        this.log.debug('Has access token: ' + hasAccessToken);
        return hasAccessToken;
    }
}
