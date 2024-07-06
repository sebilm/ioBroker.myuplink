import * as path from 'path';
import { AuthRepository } from './authRepository';
import { Alarm } from './models/Alarm';
import { ParameterData } from './models/ParameterData';
import { SystemDevice } from './models/SystemDevice';
import { SystemWithDevices } from './models/SystemWithDevices';
import { MyUplinkRepository } from './myUplinkRepository';
import { AdapterConfig, DataTarget, Logger, RenameData, StateValue } from './types';

export class MyUplinkLogic {
    constructor(dataTarget: DataTarget, config: AdapterConfig, storeDir: string, log: Logger) {
        this.dataTarget = dataTarget;
        this.config = config;
        this.log = log;

        config.RenameSystemIds?.forEach((renameData: RenameData) => {
            if (renameData.OriginalId && renameData.NewId) {
                const newSystemId = this.replaceForbiddenCharacters(renameData.NewId);
                this.log.debug(`Map System ID: ${renameData.OriginalId} -> ${newSystemId}`);
                this.systemIds.set(renameData.OriginalId, newSystemId);
            }
        });
        config.RenameDeviceIds?.forEach((renameData: RenameData) => {
            if (renameData.OriginalId && renameData.NewId) {
                const newDeviceId = this.replaceForbiddenCharacters(renameData.NewId);
                this.log.debug(`Map Device ID: ${renameData.OriginalId} -> ${newDeviceId}`);
                this.deviceIds.set(renameData.OriginalId, newDeviceId);
            }
        });
        config.RenameCategories?.forEach((renameData: RenameData) => {
            if (renameData.OriginalId && renameData.NewId) {
                const newCategory = this.replaceForbiddenCharacters(renameData.NewId);
                this.log.debug(`Map Category: ${renameData.OriginalId} -> ${newCategory}`);
                this.categories.set(renameData.OriginalId, newCategory);
            }
        });
        config.RenameDataIds?.forEach((renameData: RenameData) => {
            if (renameData.OriginalId && renameData.NewId) {
                const newId = this.replaceForbiddenCharacters(renameData.NewId);
                this.log.debug(`Map Data ID: ${renameData.OriginalId} -> ${newId}`);
                this.parameterIds.set(renameData.OriginalId, newId);
                if (renameData.Category) {
                    const category = this.replaceForbiddenCharacters(renameData.Category);
                    this.log.debug(`Set Data ID Category: ${renameData.OriginalId}: ${category}`);
                    this.parameterIdToCategory.set(renameData.OriginalId, category);
                }
            }
        });

        const identifier: string = config.Identifier.trim();
        const secret: string = config.Secret.trim();
        const callbackURL: string = config.CallbackURL.trim();
        const configured: boolean = config.Configured;

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
            throw new Error('Missing settings!');
        }

        const storeFile = path.join(storeDir, 'session.json');
        this.authRepository = new AuthRepository(
            {
                clientId: identifier,
                clientSecret: secret,
                useAuthorizationCodeGrant: config.UseAuthorizationCodeGrant,
                redirectUri: callbackURL,
                authCode: config.AuthCode.trim(),
                sessionStoreFilePath: storeFile,
                baseUrl: 'https://api.myuplink.com',
                scope: 'READSYSTEM WRITESYSTEM',
                timeout: 45000,
                userAgent: 'iobroker.myuplink',
                renewBeforeExpiry: 5 * 60 * 1000,
            },
            log,
        );
        this.myUplinkRepository = new MyUplinkRepository(
            {
                baseUrl: 'https://api.myuplink.com',
                timeout: 45000,
                userAgent: 'iobroker.myuplink',
                language: config.Language,
            },
            this.log,
        );
    }

    authRepository: AuthRepository;
    myUplinkRepository: MyUplinkRepository;
    private STRICT_FORBIDDEN_CHARS = /[^a-zA-Z0-9_-]+/gu;
    private dataTarget: DataTarget;
    private config: AdapterConfig;
    private log: Logger;
    private systemIds: Map<string, string> = new Map<string, string>();
    private deviceIds: Map<string, string> = new Map<string, string>();
    private categories: Map<string, string> = new Map<string, string>();
    private parameterIds: Map<string, string> = new Map<string, string>();
    private parameterIdToCategory: Map<string, string> = new Map<string, string>();
    private objectIdIdByParameterIdByDeviceId: Map<string, Map<string, string>> = new Map<string, Map<string, string>>();
    private existingSystemIds: string[] = [];
    private existingCategoryPaths: string[] = [];

    /**
     * Async function to get data asynchronously.
     *
     * @return {Promise<string | undefined>} a promise with the error string (if there was an error) or undefined (if its all good)
     */
    async GetDataAsync(): Promise<string | undefined> {
        try {
            const accessToken = await this.authRepository.getAccessTokenAsync();
            const systems = await this.myUplinkRepository.getSystemsAndDevicesAsync(accessToken);

            if (systems.systems) {
                for (const value of systems.systems) {
                    await this.setSystemWithDevicesAsync(value, accessToken);
                }
            }
        } catch (error) {
            const errorString = `${error}`;
            this.log.error(errorString);
            return errorString;
        }
    }

    /**
     * A function to asynchronously set data.
     *
     * @param {string} id - the object id
     * @param {StateValue} value - the value to be set
     * @param {string} deviceId - the id of the device
     * @param {string | null} parameterId - the id of the parameter, or null
     * @param {boolean} isRawJson - flag indicating if the value is raw JSON
     * @return {Promise<string | undefined>} a promise with the error string (if there was an error) or undefined (if its all good)
     */
    async SetDataAsync(id: string, value: StateValue, deviceId: string, parameterId: string | null, isRawJson: boolean): Promise<string | undefined> {
        try {
            const accessToken = await this.authRepository.getAccessTokenAsync();
            if (accessToken) {
                const valueAsString = value.toString();
                if (parameterId) {
                    const result = await this.myUplinkRepository.setDevicePointAsync(deviceId, accessToken, parameterId, valueAsString);
                    if (result.status == 200 && result.payload && parameterId in result.payload && result.payload[parameterId] == 'modified') {
                        this.log.debug(`Parameter ${parameterId} modified by API`);
                        await this.dataTarget.SetStateAsync(id, value);
                    }
                } else if (isRawJson === true && valueAsString) {
                    const keyValueDictionary: Record<string, string> = JSON.parse(valueAsString);
                    if (Object.keys(keyValueDictionary).length > 0) {
                        const result = await this.myUplinkRepository.setDevicePointsAsync(deviceId, accessToken, keyValueDictionary);
                        if (result.status == 200) {
                            await this.dataTarget.SetStateAsync(id, value);
                            const objectIdByParameterId = this.objectIdIdByParameterIdByDeviceId.get(deviceId);
                            if (objectIdByParameterId && result.payload) {
                                for (const [parameterId, value] of Object.entries(keyValueDictionary)) {
                                    const objectId = objectIdByParameterId.get(parameterId);
                                    const valNumber = parseFloat(value);
                                    if (objectId && !Number.isNaN(valNumber) && parameterId in result.payload && result.payload[parameterId] == 'modified') {
                                        await this.dataTarget.SetStateAsync(objectId, valNumber);
                                    }
                                }
                            }
                        } else {
                            this.log.error(`SetData: "${valueAsString}"\nResult: "${JSON.stringify(result, null, ' ')}"`);
                            return `Status: ${result.status}`;
                        }
                    }
                }
            }
        } catch (error) {
            const errorString = `${error}`;
            this.log.error(errorString);
            return errorString;
        }
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
                await this.dataTarget.CreateSystemAsync(systemPath, systemName);
            }
            await this.dataTarget.CreateStringStateAsync(`${systemPath}.systemId`, 'System ID', system.systemId, firstRun);
            await this.dataTarget.CreateStringStateAsync(`${systemPath}.name`, 'Name', systemName, firstRun, 'info.name');
            if (system.country != undefined) {
                await this.dataTarget.CreateStringStateAsync(`${systemPath}.country`, 'Country', system.country, firstRun);
            }
            if (system.securityLevel != undefined) {
                await this.dataTarget.CreateStringStateAsync(`${systemPath}.securityLevel`, 'Security Level', system.securityLevel, firstRun);
            }
            if (system.hasAlarm != undefined) {
                await this.dataTarget.CreateBooleanStateAsync(`${systemPath}.hasAlarm`, 'Has Alarm', 'indicator.alarm', system.hasAlarm, firstRun);
            }
            if (system.devices) {
                for (const device of system.devices) {
                    await this.setSystemDeviceAsync(device, systemPath, accessToken);
                }
            }

            if (this.config.AddActiveNotifications) {
                const notifications = await this.myUplinkRepository?.getActiveNotificationsAsync(system.systemId, accessToken);
                if (this.config.AddRawActiveNotifications) {
                    await this.dataTarget.CreateStringStateAsync(
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
                await this.dataTarget.CreateStringStateAsync(`${systemPath}.activeNotifications`, 'Active notification descriptions', notificationsDescriptions, firstRun);
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
                await this.dataTarget.CreateDeviceAsync(devicePath, deviceName);
            }
            await this.dataTarget.CreateStringStateAsync(`${devicePath}.deviceId`, 'Device ID', device.id, firstRun);
            await this.dataTarget.CreateStringStateAsync(`${devicePath}.name`, 'Name', deviceName, firstRun, 'info.name');
            if (device.connectionState != undefined) {
                await this.dataTarget.CreateStringStateAsync(`${devicePath}.connectionState`, 'Connection State', device.connectionState, firstRun, 'info.status');
            }
            if (device.currentFwVersion != undefined) {
                await this.dataTarget.CreateStringStateAsync(`${devicePath}.currentFwVersion`, 'Current Firmware Version', device.currentFwVersion, firstRun, 'info.firmware');
            }
            if (device.product?.serialNumber != undefined) {
                await this.dataTarget.CreateStringStateAsync(`${devicePath}.serialNumber`, 'Serial Number', device.product.serialNumber, firstRun, 'info.serial');
            }

            if (this.config.AddData) {
                const devicePoints = await this.myUplinkRepository?.getDevicePointsAsync(device.id, accessToken);
                if (this.config.AddRawData) {
                    await this.dataTarget.CreateStringStateAsync(`${devicePath}.rawData`, 'Received raw JSON of parameter data', JSON.stringify(devicePoints, null, ''), firstRun);
                }
                if (devicePoints) {
                    for (const data of devicePoints) {
                        await this.setParameterDataAsync(data, devicePath, device.id, stateIdByParameterId);
                    }
                }
                if (firstRun) {
                    await this.dataTarget.CreateWritableStringObjectAsync(`${devicePath}.setData`, 'Send raw JSON of parameter data', 'json', device.id);
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
            await this.dataTarget.SetStateAsync(stateId, data.value ?? null);
        }
    }

    private async getObjectIdAndCreateCategoryAsync(parameterId: string, category: string | null | undefined, devicePath: string): Promise<string> {
        const parameterSubPath = this.parameterIds.get(parameterId) ?? this.replaceForbiddenCharacters(parameterId);
        const newCategory = this.parameterIdToCategory.get(parameterId);
        let categorySubPath: string | null = null;
        if (newCategory) {
            categorySubPath = newCategory;
        } else if (category && this.config.GroupData) {
            const categoryId = this.replaceForbiddenCharacters(category);
            categorySubPath = this.categories.get(category) ?? this.categories.get(categoryId) ?? categoryId;
        }
        if (categorySubPath) {
            const categoryPath = `${devicePath}.${categorySubPath}`;
            if (!this.existingCategoryPaths.includes(categoryPath)) {
                this.existingCategoryPaths.push(categoryPath);
                await this.dataTarget.CreateCategoryAsync(categoryPath, newCategory ?? category ?? categorySubPath);
            }
            return `${devicePath}.${categorySubPath}.${parameterSubPath}`;
        } else {
            return `${devicePath}.${parameterSubPath}`;
        }
    }

    private async createParameterObjectAsync(data: ParameterData, deviceId: string | null | undefined, stateId: string): Promise<void> {
        let role = 'value';
        let unit: string | undefined = undefined;
        if (data.parameterUnit) {
            unit = data.parameterUnit;
            switch (data.parameterUnit) {
                case 'kWh':
                case 'Ws':
                    role = 'value.energy';
                    break;
                case 'W':
                case 'kW':
                    role = 'value.power';
                    break;
                case '°C':
                    role = 'value.temperature';
                    break;
                case 'Hz':
                    role = 'value.frequency';
                    break;
                case 'A':
                    role = 'value.current';
                    break;
                case 'V':
                    role = 'value.voltage';
                    break;
                case '%RH':
                    role = 'value.humidity';
                    unit = '%';
                    break;
                case 'bar':
                    role = 'value.pressure';
                    break;
            }
        }
        let states: Record<string, string> | undefined = undefined;
        if (data.enumValues && data.enumValues.length > 0) {
            states = {};
            for (const enumValue of data.enumValues) {
                if (enumValue.text && enumValue.value) {
                    states[enumValue.value] = this.removeSoftHyphen(enumValue.text);
                }
            }
        }
        const name = this.removeSoftHyphen(data.parameterName ?? '');
        const writable = data.writable ?? false;
        const min = data.minValue ?? undefined;
        const max = data.maxValue ?? undefined;
        const step = data.stepValue ?? undefined;
        this.dataTarget.CreateParameterObjectAsync(stateId, name, deviceId, data.parameterId, role, writable, unit, min, max, step, states);
    }

    private removeSoftHyphen(text: string): string {
        return text.replace(new RegExp('\u00AD', 'g'), '');
    }

    private replaceForbiddenCharacters(text: string): string {
        return this.removeSoftHyphen(text).replace(this.STRICT_FORBIDDEN_CHARS, '_');
    }
}
