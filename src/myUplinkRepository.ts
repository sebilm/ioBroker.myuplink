import axios from 'axios';
import type { AlarmsPaged } from './models/AlarmsPaged';
import type { PagedSystemResult } from './models/PagedSystemResult';
import type { ParameterData } from './models/ParameterData';
import type { Logger } from './types';

function setProperty<K extends keyof any>(obj: any, propertyName: K, value: any): void {
    obj[propertyName] = value;
}

/**
 * Options for configuring the MyUplinkRepository.
 */
export interface MyUplinkOptions {
    /**
     * The base URL for the MyUplink API.
     */
    baseUrl: string;

    /**
     * The timeout duration for API requests.
     */
    timeout: number;

    /**
     * The user agent string for API requests.
     */
    userAgent: string;

    /**
     * The language for API requests.
     */
    language: string;
}

/**
 * Creates an instance of MyUplinkRepository.
 *
 * @param options - The options for configuring the repository.
 * @param log - The logger instance for logging.
 */
export class MyUplinkRepository {
    /**
     * Constructs a new instance of MyUplinkRepository.
     *
     * @param options - The options for configuring the repository.
     * @param log - The logger instance for logging.
     */
    constructor(options: MyUplinkOptions, log: Logger) {
        this.log = log;
        this.options = options;

        axios.defaults.baseURL = options.baseUrl;
        axios.defaults.headers.common['user-agent'] = options.userAgent;
        axios.defaults.timeout = options.timeout;
    }

    private log: Logger;
    private options: MyUplinkOptions;

    /**
     * Retrieves systems and devices associated.
     *
     * @param accessToken - The access token for authentication.
     * @returns A promise that resolves to a paged result of systems.
     */
    getSystemsAndDevicesAsync(accessToken: string): Promise<PagedSystemResult> {
        return this.getFromMyUplinkAsync<PagedSystemResult>('/v2/systems/me', accessToken);
    }

    /**
     * Retrieves device points for a specific device.
     *
     * @param deviceId - The ID of the device.
     * @param accessToken - The access token for authentication.
     * @returns A promise that resolves to an array of parameter data.
     */
    getDevicePointsAsync(deviceId: string, accessToken: string): Promise<ParameterData[]> {
        return this.getFromMyUplinkAsync<ParameterData[]>(`/v3/devices/${deviceId}/points`, accessToken);
    }

    /**
     * Sets a device point for a specific device.
     *
     * @param deviceId - The ID of the device.
     * @param accessToken - The access token for authentication.
     * @param parameterId - The ID of the parameter to set.
     * @param value - The value to set for the parameter.
     * @returns A promise that resolves when the device point is set.
     */
    setDevicePointAsync(deviceId: string, accessToken: string, parameterId: string, value: string): Promise<any> {
        const body = {};
        setProperty(body, parameterId, value);
        return this.setDevicePointsAsync(deviceId, accessToken, body);
    }

    /**
     * Sets multiple device points for a specific device.
     *
     * @param deviceId - The ID of the device.
     * @param accessToken - The access token for authentication.
     * @param keyValueDictionary - A dictionary of parameter IDs and values to set.
     * @returns A promise that resolves when the device points are set.
     */
    setDevicePointsAsync(
        deviceId: string,
        accessToken: string,
        keyValueDictionary: Record<string, string>,
    ): Promise<any> {
        return this.patchToMyUplinkAsync<any>(`/v2/devices/${deviceId}/points`, keyValueDictionary, accessToken);
    }

    /**
     * Retrieves active notifications for a specific system.
     *
     * @param systemId - The ID of the system.
     * @param accessToken - The access token for authentication.
     * @returns A promise that resolves to a paged result of active alarms.
     */
    getActiveNotificationsAsync(systemId: string, accessToken: string): Promise<AlarmsPaged> {
        return this.getFromMyUplinkAsync<AlarmsPaged>(
            `/v2/systems/${systemId}/notifications/active?itemsPerPage=100`,
            accessToken,
        );
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
            const axiosError = error as axios.AxiosError;
            if (axiosError.response != null) {
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
}
