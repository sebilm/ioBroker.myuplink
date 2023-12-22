"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyUplinkRepository = void 0;
const axios_1 = __importDefault(require("axios"));
class MyUplinkRepository {
    constructor(options, log) {
        this.log = log;
        this.options = options;
        axios_1.default.defaults.baseURL = options.baseUrl;
        axios_1.default.defaults.headers.common['user-agent'] = options.userAgent;
        axios_1.default.defaults.timeout = options.timeout;
    }
    async getSystemsAndDevices(accessToken) {
        return await this.getFromMyUplink('/v2/systems/me', accessToken);
    }
    async getDevicePoints(deviceId, accessToken) {
        return await this.getFromMyUplink(`/v3/devices/${deviceId}/points`, accessToken);
    }
    async getFromMyUplink(suburl, accessToken) {
        const lang = this.options.language;
        this.log.debug(`GET ${suburl} (lang: ${lang})`);
        try {
            const { data } = await axios_1.default.get(suburl, {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'Accept-Language': lang,
                },
            });
            return data;
        }
        catch (error) {
            throw this.checkError(suburl, error);
        }
    }
    checkError(suburl, error) {
        this.log.error(`error from ${suburl}`);
        if (axios_1.default.isAxiosError(error)) {
            const axiosError = error;
            if (axiosError.response != null) {
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
}
exports.MyUplinkRepository = MyUplinkRepository;
//# sourceMappingURL=myuplinkRepository.js.map