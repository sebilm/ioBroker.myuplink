"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var utils = __toESM(require("@iobroker/adapter-core"));
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var import_authRepository = require("./authRepository");
var import_myuplinkRepository = require("./myuplinkRepository");
Date.prototype.today = function() {
  return this.getFullYear() + "-" + (this.getMonth() + 1 < 10 ? "0" : "") + (this.getMonth() + 1) + "-" + (this.getDate() < 10 ? "0" : "") + this.getDate();
};
Date.prototype.timeNow = function() {
  return (this.getHours() < 10 ? "0" : "") + this.getHours() + ":" + (this.getMinutes() < 10 ? "0" : "") + this.getMinutes() + ":" + (this.getSeconds() < 10 ? "0" : "") + this.getSeconds();
};
function removeSoftHyphen(text) {
  return text.replace(new RegExp("\xAD", "g"), "");
}
function replaceUnwantedLetters(text) {
  return removeSoftHyphen(text.replace(new RegExp(" ", "g"), "_").replace(new RegExp("\\.", "g"), "_"));
}
async function createDeviceAsync(adapter, path2, name) {
  await adapter.setObjectNotExistsAsync(path2, {
    type: "device",
    common: {
      name,
      role: "text"
    },
    native: {}
  });
}
async function createChannelAsync(adapter, path2, name) {
  await adapter.setObjectNotExistsAsync(path2, {
    type: "channel",
    common: {
      name,
      role: "text"
    },
    native: {}
  });
}
async function createStringStateAsync(adapter, path2, name, value) {
  await adapter.setObjectNotExistsAsync(path2, {
    type: "state",
    common: {
      name,
      type: "string",
      role: "text",
      read: true,
      write: false
    },
    native: {}
  });
  await adapter.setStateAsync(path2, { val: value, ack: true });
}
async function createBooleanStateAsync(adapter, path2, name, role, value) {
  await adapter.setObjectNotExistsAsync(path2, {
    type: "state",
    common: {
      name,
      type: "boolean",
      role,
      read: true,
      write: false
    },
    native: {}
  });
  await adapter.setStateAsync(path2, { val: value, ack: true });
}
class Myuplink extends utils.Adapter {
  constructor(options = {}) {
    super({
      ...options,
      name: "myuplink"
    });
    this.on("ready", this.onReady.bind(this));
    this.on("stateChange", this.onStateChange.bind(this));
    this.on("unload", this.onUnload.bind(this));
    this.refreshInterval = 0;
  }
  async onReady() {
    this.log.info("Starting adapter.");
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
    if (identifier == "" || identifier == null) {
      if (configured != false) {
        this.log.error("Missing Identifier in the settings!");
      }
      error = true;
    }
    if (secret == "" || secret == null) {
      if (configured != false) {
        this.log.error("Missing Secret in the settings!");
      }
      error = true;
    }
    if (callbackURL == "" || callbackURL == null) {
      if (configured != false) {
        this.log.error("Missing Callback URL in the settings!");
      }
      error = true;
    }
    if (error) {
      this.setState("info.connection", { val: false, ack: true });
      this.setState("info.currentError", { val: "Missing settings!", ack: true });
      return;
    }
    const dataDir = utils.getAbsoluteDefaultDataDir();
    let storeDir = path.join(dataDir, "myuplink");
    try {
      if (!fs.existsSync(storeDir)) {
        fs.mkdirSync(storeDir);
      }
    } catch (err) {
      this.log.error("Could not create storage directory (" + storeDir + "): " + err);
      storeDir = __dirname;
    }
    const storeFile = path.join(storeDir, "session." + this.instance + ".json");
    this.authRepository = new import_authRepository.AuthRepository(
      {
        clientId: identifier,
        clientSecret: secret,
        useAuthorizationCodeGrant: this.config.UseAuthorizationCodeGrant,
        redirectUri: callbackURL,
        authCode: this.config.AuthCode.trim(),
        sessionStoreFilePath: storeFile,
        baseUrl: "https://api.myuplink.com",
        scope: "READSYSTEM WRITESYSTEM",
        timeout: 45e3,
        userAgent: "iobroker.myuplink",
        renewBeforeExpiry: 5 * 60 * 1e3
      },
      this.log
    );
    this.myUplinkRepository = new import_myuplinkRepository.MyUplinkRepository(
      {
        baseUrl: "https://api.myuplink.com",
        timeout: 45e3,
        userAgent: "iobroker.myuplink",
        language: this.config.Language
      },
      this.log
    );
    await this.subscribeStatesAsync("*");
    this.log.info("Adapter started.");
    this.getData();
  }
  async getData() {
    var _a;
    try {
      if (this.authRepository) {
        const accessToken = await this.authRepository.getAccessToken();
        if (accessToken && this.myUplinkRepository) {
          const systems = await this.myUplinkRepository.getSystemsAndDevicesAsync(accessToken);
          this.setState("info.connection", { val: true, expire: this.refreshInterval + 30, ack: true });
          const newDate = new Date();
          const datetime = newDate.today() + " " + newDate.timeNow();
          this.setState("info.updateTime", { val: datetime, ack: true });
          this.setState("info.currentError", { val: "", ack: true });
          (_a = systems.systems) == null ? void 0 : _a.forEach(async (value) => {
            await this.setSystemWithDevices(value, accessToken);
          });
        }
      }
    } catch (error) {
      this.log.error("" + error);
      this.setState("info.connection", { val: false, ack: true });
      const newDate = new Date();
      const datetime = newDate.today() + " " + newDate.timeNow();
      this.setState("info.lastErrorTime", { val: datetime, ack: true });
      this.setState("info.lastError", { val: "" + error, ack: true });
      this.setState("info.currentError", { val: "" + error, ack: true });
    }
    this.timeout = this.setTimeout(
      async () => {
        await this.getData();
      },
      this.refreshInterval * 1e3
    );
  }
  async setSystemWithDevices(system, accessToken) {
    var _a, _b, _c;
    if (system.systemId != void 0 && system.name != void 0) {
      const systemPath = replaceUnwantedLetters(system.systemId);
      const systemName = removeSoftHyphen(system.name);
      await createDeviceAsync(this, systemPath, systemName);
      await createStringStateAsync(this, `${systemPath}.systemId`, "System ID", system.systemId);
      await createStringStateAsync(this, `${systemPath}.name`, "Name", systemName);
      if (system.country != void 0) {
        await createStringStateAsync(this, `${systemPath}.country`, "Country", system.country);
      }
      if (system.securityLevel != void 0) {
        await createStringStateAsync(this, `${systemPath}.securityLevel`, "Security Level", system.securityLevel);
      }
      if (system.hasAlarm != void 0) {
        await createBooleanStateAsync(this, `${systemPath}.hasAlarm`, "Has Alarm", "indicator.alarm", system.hasAlarm);
      }
      (_a = system.devices) == null ? void 0 : _a.forEach(async (dev) => {
        await this.setSystemDevice(dev, systemPath, accessToken);
      });
      if (this.config.AddActiveNotifications) {
        const notifications = await ((_b = this.myUplinkRepository) == null ? void 0 : _b.getActiveNotificationsAsync(system.systemId, accessToken));
        if (this.config.AddRawActiveNotifications) {
          await createStringStateAsync(this, `${systemPath}.rawActiveNotifications`, "Received raw JSON of active notifications", JSON.stringify(notifications == null ? void 0 : notifications.notifications, null, ""));
        }
        let notificationsDescriptions = "";
        (_c = notifications == null ? void 0 : notifications.notifications) == null ? void 0 : _c.forEach((notification) => {
          notificationsDescriptions += `${notification.header}: ${notification.description}
`;
        });
        await createStringStateAsync(this, `${systemPath}.activeNotifications`, "Active notification descriptions", notificationsDescriptions);
      }
    }
  }
  async setSystemDevice(device, systemPath, accessToken) {
    var _a, _b, _c;
    if (device.id != void 0 && ((_a = device.product) == null ? void 0 : _a.name) != void 0) {
      const devPath = `${systemPath}.${replaceUnwantedLetters(device.id)}`;
      const deviceName = removeSoftHyphen(device.product.name);
      await createChannelAsync(this, devPath, deviceName);
      await createStringStateAsync(this, `${devPath}.deviceId`, "Device ID", device.id);
      await createStringStateAsync(this, `${devPath}.name`, "Name", deviceName);
      if (device.connectionState != void 0) {
        await createStringStateAsync(this, `${devPath}.connectionState`, "Connection State", device.connectionState);
      }
      if (device.currentFwVersion != void 0) {
        await createStringStateAsync(this, `${devPath}.currentFwVersion`, "Current Firmware Version", device.currentFwVersion);
      }
      if (((_b = device.product) == null ? void 0 : _b.serialNumber) != void 0) {
        await createStringStateAsync(this, `${devPath}.serialNumber`, "Serial Number", device.product.serialNumber);
      }
      if (this.config.AddData) {
        const devicePoints = await ((_c = this.myUplinkRepository) == null ? void 0 : _c.getDevicePointsAsync(device.id, accessToken));
        if (this.config.AddRawData) {
          await createStringStateAsync(this, `${devPath}.rawData`, "Received raw JSON of parameter data", JSON.stringify(devicePoints, null, ""));
        }
        devicePoints == null ? void 0 : devicePoints.forEach(async (data) => {
          await this.setParameterData(data, devPath, device.id);
        });
      }
    }
  }
  async setParameterData(data, devPath, deviceId) {
    var _a;
    if (data.parameterId && data.parameterName) {
      const cathPath = data.category ? `${devPath}.${replaceUnwantedLetters(data.category)}.${replaceUnwantedLetters(data.parameterId)}` : null;
      const noCathPath = `${devPath}.${replaceUnwantedLetters(data.parameterId)}`;
      if (cathPath) {
        if (this.config.GroupData) {
          await this.delObjectAsync(noCathPath);
        } else {
          await this.delObjectAsync(cathPath);
        }
      }
      const path2 = this.config.GroupData && cathPath ? cathPath : noCathPath;
      const objectExists = await this.objectExists(path2);
      if (!objectExists) {
        const obj = {
          type: "state",
          common: {
            name: removeSoftHyphen(data.parameterName),
            type: "number",
            role: "value",
            read: true,
            write: (_a = data.writable) != null ? _a : false
          },
          native: {
            parameterId: data.parameterId,
            writable: data.writable,
            deviceId
          }
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
        await this.setObjectNotExistsAsync(path2, obj);
      }
      await this.setStateAsync(path2, { val: data.value, ack: true });
    }
  }
  async setInfoObjects() {
    await this.setObjectNotExistsAsync("info", {
      type: "channel",
      common: {
        name: "Information"
      },
      native: {}
    });
    await this.setObjectNotExistsAsync("info.connection", {
      type: "state",
      common: {
        name: "Connected to myUplink",
        role: "indicator.connected",
        type: "boolean",
        read: true,
        write: false,
        def: false
      },
      native: {}
    });
    await this.setObjectNotExistsAsync("info.currentError", {
      type: "state",
      common: {
        name: "Current Error",
        role: "text",
        type: "string",
        read: true,
        write: false,
        def: ""
      },
      native: {}
    });
    await this.setObjectNotExistsAsync("info.updateTime", {
      type: "state",
      common: {
        name: "Time of the last update",
        role: "text",
        type: "string",
        read: true,
        write: false,
        def: ""
      },
      native: {}
    });
    await this.setObjectNotExistsAsync("info.lastError", {
      type: "state",
      common: {
        name: "Last Error",
        role: "text",
        type: "string",
        read: true,
        write: false,
        def: ""
      },
      native: {}
    });
    await this.setObjectNotExistsAsync("info.lastErrorTime", {
      type: "state",
      common: {
        name: "Time of the last error",
        role: "text",
        type: "string",
        read: true,
        write: false,
        def: ""
      },
      native: {}
    });
  }
  async onStateChange(id, state) {
    if (state != null && state.ack === false && state.q == 0 && state.val != null && this.authRepository != null && this.myUplinkRepository != null) {
      this.log.debug(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
      const obj = await this.getObjectAsync(id);
      if (obj != null && obj.native != null && obj.native.writable == true && obj.native.parameterId != null && obj.native.parameterId != "" && obj.native.deviceId != null && obj.native.deviceId != "") {
        try {
          const accessToken = await this.authRepository.getAccessToken();
          if (accessToken) {
            const deviceId = obj.native.deviceId;
            const parameterId = obj.native.parameterId.toString();
            const value = state.val.toString();
            await this.myUplinkRepository.setDevicePointsAsync(deviceId, accessToken, parameterId, value);
            const devicePoints = await this.myUplinkRepository.getDevicePointsAsync(deviceId, accessToken, parameterId);
            devicePoints == null ? void 0 : devicePoints.forEach(async (data) => {
              if (data.parameterId == parameterId) {
                await this.setStateAsync(id, { val: data.value, ack: true });
              }
            });
          }
        } catch (error) {
          const errorString = `${error}`;
          this.log.error(errorString);
          const quality = 68;
          await this.setStateAsync(id, { val: state.val, q: quality, c: errorString, ack: false });
        }
      }
    }
  }
  onUnload(callback) {
    try {
      this.clearTimeout(this.timeout);
      this.timeout = void 0;
      this.authRepository = void 0;
      this.myUplinkRepository = void 0;
      this.setState("info.connection", { val: false, ack: true });
      this.log.info("Cleaned everything up...");
      callback();
    } catch (e) {
      callback();
    }
  }
}
if (require.main !== module) {
  module.exports = (options) => new Myuplink(options);
} else {
  (() => new Myuplink())();
}
//# sourceMappingURL=main.js.map
