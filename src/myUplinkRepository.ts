import axios, { AxiosError } from 'axios';
import { AlarmsPaged } from './models/AlarmsPaged';
import { PagedSystemResult } from './models/PagedSystemResult';
import { ParameterData } from './models/ParameterData';
import { Logger } from './types';

function setProperty<K extends keyof any>(obj: any, propertyName: K, value: any): void {
    obj[propertyName] = value;
}

export interface MyUplinkOptions {
    baseUrl: string;
    timeout: number;
    userAgent: string;
    language: string;
}

export class MyUplinkRepository {
    constructor(options: MyUplinkOptions, log: Logger) {
        this.log = log;
        this.options = options;

        axios.defaults.baseURL = options.baseUrl;
        axios.defaults.headers.common['user-agent'] = options.userAgent;
        axios.defaults.timeout = options.timeout;
    }

    private log: Logger;
    private options: MyUplinkOptions;

    getSystemsAndDevicesAsync(accessToken: string): Promise<PagedSystemResult> {
        return this.getFromMyUplinkAsync<PagedSystemResult>('/v2/systems/me', accessToken);
    }

    getDevicePointsAsync(deviceId: string, accessToken: string): Promise<ParameterData[]> {
        return this.getFromMyUplinkAsync<ParameterData[]>(`/v3/devices/${deviceId}/points`, accessToken);
    }

    setDevicePointAsync(deviceId: string, accessToken: string, parameterId: string, value: string): Promise<any> {
        const body = {};
        setProperty(body, parameterId, value);
        return this.setDevicePointsAsync(deviceId, accessToken, body);
    }

    setDevicePointsAsync(deviceId: string, accessToken: string, keyValueDictionary: Record<string, string>): Promise<any> {
        return this.patchToMyUplinkAsync<any>(`/v2/devices/${deviceId}/points`, keyValueDictionary, accessToken);
    }

    getActiveNotificationsAsync(systemId: string, accessToken: string): Promise<AlarmsPaged> {
        return this.getFromMyUplinkAsync<AlarmsPaged>(`/v2/systems/${systemId}/notifications/active?itemsPerPage=100`, accessToken);
    }

    private async getFromMyUplinkAsync<T>(url: string, accessToken: string): Promise<T> {
        const lang = this.options.language;
        this.log.debug(`GET ${url} (lang: ${lang})`);
        try {
            const { data } = await axios.get<T>(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Accept-Language': lang,
                },
            });
            this.log.silly(`Response from GET ${url} (lang: ${lang}): ${JSON.stringify(data, null, ' ')}`);
            return data;
        } catch (error) {
            throw this.checkError(url, error);
        }
    }

    private async patchToMyUplinkAsync<T>(url: string, body: any, accessToken: string): Promise<T> {
        const lang = this.options.language;
        this.log.debug(`PATCH ${url} (lang: ${lang})`);
        this.log.silly(`PATCH body: ${JSON.stringify(body, null, ' ')}`);
        try {
            const { data } = await axios.patch<T>(url, body, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Accept-Language': lang,
                },
            });
            this.log.debug(`Response from PATCH ${url} (lang: ${lang}): ${JSON.stringify(data, null, ' ')}`);
            return data;
        } catch (error) {
            throw this.checkError(url, error);
        }
    }

    private checkError(suburl: string, error: unknown): unknown {
        this.log.error(`error from ${suburl}`);
        this.log.error(JSON.stringify(error, null, ' '));
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
