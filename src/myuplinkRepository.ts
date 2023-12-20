import axios, { AxiosError } from 'axios';
import { PagedSystemResult } from './models/PagedSystemResult';

export default interface MyUplinkOptions {
    baseUrl: string;
    timeout: number;
    userAgent: string;
    language: string;
}

export class MyUplinkRepository {
    constructor(options: MyUplinkOptions, log: ioBroker.Log) {
        this.log = log;
        this.options = options;

        axios.defaults.baseURL = options.baseUrl;
        axios.defaults.headers.common['user-agent'] = options.userAgent;
        axios.defaults.timeout = options.timeout;
    }

    private log: ioBroker.Log;
    private options: MyUplinkOptions;

    async getSystemsAndDevices(accessToken: string): Promise<PagedSystemResult> {
        return await this.getFromMyUplink('/v2/systems/me', accessToken);
    }

    private async getFromMyUplink<T>(suburl: string, accessToken: string): Promise<T> {
        const lang = this.options.language;
        this.log.debug(`GET ${suburl} (lang: ${lang})`);
        try {
            const { data } = await axios.get<T>(suburl, {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'Accept-Language': lang,
                },
            });
            return data;
        } catch (error) {
            throw this.checkError(suburl, error);
        }
    }

    private checkError(suburl: string, error: unknown): unknown {
        this.log.error(`error from ${suburl}`);
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response != null) {
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
}
