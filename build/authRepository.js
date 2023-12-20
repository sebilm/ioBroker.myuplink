"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const jsonfile_1 = __importDefault(require("jsonfile"));
class AuthRepository {
    constructor(options, log) {
        this.log = log;
        this.options = options;
        axios_1.default.defaults.baseURL = options.baseUrl;
        axios_1.default.defaults.headers.common['user-agent'] = options.userAgent;
        axios_1.default.defaults.timeout = options.timeout;
    }
    async getAccessToken() {
        this.log.debug('getAccessToken()');
        if (await this.hasNewAuthCode()) {
            await this.clearSesssion();
        }
        if (!(await this.hasAccessToken())) {
            if (this.options.authCode) {
                const token = await this.getToken(this.options.authCode);
                await this.setSesssion(token);
            }
            else {
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
    async getToken(authCode) {
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
    async getRefreshToken() {
        this.log.debug('getRefreshToken()');
        const data = {
            grant_type: 'refresh_token',
            refresh_token: await this.getSessionRefreshToken(),
            client_id: this.options.clientId,
            client_secret: this.options.clientSecret,
        };
        return await this.postTokenRequest(data);
    }
    async postTokenRequest(body) {
        const stringBody = new URLSearchParams(body).toString();
        const url = '/oauth/token';
        this.log.debug(`send to ${url}: ${stringBody}`);
        try {
            const { data } = await axios_1.default.post(url, stringBody, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const expiresIn = data.expires_in ?? 1800;
            data.expires_at = Date.now() + expiresIn * 1000;
            this.log.debug(`TokenData: ${JSON.stringify(data, null, ' ')}`);
            return data;
        }
        catch (error) {
            throw await this.checkError(url, error);
        }
    }
    async checkError(suburl, error) {
        this.log.error(`error from ${suburl}`);
        if (axios_1.default.isAxiosError(error)) {
            const axiosError = error;
            if (axiosError.response != null) {
                if (axiosError.response.status == 401) {
                    await this.clearSesssion();
                }
                if (axiosError.response.data != null) {
                    const responseText = JSON.stringify(axiosError.response.data, null, ' ');
                    const errorMessage = `${axiosError.response.statusText}: ${responseText}`;
                    return new Error(errorMessage);
                }
                else {
                    return new Error(axiosError.response.statusText);
                }
            }
        }
        return error;
    }
    async readSession() {
        this.log.debug('Read session.');
        if (!this.options.sessionStoreFilePath || !fs.existsSync(this.options.sessionStoreFilePath)) {
            return;
        }
        this.auth = await jsonfile_1.default.readFile(this.options.sessionStoreFilePath, { throws: false });
    }
    async getSessionAuthCode() {
        this.log.silly('Get session authCode.');
        if (this.auth == null) {
            await this.readSession();
        }
        return this.auth ? this.auth.authCode : null;
    }
    async getSessionAccessToken() {
        this.log.silly('Get session access_token.');
        if (this.auth == null) {
            await this.readSession();
        }
        return this.auth ? this.auth.access_token : null;
    }
    async getSessionRefreshToken() {
        this.log.silly('Get session refresh_token.');
        if (this.auth == null) {
            await this.readSession();
        }
        return this.auth ? this.auth.refresh_token : null;
    }
    async getSessionExpires() {
        this.log.silly('Get session expires.');
        if (this.auth == null) {
            await this.readSession();
        }
        return this.auth ? this.auth.expires_at : null;
    }
    async setSesssion(auth) {
        this.log.debug('Set session.');
        if (auth.authCode == null) {
            auth.authCode = this.options.authCode;
        }
        this.auth = auth;
        this.log.debug(`sessionStoreFilePath: ${this.options.sessionStoreFilePath}`);
        if (!this.options.sessionStoreFilePath) {
            return;
        }
        await jsonfile_1.default.writeFile(this.options.sessionStoreFilePath, this.auth, { spaces: 2 });
    }
    async clearSesssion() {
        this.log.debug('Clear session.');
        await this.setSesssion({});
    }
    async hasNewAuthCode() {
        const authCode = await this.getSessionAuthCode();
        const hasNewAuthCode = authCode != null && authCode != this.options.authCode;
        this.log.debug('Has new auth code: ' + hasNewAuthCode);
        return hasNewAuthCode;
    }
    async isTokenExpired() {
        const expired = ((await this.getSessionExpires()) || 0) < Date.now() + this.options.renewBeforeExpiry;
        this.log.debug('Is token expired: ' + expired);
        return expired;
    }
    async hasAccessToken() {
        const hasToken = !!(await this.getSessionAccessToken());
        this.log.debug('Has access token: ' + hasToken);
        return hasToken;
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=authRepository.js.map