"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var authRepository_exports = {};
__export(authRepository_exports, {
  AuthRepository: () => AuthRepository
});
module.exports = __toCommonJS(authRepository_exports);
var import_axios = __toESM(require("axios"));
var fs = __toESM(require("fs"));
var import_jsonfile = __toESM(require("jsonfile"));
class AuthRepository {
  constructor(options, log) {
    this.log = log;
    this.options = options;
    import_axios.default.defaults.baseURL = options.baseUrl;
    import_axios.default.defaults.headers.common["user-agent"] = options.userAgent;
    import_axios.default.defaults.timeout = options.timeout;
    if (this.options.useAuthorizationCodeGrant) {
      this.readSessionFromFile();
      if (this.hasNewAuthCode()) {
        this.setEmptySession();
      }
    }
  }
  async getAccessTokenAsync() {
    var _a;
    this.log.debug("Get access token");
    if (!this.hasAccessToken()) {
      if (this.options.useAuthorizationCodeGrant) {
        if (this.options.authCode) {
          const token = await this.getAuthorizationCodeGrantTokenAsync(this.options.authCode);
          await this.setSesssionAsync(token);
        } else {
          this.log.error("You need to get and set a new Auth Code. You can do this in the adapter setting.");
          throw new Error("You need to get and set a new Auth Code. You can do this in the adapter setting.");
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
    const accessToken = (_a = this.auth) == null ? void 0 : _a.access_token;
    if (accessToken) {
      return accessToken;
    } else {
      throw new Error("No access token!");
    }
  }
  async getAuthorizationCodeGrantTokenAsync(authCode) {
    this.log.debug("Get token via Authorization Code Grant Flow");
    const data = {
      grant_type: "authorization_code",
      client_id: this.options.clientId,
      client_secret: this.options.clientSecret,
      code: authCode,
      redirect_uri: this.options.redirectUri,
      scope: this.options.scope
    };
    const session2 = await this.postTokenRequestAsync(data);
    this.log.debug(`Token received. Refresh Token received: ${session2.refresh_token != void 0}. Access Token expires in: ${session2.expires_in}`);
    if (!session2.refresh_token) {
      this.log.warn("Receive Access Token without Refresh Token.");
    }
    return session2;
  }
  async getClientCredentialsGrantTokenAsync() {
    this.log.debug("Get token via Client Credentials Grant Flow");
    const data = {
      grant_type: "client_credentials",
      client_id: this.options.clientId,
      client_secret: this.options.clientSecret,
      scope: this.options.scope
    };
    const session2 = await this.postTokenRequestAsync(data);
    this.log.debug(`Token received. Refresh Token received: ${session2.refresh_token != void 0}. Access Token expires in: ${session2.expires_in}`);
    return session2;
  }
  async refreshTokenAsync() {
    var _a, _b;
    if (!((_a = this.auth) == null ? void 0 : _a.refresh_token)) {
      throw new Error("Cannot refresh the token because no refresh token is available.");
    }
    this.log.debug("Get token via Refresh Token Grant Flow");
    const data = {
      grant_type: "refresh_token",
      refresh_token: (_b = this.auth) == null ? void 0 : _b.refresh_token,
      client_id: this.options.clientId,
      client_secret: this.options.clientSecret
    };
    const session2 = await this.postTokenRequestAsync(data);
    this.log.debug(`Token received. Refresh Token received: ${session2.refresh_token != void 0}. Access Token expires in: ${session2.expires_in}`);
    if (!session2.refresh_token) {
      this.log.warn("Receive Access Token without Refresh Token.");
    }
    return session2;
  }
  async postTokenRequestAsync(body) {
    var _a;
    const stringBody = new URLSearchParams(body).toString();
    const url = "/oauth/token";
    try {
      const { data } = await import_axios.default.post(url, stringBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      const expiresIn = (_a = data.expires_in) != null ? _a : 1800;
      data.expires_at = Date.now() + expiresIn * 1e3;
      return data;
    } catch (error) {
      throw this.checkError(url, error);
    }
  }
  checkError(suburl, error) {
    this.log.error(`error from ${suburl}`);
    this.log.error(JSON.stringify(error, null, " "));
    if (import_axios.default.isAxiosError(error)) {
      const axiosError = error;
      if (axiosError.response != null) {
        if (axiosError.response.status == 401) {
          this.setEmptySession();
        }
        if (axiosError.response.data != null) {
          const responseText = JSON.stringify(axiosError.response.data, null, " ");
          const errorMessage = `${axiosError.response.statusText}: ${responseText}`;
          return new Error(errorMessage);
        } else {
          return new Error(axiosError.response.statusText);
        }
      }
    }
    return error;
  }
  readSessionFromFile() {
    if (!this.options.sessionStoreFilePath || !fs.existsSync(this.options.sessionStoreFilePath)) {
      return;
    }
    this.log.debug(`Read session from file '${this.options.sessionStoreFilePath}'`);
    this.auth = import_jsonfile.default.readFileSync(this.options.sessionStoreFilePath, { throws: false });
  }
  async setSesssionAsync(auth) {
    this.log.debug("Set session");
    if (auth.authCode == null) {
      auth.authCode = this.options.authCode;
    }
    this.auth = auth;
    if (!this.options.sessionStoreFilePath || !this.options.useAuthorizationCodeGrant) {
      return;
    }
    this.log.debug(`Write session to file '${this.options.sessionStoreFilePath}'`);
    await import_jsonfile.default.writeFile(this.options.sessionStoreFilePath, this.auth, { spaces: 2 });
  }
  hasNewAuthCode() {
    var _a;
    const hasNewAuthCode = ((_a = this.auth) == null ? void 0 : _a.authCode) != this.options.authCode;
    this.log.debug(`Has new auth code: ${hasNewAuthCode}`);
    return hasNewAuthCode;
  }
  setEmptySession() {
    this.log.debug("Set empty session.");
    this.auth = { authCode: this.options.authCode };
  }
  isTokenExpired() {
    var _a;
    const expired = (((_a = this.auth) == null ? void 0 : _a.expires_at) || 0) < Date.now() + this.options.renewBeforeExpiry;
    this.log.debug("Is token expired: " + expired);
    return expired;
  }
  hasAccessToken() {
    var _a;
    const hasAccessToken = !!((_a = this.auth) == null ? void 0 : _a.access_token);
    this.log.debug("Has access token: " + hasAccessToken);
    return hasAccessToken;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthRepository
});
//# sourceMappingURL=authRepository.js.map
