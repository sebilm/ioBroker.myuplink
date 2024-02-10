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

    private STRICT_FORBIDDEN_CHARS = /[^a-zA-Z0-9_-]+/gu;

    private authRepository: AuthRepository | undefined;
    private myUplinkRepository: MyUplinkRepository | undefined;
    private timeout: ioBroker.Timeout | undefined;
    private refreshInterval: number;
    private systemIds: Map<string, string> = new Map<string, string>();
    private deviceIds: Map<string, string> = new Map<string, string>();
    private categories: Map<string, string> = new Map<string, string>();
    private parameterIds: Map<string, string> = new Map<string, string>();
    private parameterIdToCategory: Map<string, string> = new Map<string, string>();
    private objectIdIdByParameterIdByDeviceId: Map<string, Map<string, string>> = new Map<string, Map<string, string>>();
    private existingSystemIds: string[] = [];
    private existingFolders: string[] = [];

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

        await this.getDataAsync();
    }

    private async getDataAsync(): Promise<void> {
        try {
            if (this.authRepository) {
                const accessToken = await this.authRepository.getAccessTokenAsync();
                if (accessToken && this.myUplinkRepository) {
                    const systems = await this.myUplinkRepository.getSystemsAndDevicesAsync(accessToken);
                    this.setState('info.connection', { val: true, expire: this.refreshInterval + 30, ack: true });
                    const newDate = new Date();
                    const datetime = newDate.today() + ' ' + newDate.timeNow();
                    this.setState('info.updateTime', { val: datetime, ack: true });
                    this.setState('info.currentError', { val: '', ack: true });

                    systems.systems?.forEach(async (value: SystemWithDevices) => {
                        await this.setSystemWithDevicesAsync(value, accessToken);
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
                await this.getDataAsync();
            },
            <number>this.refreshInterval * 1000,
        );
    }

    private async setSystemWithDevicesAsync(system: SystemWithDevices, accessToken: string): Promise<void> {
        if (system.systemId != undefined && system.name != undefined) {
            const systemIdExists = this.existingSystemIds.includes(system.systemId);
            const firstRun = !systemIdExists;
            if (!systemIdExists) {
                this.existingSystemIds.push(system.systemId);
            }
            const systemId = this.replaceForbiddenCharacters(system.systemId);
            const newSystemId = this.systemIds.get(systemId);
            const systemPath = newSystemId ?? systemId;
            const systemName = this.removeSoftHyphen(system.name);
            if (firstRun) {
                await this.myCreateDeviceAsync(systemPath, systemName);
            }
            await this.myCreateStringStateAsync(`${systemPath}.systemId`, 'System ID', system.systemId, firstRun);
            await this.myCreateStringStateAsync(`${systemPath}.name`, 'Name', systemName, firstRun, 'info.name');
            if (system.country != undefined) {
                await this.myCreateStringStateAsync(`${systemPath}.country`, 'Country', system.country, firstRun);
            }
            if (system.securityLevel != undefined) {
                await this.myCreateStringStateAsync(`${systemPath}.securityLevel`, 'Security Level', system.securityLevel, firstRun);
            }
            if (system.hasAlarm != undefined) {
                await this.myCreateBooleanStateAsync(`${systemPath}.hasAlarm`, 'Has Alarm', 'indicator.alarm', system.hasAlarm, firstRun);
            }
            system.devices?.forEach(async (dev: SystemDevice) => {
                await this.setSystemDeviceAsync(dev, systemPath, accessToken);
            });

            if (this.config.AddActiveNotifications) {
                const notifications = await this.myUplinkRepository?.getActiveNotificationsAsync(system.systemId, accessToken);
                if (this.config.AddRawActiveNotifications) {
                    await this.myCreateStringStateAsync(
                        `${systemPath}.rawActiveNotifications`,
                        'Received raw JSON of active notifications',
                        JSON.stringify(notifications?.notifications, null, ''),
                        firstRun,
                    );
                }
                let notificationsDescriptions: string = '';
                notifications?.notifications?.forEach((notification: Alarm) => {
                    notificationsDescriptions += `${notification.header}: ${notification.description}\n`;
                });
                await this.myCreateStringStateAsync(`${systemPath}.activeNotifications`, 'Active notification descriptions', notificationsDescriptions, firstRun);
            }
        }
    }

    private async setSystemDeviceAsync(device: SystemDevice, systemPath: string, accessToken: string): Promise<void> {
        if (device.id != undefined && device.product?.name != undefined) {
            const existingMap = this.objectIdIdByParameterIdByDeviceId.get(device.id);
            const firstRun = !existingMap;
            const stateIdByParameterId = existingMap ?? new Map<string, string>();
            if (!existingMap) {
                this.objectIdIdByParameterIdByDeviceId.set(device.id, stateIdByParameterId);
            }
            const deviceId = this.replaceForbiddenCharacters(device.id);
            const newDeviceId = this.deviceIds.get(deviceId);
            const deviceSubPath = newDeviceId ?? deviceId;
            const devicePath = `${systemPath}.${deviceSubPath}`;
            const deviceName = this.removeSoftHyphen(device.product.name);
            if (firstRun) {
                await this.myCreateChannelAsync(devicePath, deviceName);
            }
            await this.myCreateStringStateAsync(`${devicePath}.deviceId`, 'Device ID', device.id, firstRun);
            await this.myCreateStringStateAsync(`${devicePath}.name`, 'Name', deviceName, firstRun, 'info.name');
            if (device.connectionState != undefined) {
                await this.myCreateStringStateAsync(`${devicePath}.connectionState`, 'Connection State', device.connectionState, firstRun, 'info.status');
            }
            if (device.currentFwVersion != undefined) {
                await this.myCreateStringStateAsync(`${devicePath}.currentFwVersion`, 'Current Firmware Version', device.currentFwVersion, firstRun, 'info.firmware');
            }
            if (device.product?.serialNumber != undefined) {
                await this.myCreateStringStateAsync(`${devicePath}.serialNumber`, 'Serial Number', device.product.serialNumber, firstRun, 'info.serial');
            }

            if (this.config.AddData) {
                const devicePoints = await this.myUplinkRepository?.getDevicePointsAsync(device.id, accessToken);
                if (this.config.AddRawData) {
                    await this.myCreateStringStateAsync(`${devicePath}.rawData`, 'Received raw JSON of parameter data', JSON.stringify(devicePoints, null, ''), firstRun);
                }
                devicePoints?.forEach(async (data: ParameterData) => {
                    await this.setParameterDataAsync(data, devicePath, device.id, stateIdByParameterId);
                });
                if (firstRun) {
                    await this.setObjectNotExistsAsync(`${devicePath}.setData`, {
                        type: 'state',
                        common: {
                            name: 'Send raw JSON of parameter data',
                            type: 'string',
                            role: 'json',
                            read: true,
                            write: true,
                        },
                        native: {
                            rawJson: true,
                            writable: true,
                            deviceId: device.id,
                        },
                    });
                }
            }
        }
    }

    private async setParameterDataAsync(data: ParameterData, devicePath: string, deviceId: string | null | undefined, stateIdByParameterId: Map<string, string>): Promise<void> {
        if (data.parameterId) {
            const existingObjectId = stateIdByParameterId.get(data.parameterId);
            const stateId = existingObjectId ?? (await this.getObjectIdAndCreateCategoryAsync(data.parameterId, data.category, devicePath));
            if (!existingObjectId) {
                stateIdByParameterId.set(data.parameterId, stateId);
                await this.createParameterObjectAsync(data, deviceId, stateId);
            }
            await this.setStateAsync(stateId, { val: data.value, ack: true });
        }
    }

    private async getObjectIdAndCreateCategoryAsync(parameterId: string, category: string | null | undefined, devicePath: string): Promise<string> {
        const newParameterId = this.parameterIds.get(parameterId) ?? parameterId;
        const parameterSubPath = this.replaceForbiddenCharacters(newParameterId);
        let objectId = `${devicePath}.${parameterSubPath}`;
        const newCategory = this.parameterIdToCategory.get(parameterId);
        if (newCategory) {
            objectId = `${devicePath}.${newCategory}.${parameterSubPath}`;
        } else if (category) {
            const categoryId = this.replaceForbiddenCharacters(category);
            const newCategoryId = this.categories.get(categoryId);
            const categorySubPath = newCategoryId ?? categoryId;
            const catPath = `${devicePath}.${categorySubPath}`;
            const pathWithCat = `${catPath}.${parameterSubPath}`;
            if (this.config.GroupData) {
                await this.delObjectAsync(objectId);
                objectId = pathWithCat;
                await this.myCreateFolderAsync(catPath, category);
            } else {
                await this.delObjectAsync(pathWithCat);
                await this.delObjectAsync(catPath);
            }
        }
        return objectId;
    }

    private async createParameterObjectAsync(data: ParameterData, deviceId: string | null | undefined, stateId: string): Promise<void> {
        const obj: ioBroker.SettableObject = {
            type: 'state',
            common: {
                name: this.removeSoftHyphen(data.parameterName ?? ''),
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
            switch (data.parameterUnit) {
                case 'kWh':
                case 'Ws':
                    obj.common.role = 'value.energy';
                    break;
                case 'W':
                case 'kW':
                    obj.common.role = 'value.power';
                    break;
                case '°C':
                    obj.common.role = 'value.temperature';
                    break;
                case 'Hz':
                    obj.common.role = 'value.frequency';
                    break;
                case 'A':
                    obj.common.role = 'value.current';
                    break;
                case 'V':
                    obj.common.role = 'value.voltage';
                    break;
                case '%RH':
                    obj.common.role = 'value.humidity';
                    obj.common.unit = '%';
                    break;
                case 'bar':
                    obj.common.role = 'value.pressure';
                    break;
            }
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
        await this.setObjectNotExistsAsync(stateId, obj);
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
        this.log.debug(`create Device: ${path}`);
        await this.setObjectNotExistsAsync(path, {
            type: 'device',
            common: {
                name: name,
            },
            native: {},
        });
    }

    private async myCreateChannelAsync(path: string, name: string): Promise<void> {
        this.log.debug(`create Channel: ${path}`);
        await this.setObjectNotExistsAsync(path, {
            type: 'channel',
            common: {
                name: name,
            },
            native: {},
        });
    }

    private async myCreateFolderAsync(path: string, name: string): Promise<void> {
        if (!this.existingFolders.includes(path)) {
            this.existingFolders.push(path);
            this.log.debug(`create Folder: ${path}`);
            await this.setObjectNotExistsAsync(path, {
                type: 'folder',
                common: {
                    name: name,
                },
                native: {},
            });
        }
    }

    private async myCreateStringStateAsync(path: string, name: string, value: string, createObject: boolean, role: string = 'text'): Promise<void> {
        if (createObject) {
            this.log.debug(`create State: ${path}`);
            await this.setObjectNotExistsAsync(path, {
                type: 'state',
                common: {
                    name: name,
                    type: 'string',
                    role: role,
                    read: true,
                    write: false,
                },
                native: {},
            });
        }
        await this.setStateAsync(path, { val: value, ack: true });
    }

    private async myCreateBooleanStateAsync(path: string, name: string, role: string, value: boolean, createObject: boolean): Promise<void> {
        if (createObject) {
            this.log.debug(`create State: ${path}`);
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
        }
        await this.setStateAsync(path, { val: value, ack: true });
    }

    private removeSoftHyphen(text: string): string {
        return text.replace(new RegExp('\u00AD', 'g'), '');
    }

    private replaceForbiddenCharacters(text: string): string {
        return this.removeSoftHyphen(text).replace(this.STRICT_FORBIDDEN_CHARS, '_');
    }

    /**
     * Is called if a subscribed state changes
     */
    private async onStateChange(id: string, state: ioBroker.State | null | undefined): Promise<void> {
        if (state != null && state.ack === false && state.q == this.constants.STATE_QUALITY.GOOD && state.val != null && this.authRepository != null && this.myUplinkRepository != null) {
            this.log.debug(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
            const obj = await this.getObjectAsync(id);
            if (obj != null && obj.native != null && obj.native.writable == true && obj.native.deviceId != null && obj.native.deviceId != '') {
                try {
                    const accessToken = await this.authRepository.getAccessTokenAsync();
                    if (accessToken) {
                        const deviceId = obj.native.deviceId;
                        const value = state.val.toString();
                        if (obj.native.parameterId != null && obj.native.parameterId != '') {
                            const parameterId = obj.native.parameterId.toString();
                            const result = await this.myUplinkRepository.setDevicePointAsync(deviceId, accessToken, parameterId, value);
                            if (result.status == 200 && result.payload && parameterId in result.payload && result.payload[parameterId] == 'modified') {
                                this.log.debug(`Parameter ${parameterId} modified by API`);
                                await this.setStateAsync(id, { val: state.val, ack: true });
                            }
                        } else if (obj.native.rawJson === true && value) {
                            const keyValueDictionary: Record<string, string> = JSON.parse(value);
                            const result = await this.myUplinkRepository.setDevicePointsAsync(deviceId, accessToken, keyValueDictionary);
                            if (result.status == 200) {
                                await this.setStateAsync(id, { val: state.val, q: this.constants.STATE_QUALITY.GOOD, ack: true, c: undefined });
                                const objectIdByParameterId = this.objectIdIdByParameterIdByDeviceId.get(deviceId);
                                if (objectIdByParameterId && result.payload) {
                                    Object.entries(keyValueDictionary).forEach(async ([parameterId, value]) => {
                                        const objectId = objectIdByParameterId.get(parameterId);
                                        const valNumber = parseFloat(value);
                                        if (objectId && !Number.isNaN(valNumber) && parameterId in result.payload && result.payload[parameterId] == 'modified') {
                                            await this.setStateAsync(objectId, { val: valNumber, ack: true });
                                        }
                                    });
                                }
                            } else {
                                this.log.error(`SetData: "${value}"\nResult: "${JSON.stringify(result, null, ' ')}"`);
                                await this.setStateAsync(id, { val: state.val, q: this.constants.STATE_QUALITY.DEVICE_ERROR_REPORT, ack: false, c: `Status: ${result.status}` });
                            }
                        }
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
