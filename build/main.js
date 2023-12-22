"use strict";
/*
 * Created with @iobroker/create-adapter v2.5.0
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = __importStar(require("@iobroker/adapter-core"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const authRepository_1 = require("./authRepository");
const myuplinkRepository_1 = require("./myuplinkRepository");
Date.prototype.today = function () {
    return this.getFullYear() + '-' + (this.getMonth() + 1 < 10 ? '0' : '') + (this.getMonth() + 1) + '-' + (this.getDate() < 10 ? '0' : '') + this.getDate();
};
Date.prototype.timeNow = function () {
    return (this.getHours() < 10 ? '0' : '') + this.getHours() + ':' + (this.getMinutes() < 10 ? '0' : '') + this.getMinutes() + ':' + (this.getSeconds() < 10 ? '0' : '') + this.getSeconds();
};
function removeSoftHyphen(text) {
    return text.replace(new RegExp('\u00AD', 'g'), '');
}
async function createDeviceAsync(adapter, path, name) {
    await adapter.setObjectNotExistsAsync(path, {
        type: 'device',
        common: {
            name: name,
            role: 'text',
        },
        native: {},
    });
}
async function createChannelAsync(adapter, path, name) {
    await adapter.setObjectNotExistsAsync(path, {
        type: 'channel',
        common: {
            name: name,
            role: 'text',
        },
        native: {},
    });
}
async function createStringStateAsync(adapter, path, name, value) {
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
async function createBooleanStateAsync(adapter, path, name, role, value) {
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
    constructor(options = {}) {
        super({
            ...options,
            name: 'myuplink',
        });
        this.on('ready', this.onReady.bind(this));
        this.on('unload', this.onUnload.bind(this));
        this.refreshInterval = 0;
    }
    /**
     * Is called when databases are connected and adapter received configuration.
     */
    async onReady() {
        // Initialize your adapter here
        this.log.info('Starting adapter.');
        await this.setInfoObjects();
        this.refreshInterval = this.config.Interval * 60;
        if (this.refreshInterval < 60) {
            this.refreshInterval = 60;
        }
        const identifier = this.config.Identifier.trim();
        const secret = this.config.Secret.trim();
        const callbackURL = this.config.CallbackURL.trim();
        const configured = this.config.Configured;
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
        const dataDir = utils.getAbsoluteDefaultDataDir();
        let storeDir = path.join(dataDir, 'myuplink');
        try {
            // create directory
            if (!fs.existsSync(storeDir)) {
                fs.mkdirSync(storeDir);
            }
        }
        catch (err) {
            this.log.error('Could not create storage directory (' + storeDir + '): ' + err);
            storeDir = __dirname;
        }
        const storeFile = path.join(storeDir, 'session.' + this.instance + '.json');
        this.authRepository = new authRepository_1.AuthRepository({
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
        }, this.log);
        this.myUplinkRepository = new myuplinkRepository_1.MyUplinkRepository({
            baseUrl: 'https://api.myuplink.com',
            timeout: 45000,
            userAgent: 'iobroker.myuplink',
            language: this.config.Language,
        }, this.log);
        this.log.info('Adapter started.');
        this.getData();
        this.interval = setInterval(async () => {
            await this.getData();
        }, this.refreshInterval * 1000);
    }
    async getData() {
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
                    systems.systems?.forEach(async (value) => {
                        await this.setSystemWithDevices(value, accessToken);
                    });
                }
            }
        }
        catch (error) {
            this.log.error('' + error);
            this.setState('info.connection', { val: false, ack: true });
            const newDate = new Date();
            const datetime = newDate.today() + ' ' + newDate.timeNow();
            this.setState('info.lastErrorTime', { val: datetime, ack: true });
            this.setState('info.lastError', { val: '' + error, ack: true });
            this.setState('info.currentError', { val: '' + error, ack: true });
        }
    }
    async setSystemWithDevices(system, accessToken) {
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
            system.devices?.forEach(async (dev) => {
                await this.setSystemDevice(dev, systemPath, accessToken);
            });
            const notifications = await this.myUplinkRepository?.getActiveNotifications(system.systemId, accessToken);
            await createStringStateAsync(this, `${systemPath}.rawActiveNotifications`, 'Received raw JSON of active notifications', JSON.stringify(notifications, null, ''));
        }
    }
    async setSystemDevice(device, systemPath, accessToken) {
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
            const devicePoints = await this.myUplinkRepository?.getDevicePoints(device.id, accessToken);
            if (this.config.AddRawData) {
                await createStringStateAsync(this, `${devPath}.rawData`, 'Received raw JSON of parameter data', JSON.stringify(devicePoints, null, ''));
            }
            devicePoints?.forEach(async (data) => {
                await this.setParameterData(data, devPath);
            });
        }
    }
    async setParameterData(data, devPath) {
        if (data.parameterId && data.parameterName) {
            const path = `${devPath}.${data.parameterId}`;
            const objectExists = await this.objectExists(path);
            if (!objectExists) {
                const obj = {
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
                    const states = {};
                    data.enumValues.forEach((enumValue) => {
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
    async setInfoObjects() {
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
    onUnload(callback) {
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
        }
        catch (e) {
            callback();
        }
    }
}
if (require.main !== module) {
    // Export the constructor in compact mode
    module.exports = (options) => new Myuplink(options);
}
else {
    // otherwise start the instance directly
    (() => new Myuplink())();
}
//# sourceMappingURL=main.js.map