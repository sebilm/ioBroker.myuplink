import axios from 'axios';
import * as fs from 'fs';
import jsonfile from 'jsonfile';
import type * as session from './models/Session';
import type { Logger } from './types';

/**
 * Options for authentication.
 */
export interface AuthOptions {
    /**
     * The client ID for authentication.
     */
    clientId: string;
    /**
     * The client secret for authentication.
     */
    clientSecret: string;
    /**
     * Whether to use the authorization code grant flow.
     */
    useAuthorizationCodeGrant: boolean;
    /**
     * The redirect URI for the authorization code grant flow.
     */
    redirectUri: string;
    /**
     * The authorization code for the authorization code grant flow.
     */
    authCode: string;
    /**
     * The file path to store the session.
     */
    sessionStoreFilePath: string;
    /**
     * The base URL for the API.
     */
    baseUrl: string;
    /**
     * The scope for the authentication.
     */
    scope: string;
    /**
     * The timeout for the API requests.
     */
    timeout: number;
    /**
     * The user agent for the API requests.
     */
    userAgent: string;
    /**
     * The time before expiry to renew the token.
     */
    renewBeforeExpiry: number;
}

interface Session extends session.Session {
    expires_at?: number;
    authCode?: string;
}

/**
 * AuthRepository handles the authentication process, including token retrieval and session management.
 */
export class AuthRepository {
    /**
     * Creates an instance of AuthRepository.
     *
     * @param options - The authentication options.
     * @param log - The logger instance.
     */
    constructor(options: AuthOptions, log: Logger) {
        this.log = log;
        this.options = options;

        axios.defaults.baseURL = options.baseUrl;
        axios.defaults.headers.common['user-agent'] = options.userAgent;
        axios.defaults.timeout = options.timeout;

        if (this.options.useAuthorizationCodeGrant) {
            this.readSessionFromFile();
            if (this.hasNewAuthCode()) {
                this.setEmptySession();
            }
        }
    }

    private log: Logger;
    private options: AuthOptions;
    private auth: Session | undefined;

    /**
     * Retrieves the access token, refreshing it if necessary.
     *
     * @returns The access token.
     * @throws {Error} If unable to retrieve the access token.
     */
    async getAccessTokenAsync(): Promise<string> {
        this.log.debug('Get access token');

        if (!this.hasAccessToken()) {
            if (this.options.useAuthorizationCodeGrant) {
                if (this.options.authCode) {
                    const token = await this.getAuthorizationCodeGrantTokenAsync(this.options.authCode);
                    await this.setSesssionAsync(token);
                } else {
                    this.log.error('You need to get and set a new Auth Code. You can do this in the adapter setting.');
                    throw new Error('You need to get and set a new Auth Code. You can do this in the adapter setting.');
                }
            } else {
                const token = await this.getClientCredentialsGrantTokenAsync();
                await this.setSesssionAsync(token);
            }
        }
        if (this.isTokenExpired()) {
            if (this.options.useAuthorizationCodeGrant) {
                const token = await this.refreshTokenAsync();
                await this.setSesssionAsync(token);
            } else {
                const token = await this.getClientCredentialsGrantTokenAsync();
                await this.setSesssionAsync(token);
            }
        }

        const accessToken = this.auth?.access_token;
        if (accessToken) {
            return accessToken;
        }
        throw new Error('No access token!');
    }

    private async getAuthorizationCodeGrantTokenAsync(authCode: string): Promise<Session> {
        this.log.debug('Get token via Authorization Code Grant Flow');
        const data = {
            grant_type: 'authorization_code',
            client_id: this.options.clientId,
            client_secret: this.options.clientSecret,
            code: authCode,
            redirect_uri: this.options.redirectUri,
            scope: this.options.scope,
        };
        const session = await this.postTokenRequestAsync(data);
        this.log.debug(
            `Token received. Refresh Token received: ${session.refresh_token != undefined}. Access Token expires in: ${session.expires_in}`,
        );
        if (!session.refresh_token) {
            this.log.warn('Receive Access Token without Refresh Token.');
        }
        return session;
    }

    private async getClientCredentialsGrantTokenAsync(): Promise<Session> {
        this.log.debug('Get token via Client Credentials Grant Flow');
        const data = {
            grant_type: 'client_credentials',
            client_id: this.options.clientId,
            client_secret: this.options.clientSecret,
            scope: this.options.scope,
        };
        const session = await this.postTokenRequestAsync(data);
        this.log.debug(
            `Token received. Refresh Token received: ${session.refresh_token != undefined}. Access Token expires in: ${session.expires_in}`,
        );
        return session;
    }

    private async refreshTokenAsync(): Promise<Session> {
        if (!this.auth?.refresh_token) {
            throw new Error('Cannot refresh the token because no refresh token is available.');
        }

        this.log.debug('Get token via Refresh Token Grant Flow');
        const data = {
            grant_type: 'refresh_token',
            refresh_token: this.auth?.refresh_token,
            client_id: this.options.clientId,
            client_secret: this.options.clientSecret,
        };
        const session = await this.postTokenRequestAsync(data);
        this.log.debug(
            `Token received. Refresh Token received: ${session.refresh_token != undefined}. Access Token expires in: ${session.expires_in}`,
        );
        if (!session.refresh_token) {
            this.log.warn('Receive Access Token without Refresh Token.');
        }
        return session;
    }

    private async postTokenRequestAsync(body: any): Promise<Session> {
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
            //this.log.silly(`TokenData: ${JSON.stringify(data, null, ' ')}`);
            return data;
        } catch (error) {
            throw this.checkError(url, error);
        }
    }

    private checkError(suburl: string, error: unknown): unknown {
        this.log.error(`error from ${suburl}`);
        this.log.error(JSON.stringify(error, null, ' '));
        if (axios.isAxiosError(error)) {
            const axiosError = error as axios.AxiosError;
            if (axiosError.response != null) {
                if (axiosError.response.status == 401) {
                    this.setEmptySession();
                }
                if (axiosError.response.data != null) {
                    const responseText = JSON.stringify(axiosError.response.data, null, ' ');
                    const errorMessage = `${axiosError.response.statusText}: ${responseText}`;
                    return new Error(errorMessage);
                }
                return new Error(axiosError.response.statusText);
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

    private async setSesssionAsync(auth: Session): Promise<void> {
        this.log.debug('Set session');
        if (auth.authCode == null) {
            auth.authCode = this.options.authCode;
        }
        this.auth = auth;
        if (!this.options.sessionStoreFilePath || !this.options.useAuthorizationCodeGrant) {
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
        this.log.debug(`Is token expired: ${expired}`);
        return expired;
    }

    private hasAccessToken(): boolean {
        const hasAccessToken = !!this.auth?.access_token;
        this.log.debug(`Has access token: ${hasAccessToken}`);
        return hasAccessToken;
    }
}
