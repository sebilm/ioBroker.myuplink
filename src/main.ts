/*
 * Created with @iobroker/create-adapter v2.5.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
import * as utils from '@iobroker/adapter-core';
import * as fs from 'fs';
import * as path from 'path';
import { MyUplinkLogic } from './myUplinkLogic';

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

    private myUplink: MyUplinkLogic | undefined;
    private timeout: ioBroker.Timeout | undefined;
    private refreshInterval: number;

    async CreateSystemAsync(path: string, name: string): Promise<void> {
        this.log.debug(`create Device: ${path}`);
        await this.setObjectNotExistsAsync(path, {
            type: 'device',
            common: {
                name: name,
            },
            native: {},
        });
    }

    async CreateDeviceAsync(path: string, name: string): Promise<void> {
        this.log.debug(`create Channel: ${path}`);
        await this.setObjectNotExistsAsync(path, {
            type: 'channel',
            common: {
                name: name,
            },
            native: {},
        });
    }

    async CreateCategoryAsync(path: string, name: string): Promise<void> {
        this.log.debug(`create Folder: ${path}`);
        await this.setObjectNotExistsAsync(path, {
            type: 'folder',
            common: {
                name: name,
            },
            native: {},
        });
    }

    async CreateStringStateAsync(path: string, name: string, value: string, createObject: boolean, role: string = 'text'): Promise<void> {
        if (createObject) {
            this.log.debug(`create string state: ${path}`);
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

    async CreateBooleanStateAsync(path: string, name: string, role: string, value: boolean, createObject: boolean): Promise<void> {
        if (createObject) {
            this.log.debug(`create boolean state: ${path}`);
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

    async CreateWritableStringObjectAsync(path: string, name: string, role: string, deviceId: string): Promise<void> {
        this.log.debug(`create writeable string state: ${path}`);
        await this.extendObjectAsync(path, {
            type: 'state',
            common: {
                name: name,
                type: 'string',
                role: role,
                read: true,
                write: true,
            },
            native: {
                rawJson: true,
                writable: true,
                deviceId: deviceId,
            },
        });
    }

    async CreateParameterObjectAsync(
        path: string,
        name: string,
        deviceId: string | null | undefined,
        parameterId: string | null | undefined,
        role: string,
        writable: boolean,
        unit: string | undefined,
        min: number | undefined,
        max: number | undefined,
        step: number | undefined,
        states: Record<string, string> | undefined,
    ): Promise<void> {
        const obj: ioBroker.SettableObject = {
            type: 'state',
            common: {
                name: name,
                type: 'number',
                role: role,
                read: true,
                write: writable,
                unit: unit,
                min: min,
                max: max,
                step: step,
                states: states,
            },
            native: {
                parameterId: parameterId,
                writable: writable,
                deviceId: deviceId,
            },
        };
        await this.extendObjectAsync(path, obj);
    }

    async SetStateAsync(path: string, value: string | number | boolean | null): Promise<void> {
        await this.setStateAsync(path, { val: value, ack: true });
    }

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

        const dataDir = utils.getAbsoluteDefaultDataDir();
        const storeDir = path.join(dataDir, `myuplink_${this.instance}`);
        try {
            // create directory
            if (!fs.existsSync(storeDir)) {
                fs.mkdirSync(storeDir);
            }
        } catch (err) {
            this.log.error('Could not create storage directory (' + storeDir + '): ' + err);
            return;
        }

        try {
            this.myUplink = new MyUplinkLogic(this, this.config, storeDir, this.log);
        } catch (error) {
            this.setState('info.connection', { val: false, ack: true });
            this.setState('info.currentError', { val: `${error}`, ack: true });
            return;
        }

        await this.subscribeStatesAsync('*');

        this.log.info('Adapter started.');

        await this.getDataAsync();
    }

    private async getDataAsync(): Promise<void> {
        if (this.myUplink) {
            const error = await this.myUplink.GetDataAsync();
            const newDate = new Date();
            const datetime = newDate.today() + ' ' + newDate.timeNow();
            if (error) {
                await this.setStateAsync('info.connection', { val: false, ack: true });
                await this.setStateAsync('info.lastErrorTime', { val: datetime, ack: true });
                await this.setStateAsync('info.lastError', { val: error, ack: true });
                await this.setStateAsync('info.currentError', { val: error, ack: true });
            } else {
                await this.setStateAsync('info.connection', { val: true, expire: this.refreshInterval + 30, ack: true });
                await this.setStateAsync('info.updateTime', { val: datetime, ack: true });
                await this.setStateAsync('info.currentError', { val: '', ack: true });
            }
        }

        this.log.debug('Set timer');
        this.timeout = this.setTimeout(
            async () => {
                await this.getDataAsync();
            },
            <number>this.refreshInterval * 1000,
        );
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
     * Is called if a subscribed state changes
     */
    private async onStateChange(id: string, state: ioBroker.State | null | undefined): Promise<void> {
        if (state != null && state.ack === false && state.q == this.constants.STATE_QUALITY.GOOD && state.val != null && this.myUplink != null) {
            this.log.debug(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
            const obj = await this.getObjectAsync(id);
            if (obj != null && obj.native != null && obj.native.writable == true && obj.native.deviceId) {
                const deviceId: string = obj.native.deviceId;
                const parameterId: string | null = obj.native.parameterId?.toString();
                const error = await this.myUplink.SetDataAsync(id, state.val, deviceId, parameterId, obj.native.rawJson === true);
                if (error) {
                    await this.setStateAsync(id, { val: state.val, q: this.constants.STATE_QUALITY.DEVICE_ERROR_REPORT, ack: false, c: error });
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
            this.myUplink = undefined;
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
