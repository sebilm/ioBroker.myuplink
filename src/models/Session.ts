export interface Session {
    token_type?: string;
    access_token?: string;
    refresh_token?: string;
    scope?: string;
    expires_in?: number;
}
