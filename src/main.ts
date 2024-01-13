/*
 * Created with @iobroker/create-adapter v2.5.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
import * as utils from '@iobroker/adapter-core';
import * as fs from 'fs';
import * as path from 'path';
import { AuthRepository } from './authRepository';
import { Alarm } from './models/Alarm';
import { EnumValues } from './models/EnumValues';
import { ParameterData } from './models/ParameterData';
import { SystemDevice } from './models/SystemDevice';
import { SystemWithDevices } from './models/SystemWithDevices';
import { MyUplinkRepository } from './myuplinkRepository';

// Helper functions:

// For todays date;
declare global {
    interface Date {
        today(): string;
    }
}
Date.prototype.today = function (): string {
    return this.getFullYear() + '-' + (this.getMonth() + 1 < 10 ? '0' : '') + (this.getMonth() + 1) + '-' + (this.getDate() < 10 ? '0' : '') + this.getDate();
};

// For the time now
declare global {
    interface Date {
        timeNow(): string;
    }
}
Date.prototype.timeNow = function (): string {
    return (this.getHours() < 10 ? '0' : '') + this.getHours() + ':' + (this.getMinutes() < 10 ? '0' : '') + this.getMinutes() + ':' + (this.getSeconds() < 10 ? '0' : '') + this.getSeconds();
};

class Myuplink extends utils.Adapter {
    public constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({
            ...options,
            name: 'myuplink',
        });
        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        this.on('unload', this.onUnload.bind(this));
        this.refreshInterval = 0;
    }

    private authRepository: AuthRepository | undefined;
    private myUplinkRepository: MyUplinkRepository | undefined;
    private timeout: ioBroker.Timeout | undefined;
    private refreshInterval: number;
    private systemIds: Map<string, string> = new Map<string, string>();
    private deviceIds: Map<string, string> = new Map<string, string>();
    private categories: Map<string, string> = new Map<string, string>();
    private parameterIds: Map<string, string> = new Map<string, string>();
    private parameterIdToCategory: Map<string, string> = new Map<string, string>();

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    private async onReady(): Promise<void> {
        // Initialize your adapter here

        this.log.info('Starting adapter.');

        await this.setInfoObjects();

        this.config.RenameSystemIds?.forEach((renameData: ioBroker.RenameData) => {
            if (renameData.OriginalId && renameData.NewId) {
                this.log.debug(`Map System ID: ${renameData.OriginalId} -> ${renameData.NewId}`);
                this.systemIds.set(renameData.OriginalId, this.replaceForbiddenCharacters(renameData.NewId));
            }
        });
        this.config.RenameDeviceIds?.forEach((renameData: ioBroker.RenameData) => {
            if (renameData.OriginalId && renameData.NewId) {
                this.log.debug(`Map Device ID: ${renameData.OriginalId} -> ${renameData.NewId}`);
                this.deviceIds.set(renameData.OriginalId, this.replaceForbiddenCharacters(renameData.NewId));
            }
        });
        this.config.RenameCategories?.forEach((renameData: ioBroker.RenameData) => {
            if (renameData.OriginalId && renameData.NewId) {
                this.log.debug(`Map Category: ${renameData.OriginalId} -> ${renameData.NewId}`);
                this.categories.set(renameData.OriginalId, this.replaceForbiddenCharacters(renameData.NewId));
            }
        });
        this.config.RenameDataIds?.forEach((renameData: ioBroker.RenameData) => {
            if (renameData.OriginalId && renameData.NewId) {
                this.log.debug(`Map Data ID: ${renameData.OriginalId} -> ${renameData.NewId}`);
                this.parameterIds.set(renameData.OriginalId, renameData.NewId);
                if (renameData.Category) {
                    this.parameterIdToCategory.set(renameData.OriginalId, this.replaceForbiddenCharacters(renameData.Category));
                }
            }
        });

        this.refreshInterval = this.config.Interval * 60;
        if (this.refreshInterval < 60) {
            this.refreshInterval = 60;
        }

        const identifier: string = this.config.Identifier.trim();
        const secret: string = this.config.Secret.trim();
        const callbackURL: string = this.config.CallbackURL.trim();
        const configured: boolean = this.config.Configured;

        let error = false;
        if (identifier == '' || identifier == null) {
            if (configured != false) {
                this.log.error('Missing Identifier in the settings!');
            }
            error = true;
        }
        if (secret == '' || secret == null) {
            if (configured != false) {
                this.log.error('Missing Secret in the settings!');
            }
            error = true;
        }
        if (callbackURL == '' || callbackURL == null) {
            if (configured != false) {
                this.log.error('Missing Callback URL in the settings!');
            }
            error = true;
        }
        if (error) {
            this.setState('info.connection', { val: false, ack: true });
            this.setState('info.currentError', { val: 'Missing settings!', ack: true });
            return;
        }

        const dataDir: string = utils.getAbsoluteDefaultDataDir();
        let storeDir: string = path.join(dataDir, 'myuplink');
        try {
            // create directory
            if (!fs.existsSync(storeDir)) {
                fs.mkdirSync(storeDir);
            }
        } catch (err) {
            this.log.error('Could not create storage directory (' + storeDir + '): ' + err);
            storeDir = __dirname;
        }
        const storeFile = path.join(storeDir, 'session.' + this.instance + '.json');

        this.authRepository = new AuthRepository(
            {
                clientId: identifier,
                clientSecret: secret,
                useAuthorizationCodeGrant: this.config.UseAuthorizationCodeGrant,
                redirectUri: callbackURL,
                authCode: this.config.AuthCode.trim(),
                sessionStoreFilePath: storeFile,
                baseUrl: 'https://api.myuplink.com',
                scope: 'READSYSTEM WRITESYSTEM',
                timeout: 45000,
                userAgent: 'iobroker.myuplink',
                renewBeforeExpiry: 5 * 60 * 1000,
            },
            this.log,
        );

        this.myUplinkRepository = new MyUplinkRepository(
            {
                baseUrl: 'https://api.myuplink.com',
                timeout: 45000,
                userAgent: 'iobroker.myuplink',
                language: this.config.Language,
            },
            this.log,
        );

        await this.subscribeStatesAsync('*');

        this.log.info('Adapter started.');

        this.getData();
    }

    private async getData(): Promise<void> {
        try {
            if (this.authRepository) {
                const accessToken = await this.authRepository.getAccessToken();
                if (accessToken && this.myUplinkRepository) {
                    const systems = await this.myUplinkRepository.getSystemsAndDevicesAsync(accessToken);
                    this.setState('info.connection', { val: true, expire: this.refreshInterval + 30, ack: true });
                    const newDate = new Date();
                    const datetime = newDate.today() + ' ' + newDate.timeNow();
                    this.setState('info.updateTime', { val: datetime, ack: true });
                    this.setState('info.currentError', { val: '', ack: true });

                    systems.systems?.forEach(async (value: SystemWithDevices) => {
                        await this.setSystemWithDevices(value, accessToken);
                    });
                }
            }
        } catch (error) {
            this.log.error('' + error);

            this.setState('info.connection', { val: false, ack: true });

            const newDate = new Date();
            const datetime = newDate.today() + ' ' + newDate.timeNow();
            this.setState('info.lastErrorTime', { val: datetime, ack: true });
            this.setState('info.lastError', { val: '' + error, ack: true });
            this.setState('info.currentError', { val: '' + error, ack: true });
        }

        this.timeout = this.setTimeout(
            async () => {
                await this.getData();
            },
            <number>this.refreshInterval * 1000,
        );
    }

    private async setSystemWithDevices(system: SystemWithDevices, accessToken: string): Promise<void> {
        if (system.systemId != undefined && system.name != undefined) {
            const systemId = this.replaceForbiddenCharacters(system.systemId);
            const newSystemId = this.systemIds.get(systemId);
            const systemPath = newSystemId ?? systemId;
            const systemName = this.removeSoftHyphen(system.name);
            await this.myCreateDeviceAsync(systemPath, systemName);
            await this.myCreateStringStateAsync(`${systemPath}.systemId`, 'System ID', system.systemId);
            await this.myCreateStringStateAsync(`${systemPath}.name`, 'Name', systemName);
            if (system.country != undefined) {
                await this.myCreateStringStateAsync(`${systemPath}.country`, 'Country', system.country);
            }
            if (system.securityLevel != undefined) {
                await this.myCreateStringStateAsync(`${systemPath}.securityLevel`, 'Security Level', system.securityLevel);
            }
            if (system.hasAlarm != undefined) {
                await this.myCreateBooleanStateAsync(`${systemPath}.hasAlarm`, 'Has Alarm', 'indicator.alarm', system.hasAlarm);
            }
            system.devices?.forEach(async (dev: SystemDevice) => {
                await this.setSystemDevice(dev, systemPath, accessToken);
            });

            if (this.config.AddActiveNotifications) {
                const notifications = await this.myUplinkRepository?.getActiveNotificationsAsync(system.systemId, accessToken);
                if (this.config.AddRawActiveNotifications) {
                    await this.myCreateStringStateAsync(`${systemPath}.rawActiveNotifications`, 'Received raw JSON of active notifications', JSON.stringify(notifications?.notifications, null, ''));
                }
                let notificationsDescriptions: string = '';
                notifications?.notifications?.forEach((notification: Alarm) => {
                    notificationsDescriptions += `${notification.header}: ${notification.description}\n`;
                });
                await this.myCreateStringStateAsync(`${systemPath}.activeNotifications`, 'Active notification descriptions', notificationsDescriptions);
            }
        }
    }

    private async setSystemDevice(device: SystemDevice, systemPath: string, accessToken: string): Promise<void> {
        if (device.id != undefined && device.product?.name != undefined) {
            const deviceId = this.replaceForbiddenCharacters(device.id);
            const newDeviceId = this.deviceIds.get(deviceId);
            const deviceSubPath = newDeviceId ?? deviceId;
            const devicePath = `${systemPath}.${deviceSubPath}`;
            const deviceName = this.removeSoftHyphen(device.product.name);
            await this.myCreateChannelAsync(devicePath, deviceName);
            await this.myCreateStringStateAsync(`${devicePath}.deviceId`, 'Device ID', device.id);
            await this.myCreateStringStateAsync(`${devicePath}.name`, 'Name', deviceName);
            if (device.connectionState != undefined) {
                await this.myCreateStringStateAsync(`${devicePath}.connectionState`, 'Connection State', device.connectionState);
            }
            if (device.currentFwVersion != undefined) {
                await this.myCreateStringStateAsync(`${devicePath}.currentFwVersion`, 'Current Firmware Version', device.currentFwVersion);
            }
            if (device.product?.serialNumber != undefined) {
                await this.myCreateStringStateAsync(`${devicePath}.serialNumber`, 'Serial Number', device.product.serialNumber);
            }

            if (this.config.AddData) {
                const devicePoints = await this.myUplinkRepository?.getDevicePointsAsync(device.id, accessToken);
                if (this.config.AddRawData) {
                    await this.myCreateStringStateAsync(`${devicePath}.rawData`, 'Received raw JSON of parameter data', JSON.stringify(devicePoints, null, ''));
                }
                devicePoints?.forEach(async (data: ParameterData) => {
                    await this.setParameterData(data, devicePath, device.id);
                });
            }
        }
    }

    private async setParameterData(data: ParameterData, devicePath: string, deviceId: string | null | undefined): Promise<void> {
        if (data.parameterId && data.parameterName) {
            const parameterId = this.replaceForbiddenCharacters(data.parameterId);
            const newParameterId = this.parameterIds.get(parameterId);
            const parameterSubPath = newParameterId ?? parameterId;
            let path = `${devicePath}.${parameterSubPath}`;
            const newCategory = this.parameterIdToCategory.get(parameterId);
            if (newCategory) {
                path = `${devicePath}.${newCategory}.${parameterSubPath}`;
            } else if (data.category) {
                const categoryId = this.replaceForbiddenCharacters(data.category);
                const newCategoryId = this.categories.get(categoryId);
                const categorySubPath = newCategoryId ?? categoryId;
                const catPath = `${devicePath}.${categorySubPath}`;
                const pathWithCat = `${catPath}.${parameterSubPath}`;
                if (this.config.GroupData) {
                    await this.delObjectAsync(path);
                    path = pathWithCat;
                    await this.myCreateFolderAsync(catPath, data.category);
                } else {
                    await this.delObjectAsync(pathWithCat);
                    await this.delObjectAsync(catPath);
                }
            }
            const objectExists = await this.objectExists(path);
            if (!objectExists) {
                const obj: ioBroker.SettableObject = {
                    type: 'state',
                    common: {
                        name: this.removeSoftHyphen(data.parameterName),
                        type: 'number',
                        role: 'value',
                        read: true,
                        write: data.writable ?? false,
                    },
                    native: {
                        parameterId: data.parameterId,
                        writable: data.writable,
                        deviceId: deviceId,
                    },
                };
                if (data.parameterUnit) {
                    obj.common.unit = data.parameterUnit;
                }
                if (data.minValue) {
                    obj.common.min = data.minValue;
                }
                if (data.maxValue) {
                    obj.common.max = data.maxValue;
                }
                if (data.stepValue) {
                    obj.common.step = data.stepValue;
                }
                if (data.enumValues && data.enumValues.length > 0) {
                    const states: Record<string, string> = {};
                    data.enumValues.forEach((enumValue: EnumValues) => {
                        if (enumValue.text && enumValue.value) {
                            states[enumValue.value] = this.removeSoftHyphen(enumValue.text);
                        }
                    });
                    obj.common.states = states;
                }
                await this.setObjectNotExistsAsync(path, obj);
            }
            await this.setStateAsync(path, { val: data.value, ack: true });
        }
    }

    private async setInfoObjects(): Promise<void> {
        await this.setObjectNotExistsAsync('info', {
            type: 'channel',
            common: {
                name: 'Information',
            },
            native: {},
        });
        await this.setObjectNotExistsAsync('info.connection', {
            type: 'state',
            common: {
                name: 'Connected to myUplink',
                role: 'indicator.connected',
                type: 'boolean',
                read: true,
                write: false,
                def: false,
            },
            native: {},
        });
        await this.setObjectNotExistsAsync('info.currentError', {
            type: 'state',
            common: {
                name: 'Current Error',
                role: 'text',
                type: 'string',
                read: true,
                write: false,
                def: '',
            },
            native: {},
        });
        await this.setObjectNotExistsAsync('info.updateTime', {
            type: 'state',
            common: {
                name: 'Time of the last update',
                role: 'text',
                type: 'string',
                read: true,
                write: false,
                def: '',
            },
            native: {},
        });
        await this.setObjectNotExistsAsync('info.lastError', {
            type: 'state',
            common: {
                name: 'Last Error',
                role: 'text',
                type: 'string',
                read: true,
                write: false,
                def: '',
            },
            native: {},
        });
        await this.setObjectNotExistsAsync('info.lastErrorTime', {
            type: 'state',
            common: {
                name: 'Time of the last error',
                role: 'text',
                type: 'string',
                read: true,
                write: false,
                def: '',
            },
            native: {},
        });
    }

    private async myCreateDeviceAsync(path: string, name: string): Promise<void> {
        await this.setObjectNotExistsAsync(path, {
            type: 'device',
            common: {
                name: name,
                role: 'text',
            },
            native: {},
        });
    }

    private async myCreateChannelAsync(path: string, name: string): Promise<void> {
        await this.setObjectNotExistsAsync(path, {
            type: 'channel',
            common: {
                name: name,
                role: 'text',
            },
            native: {},
        });
    }

    private async myCreateFolderAsync(path: string, name: string): Promise<void> {
        await this.setObjectNotExistsAsync(path, {
            type: 'folder',
            common: {
                name: name,
                role: 'text',
            },
            native: {},
        });
    }

    private async myCreateStringStateAsync(path: string, name: string, value: string): Promise<void> {
        await this.setObjectNotExistsAsync(path, {
            type: 'state',
            common: {
                name: name,
                type: 'string',
                role: 'text',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.setStateAsync(path, { val: value, ack: true });
    }

    private async myCreateBooleanStateAsync(path: string, name: string, role: string, value: boolean): Promise<void> {
        await this.setObjectNotExistsAsync(path, {
            type: 'state',
            common: {
                name: name,
                type: 'boolean',
                role: role,
                read: true,
                write: false,
            },
            native: {},
        });
        await this.setStateAsync(path, { val: value, ack: true });
    }

    private removeSoftHyphen(text: string): string {
        return text.replace(new RegExp('\u00AD', 'g'), '');
    }

    private replaceForbiddenCharacters(text: string): string {
        return this.removeSoftHyphen(text).replace(new RegExp('\\.', 'g'), '_').replace(this.FORBIDDEN_CHARS, '_');
    }

    /**
     * Is called if a subscribed state changes
     */
    private async onStateChange(id: string, state: ioBroker.State | null | undefined): Promise<void> {
        if (state != null && state.ack === false && state.q == this.constants.STATE_QUALITY.GOOD && state.val != null && this.authRepository != null && this.myUplinkRepository != null) {
            this.log.debug(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
            const obj = await this.getObjectAsync(id);
            if (
                obj != null &&
                obj.native != null &&
                obj.native.writable == true &&
                obj.native.parameterId != null &&
                obj.native.parameterId != '' &&
                obj.native.deviceId != null &&
                obj.native.deviceId != ''
            ) {
                try {
                    const accessToken = await this.authRepository.getAccessToken();
                    if (accessToken) {
                        const deviceId = obj.native.deviceId;
                        const parameterId = obj.native.parameterId.toString();
                        const value = state.val.toString();
                        await this.myUplinkRepository.setDevicePointsAsync(deviceId, accessToken, parameterId, value);

                        const devicePoints = await this.myUplinkRepository.getDevicePointsAsync(deviceId, accessToken, parameterId);
                        devicePoints?.forEach(async (data: ParameterData) => {
                            if (data.parameterId == parameterId) {
                                await this.setStateAsync(id, { val: data.value, ack: true });
                            }
                        });
                    }
                } catch (error) {
                    const errorString = `${error}`;
                    this.log.error(errorString);
                    const quality = this.constants.STATE_QUALITY.DEVICE_ERROR_REPORT;
                    await this.setStateAsync(id, { val: state.val, q: quality, c: errorString, ack: false });
                }
            }
        }
    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     */
    private onUnload(callback: () => void): void {
        try {
            this.clearTimeout(this.timeout);
            this.timeout = undefined;
            this.authRepository = undefined;
            this.myUplinkRepository = undefined;
            this.setState('info.connection', { val: false, ack: true });
            this.log.info('Cleaned everything up...');
            callback();
        } catch (e) {
            callback();
        }
    }
}

if (require.main !== module) {
    // Export the constructor in compact mode
    module.exports = (options: Partial<utils.AdapterOptions> | undefined) => new Myuplink(options);
} else {
    // otherwise start the instance directly
    (() => new Myuplink())();
}
