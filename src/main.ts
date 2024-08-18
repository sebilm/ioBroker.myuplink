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
    return (
        (this.getHours() < 10 ? '0' : '') +
        this.getHours() +
        ':' +
        (this.getMinutes() < 10 ? '0' : '') +
        this.getMinutes() +
        ':' +
        (this.getSeconds() < 10 ? '0' : '') +
        this.getSeconds()
    );
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
        this.log.debug(`Create Device object if not exists: ${path}`);
        await this.setObjectNotExistsAsync(path, {
            type: 'device',
            common: {
                name: name,
            },
            native: {},
        });
    }

    async CreateDeviceAsync(path: string, name: string): Promise<void> {
        this.log.debug(`Create Channel object if not exists: ${path}`);
        await this.setObjectNotExistsAsync(path, {
            type: 'channel',
            common: {
                name: name,
            },
            native: {},
        });
    }

    async CreateCategoryAsync(path: string, name: string): Promise<void> {
        this.log.debug(`Create Folder object if not exists: ${path}`);
        await this.setObjectNotExistsAsync(path, {
            type: 'folder',
            common: {
                name: name,
            },
            native: {},
        });
    }

    async CreateStringObjectAsync(path: string, name: string, value: string, createObject: boolean, role: string = 'text'): Promise<void> {
        if (createObject) {
            this.log.debug(`Create string object if not exists: ${path}`);
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
        await this.setState(path, { val: value, ack: true });
    }

    async CreateBooleanObjectAsync(path: string, name: string, role: string, value: boolean, createObject: boolean): Promise<void> {
        if (createObject) {
            this.log.debug(`Create boolean object if not exists: ${path}`);
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
        await this.setState(path, { val: value, ack: true });
    }

    async CreateWritableStringObjectAsync(path: string, name: string, role: string, deviceId: string): Promise<void> {
        this.log.debug(`Create or update writeable string object: ${path}`);
        await this.extendObject(path, {
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

    async CreateOrUpdateParameterObjectAsync(
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
        const readObject = await this.getObjectAsync(path);
        if (readObject == null) {
            const newObject: ioBroker.SettableObject = {
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
            this.log.debug(`Create new parameter object: ${path}`);
            await this.setObjectAsync(path, newObject);
        } else {
            let changed = false;
            if (readObject.common == null) {
                readObject.common = {
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
                };
                changed = true;
            } else {
                if (readObject.common.name != name) {
                    readObject.common.name = name;
                    changed = true;
                }
                if (readObject.common.type != 'number') {
                    readObject.common.type = 'number';
                    changed = true;
                }
                if (readObject.common.role != role) {
                    readObject.common.role = role;
                    changed = true;
                }
                if (readObject.common.read != true) {
                    readObject.common.read = true;
                    changed = true;
                }
                if (readObject.common.write != writable) {
                    readObject.common.write = writable;
                    changed = true;
                }
                if (readObject.common.unit != unit) {
                    readObject.common.unit = unit;
                    changed = true;
                }
                if (readObject.common.min != min) {
                    readObject.common.min = min;
                    changed = true;
                }
                if (readObject.common.max != max) {
                    readObject.common.max = max;
                    changed = true;
                }
                if (readObject.common.step != step) {
                    readObject.common.step = step;
                    changed = true;
                }
                if (!this.areRecordsEqual(readObject.common.states, states)) {
                    readObject.common.states = states;
                    changed = true;
                }
            }
            if (readObject.native == null) {
                readObject.native = {
                    parameterId: parameterId,
                    writable: writable,
                    deviceId: deviceId,
                };
                changed = true;
            } else {
                if (readObject.native.parameterId != parameterId) {
                    readObject.native.parameterId = parameterId;
                    changed = true;
                }
                if (readObject.native.writable != writable) {
                    readObject.native.writable = writable;
                    changed = true;
                }
                if (readObject.native.deviceId != deviceId) {
                    readObject.native.deviceId = deviceId;
                    changed = true;
                }
            }

            if (changed) {
                this.log.debug(`Update parameter object: ${path}`);
                await this.setObjectAsync(path, readObject);
            }
        }
    }

    async SetStateAsync(path: string, value: string | number | boolean | null): Promise<void> {
        await this.setState(path, { val: value, ack: true });
    }

    private areRecordsEqual(record1: Record<string, string> | null | undefined, record2: Record<string, string> | null | undefined): boolean {
        if (record1 == null && record2 == null) {
            return true;
        }
        if (record1 == null || record2 == null) {
            return false;
        }

        const keys1 = Object.keys(record1);
        const keys2 = Object.keys(record2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            if (record1[key] !== record2[key]) {
                return false;
            }
        }

        return true;
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
                await this.setState('info.connection', { val: false, ack: true });
                await this.setState('info.lastErrorTime', { val: datetime, ack: true });
                await this.setState('info.lastError', { val: error, ack: true });
                await this.setState('info.currentError', { val: error, ack: true });
            } else {
                await this.setState('info.connection', { val: true, expire: this.refreshInterval + 30, ack: true });
                await this.setState('info.updateTime', { val: datetime, ack: true });
                await this.setState('info.currentError', { val: '', ack: true });
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
                    await this.setState(id, { val: state.val, q: this.constants.STATE_QUALITY.DEVICE_ERROR_REPORT, ack: false, c: error });
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
