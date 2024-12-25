/**
 * Represents a session with authentication tokens and related information.
 */
export interface Session {
    /**
     * The type of the token.
     */
    token_type?: string;
    /**
     * The access token.
     */
    access_token?: string;
    /**
     * The refresh token.
     */
    refresh_token?: string;
    /**
     * The scope of the token.
     */
    scope?: string;
    /**
     * The number of seconds until the token expires.
     */
    expires_in?: number;
}
