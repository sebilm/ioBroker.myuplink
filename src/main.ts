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

function removeSoftHyphen(text: string): string {
    return text.replace(new RegExp('\u00AD', 'g'), '');
}

async function createDeviceAsync(adapter: Myuplink, path: string, name: string): Promise<void> {
    await adapter.setObjectNotExistsAsync(path, {
        type: 'device',
        common: {
            name: name,
            role: 'text',
        },
        native: {},
    });
}

async function createChannelAsync(adapter: Myuplink, path: string, name: string): Promise<void> {
    await adapter.setObjectNotExistsAsync(path, {
        type: 'channel',
        common: {
            name: name,
            role: 'text',
        },
        native: {},
    });
}

async function createStringStateAsync(adapter: Myuplink, path: string, name: string, value: string): Promise<void> {
    await adapter.setObjectNotExistsAsync(path, {
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
    await adapter.setStateAsync(path, { val: value, ack: true });
}

async function createBooleanStateAsync(adapter: Myuplink, path: string, name: string, role: string, value: boolean): Promise<void> {
    await adapter.setObjectNotExistsAsync(path, {
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
    await adapter.setStateAsync(path, { val: value, ack: true });
}

class Myuplink extends utils.Adapter {
    public constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({
            ...options,
            name: 'myuplink',
        });
        this.on('ready', this.onReady.bind(this));
        this.on('unload', this.onUnload.bind(this));
        this.refreshInterval = 0;
    }

    private authRepository: AuthRepository | undefined;
    private myUplinkRepository: MyUplinkRepository | undefined;
    private interval: NodeJS.Timeout | undefined;
    private refreshInterval: number;

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    private async onReady(): Promise<void> {
        // Initialize your adapter here

        this.log.info('Starting adapter.');

        await this.setInfoObjects();

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

        this.log.info('Adapter started.');

        this.getData();
        this.interval = setInterval(
            async () => {
                await this.getData();
            },
            <number>this.refreshInterval * 1000,
        );
    }

    private async getData(): Promise<void> {
        try {
            if (this.authRepository) {
                const accessToken = await this.authRepository.getAccessToken();
                if (accessToken && this.myUplinkRepository) {
                    const systems = await this.myUplinkRepository.getSystemsAndDevices(accessToken);
                    this.log.debug('Data received.');
                    this.log.debug(JSON.stringify(systems, null, ' '));
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
    }

    private async setSystemWithDevices(system: SystemWithDevices, accessToken: string): Promise<void> {
        if (system.systemId != undefined && system.name != undefined) {
            const systemPath = system.systemId;
            const systemName = removeSoftHyphen(system.name);
            await createDeviceAsync(this, systemPath, systemName);
            await createStringStateAsync(this, `${systemPath}.systemId`, 'System ID', system.systemId);
            await createStringStateAsync(this, `${systemPath}.name`, 'Name', systemName);
            if (system.country != undefined) {
                await createStringStateAsync(this, `${systemPath}.country`, 'Country', system.country);
            }
            if (system.securityLevel != undefined) {
                await createStringStateAsync(this, `${systemPath}.securityLevel`, 'Security Level', system.securityLevel);
            }
            if (system.hasAlarm != undefined) {
                await createBooleanStateAsync(this, `${systemPath}.hasAlarm`, 'Has Alarm', 'indicator.alarm', system.hasAlarm);
            }
            system.devices?.forEach(async (dev: SystemDevice) => {
                await this.setSystemDevice(dev, systemPath, accessToken);
            });

            if (this.config.AddActiveNotifications) {
                const notifications = await this.myUplinkRepository?.getActiveNotifications(system.systemId, accessToken);
                if (this.config.AddRawActiveNotifications) {
                    await createStringStateAsync(this, `${systemPath}.rawActiveNotifications`, 'Received raw JSON of active notifications', JSON.stringify(notifications?.notifications, null, ''));
                }
                let notificationsDescriptions: string = '';
                notifications?.notifications?.forEach((notification: Alarm) => {
                    notificationsDescriptions += `${notification.header}: ${notification.description}\n`;
                });
                await createStringStateAsync(this, `${systemPath}.activeNotifications`, 'Active notification descriptions', notificationsDescriptions);
            }
        }
    }

    private async setSystemDevice(device: SystemDevice, systemPath: string, accessToken: string): Promise<void> {
        if (device.id != undefined && device.product?.name != undefined) {
            const devPath = `${systemPath}.${device.id}`;
            const deviceName = removeSoftHyphen(device.product.name);
            await createChannelAsync(this, devPath, deviceName);
            await createStringStateAsync(this, `${devPath}.id`, 'Device ID', device.id);
            await createStringStateAsync(this, `${devPath}.name`, 'Name', deviceName);
            if (device.connectionState != undefined) {
                await createStringStateAsync(this, `${devPath}.connectionState`, 'Connection State', device.connectionState);
            }
            if (device.currentFwVersion != undefined) {
                await createStringStateAsync(this, `${devPath}.currentFwVersion`, 'Current Firmware Version', device.currentFwVersion);
            }
            if (device.product?.serialNumber != undefined) {
                await createStringStateAsync(this, `${devPath}.serialNumber`, 'Serial Number', device.product.serialNumber);
            }

            if (this.config.AddData) {
                const devicePoints = await this.myUplinkRepository?.getDevicePoints(device.id, accessToken);
                if (this.config.AddRawData) {
                    await createStringStateAsync(this, `${devPath}.rawData`, 'Received raw JSON of parameter data', JSON.stringify(devicePoints, null, ''));
                }
                devicePoints?.forEach(async (data: ParameterData) => {
                    await this.setParameterData(data, devPath);
                });
            }
        }
    }

    private async setParameterData(data: ParameterData, devPath: string): Promise<void> {
        if (data.parameterId && data.parameterName) {
            const path = `${devPath}.${data.parameterId}`;

            const objectExists = await this.objectExists(path);
            if (!objectExists) {
                const obj: ioBroker.SettableObject = {
                    type: 'state',
                    common: {
                        name: removeSoftHyphen(data.parameterName),
                        type: 'number',
                        role: 'value',
                        read: true,
                        write: data.writable ?? false,
                    },
                    native: {},
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
                            states[enumValue.value] = removeSoftHyphen(enumValue.text);
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

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     */
    private onUnload(callback: () => void): void {
        try {
            if (this.interval != undefined) {
                clearInterval(this.interval);
                this.interval = undefined;
            }
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
