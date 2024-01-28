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
class Myuplink extends utils.Adapter {
  constructor(options = {}) {
    super({
      ...options,
      name: "myuplink"
    });
    this.systemIds = /* @__PURE__ */ new Map();
    this.deviceIds = /* @__PURE__ */ new Map();
    this.categories = /* @__PURE__ */ new Map();
    this.parameterIds = /* @__PURE__ */ new Map();
    this.parameterIdToCategory = /* @__PURE__ */ new Map();
    this.on("ready", this.onReady.bind(this));
    this.on("stateChange", this.onStateChange.bind(this));
    this.on("unload", this.onUnload.bind(this));
    this.refreshInterval = 0;
  }
  async onReady() {
    var _a, _b, _c, _d;
    this.log.info("Starting adapter.");
    await this.setInfoObjects();
    (_a = this.config.RenameSystemIds) == null ? void 0 : _a.forEach((renameData) => {
      if (renameData.OriginalId && renameData.NewId) {
        this.log.debug(`Map System ID: ${renameData.OriginalId} -> ${renameData.NewId}`);
        this.systemIds.set(renameData.OriginalId, this.replaceForbiddenCharacters(renameData.NewId));
      }
    });
    (_b = this.config.RenameDeviceIds) == null ? void 0 : _b.forEach((renameData) => {
      if (renameData.OriginalId && renameData.NewId) {
        this.log.debug(`Map Device ID: ${renameData.OriginalId} -> ${renameData.NewId}`);
        this.deviceIds.set(renameData.OriginalId, this.replaceForbiddenCharacters(renameData.NewId));
      }
    });
    (_c = this.config.RenameCategories) == null ? void 0 : _c.forEach((renameData) => {
      if (renameData.OriginalId && renameData.NewId) {
        this.log.debug(`Map Category: ${renameData.OriginalId} -> ${renameData.NewId}`);
        this.categories.set(renameData.OriginalId, this.replaceForbiddenCharacters(renameData.NewId));
      }
    });
    (_d = this.config.RenameDataIds) == null ? void 0 : _d.forEach((renameData) => {
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
      const systemId = this.replaceForbiddenCharacters(system.systemId);
      const newSystemId = this.systemIds.get(systemId);
      const systemPath = newSystemId != null ? newSystemId : systemId;
      const systemName = this.removeSoftHyphen(system.name);
      await this.myCreateDeviceAsync(systemPath, systemName);
      await this.myCreateStringStateAsync(`${systemPath}.systemId`, "System ID", system.systemId);
      await this.myCreateStringStateAsync(`${systemPath}.name`, "Name", systemName, "info.name");
      if (system.country != void 0) {
        await this.myCreateStringStateAsync(`${systemPath}.country`, "Country", system.country);
      }
      if (system.securityLevel != void 0) {
        await this.myCreateStringStateAsync(`${systemPath}.securityLevel`, "Security Level", system.securityLevel);
      }
      if (system.hasAlarm != void 0) {
        await this.myCreateBooleanStateAsync(`${systemPath}.hasAlarm`, "Has Alarm", "indicator.alarm", system.hasAlarm);
      }
      (_a = system.devices) == null ? void 0 : _a.forEach(async (dev) => {
        await this.setSystemDevice(dev, systemPath, accessToken);
      });
      if (this.config.AddActiveNotifications) {
        const notifications = await ((_b = this.myUplinkRepository) == null ? void 0 : _b.getActiveNotificationsAsync(system.systemId, accessToken));
        if (this.config.AddRawActiveNotifications) {
          await this.myCreateStringStateAsync(`${systemPath}.rawActiveNotifications`, "Received raw JSON of active notifications", JSON.stringify(notifications == null ? void 0 : notifications.notifications, null, ""));
        }
        let notificationsDescriptions = "";
        (_c = notifications == null ? void 0 : notifications.notifications) == null ? void 0 : _c.forEach((notification) => {
          notificationsDescriptions += `${notification.header}: ${notification.description}
`;
        });
        await this.myCreateStringStateAsync(`${systemPath}.activeNotifications`, "Active notification descriptions", notificationsDescriptions);
      }
    }
  }
  async setSystemDevice(device, systemPath, accessToken) {
    var _a, _b, _c;
    if (device.id != void 0 && ((_a = device.product) == null ? void 0 : _a.name) != void 0) {
      const deviceId = this.replaceForbiddenCharacters(device.id);
      const newDeviceId = this.deviceIds.get(deviceId);
      const deviceSubPath = newDeviceId != null ? newDeviceId : deviceId;
      const devicePath = `${systemPath}.${deviceSubPath}`;
      const deviceName = this.removeSoftHyphen(device.product.name);
      await this.myCreateChannelAsync(devicePath, deviceName);
      await this.myCreateStringStateAsync(`${devicePath}.deviceId`, "Device ID", device.id);
      await this.myCreateStringStateAsync(`${devicePath}.name`, "Name", deviceName, "info.name");
      if (device.connectionState != void 0) {
        await this.myCreateStringStateAsync(`${devicePath}.connectionState`, "Connection State", device.connectionState, "info.status");
      }
      if (device.currentFwVersion != void 0) {
        await this.myCreateStringStateAsync(`${devicePath}.currentFwVersion`, "Current Firmware Version", device.currentFwVersion, "info.firmware");
      }
      if (((_b = device.product) == null ? void 0 : _b.serialNumber) != void 0) {
        await this.myCreateStringStateAsync(`${devicePath}.serialNumber`, "Serial Number", device.product.serialNumber, "info.serial");
      }
      if (this.config.AddData) {
        const devicePoints = await ((_c = this.myUplinkRepository) == null ? void 0 : _c.getDevicePointsAsync(device.id, accessToken));
        if (this.config.AddRawData) {
          await this.myCreateStringStateAsync(`${devicePath}.rawData`, "Received raw JSON of parameter data", JSON.stringify(devicePoints, null, ""));
        }
        devicePoints == null ? void 0 : devicePoints.forEach(async (data) => {
          await this.setParameterData(data, devicePath, device.id);
        });
        await this.setObjectNotExistsAsync(`${devicePath}.setData`, {
          type: "state",
          common: {
            name: "Send raw JSON of parameter data",
            type: "string",
            role: "json",
            read: true,
            write: true
          },
          native: {
            rawJson: true,
            writable: true,
            deviceId: device.id
          }
        });
      }
    }
  }
  async setParameterData(data, devicePath, deviceId) {
    var _a;
    if (data.parameterId && data.parameterName) {
      const parameterId = this.replaceForbiddenCharacters(data.parameterId);
      const newParameterId = this.parameterIds.get(parameterId);
      const parameterSubPath = newParameterId != null ? newParameterId : parameterId;
      let path2 = `${devicePath}.${parameterSubPath}`;
      const newCategory = this.parameterIdToCategory.get(parameterId);
      if (newCategory) {
        path2 = `${devicePath}.${newCategory}.${parameterSubPath}`;
      } else if (data.category) {
        const categoryId = this.replaceForbiddenCharacters(data.category);
        const newCategoryId = this.categories.get(categoryId);
        const categorySubPath = newCategoryId != null ? newCategoryId : categoryId;
        const catPath = `${devicePath}.${categorySubPath}`;
        const pathWithCat = `${catPath}.${parameterSubPath}`;
        if (this.config.GroupData) {
          await this.delObjectAsync(path2);
          path2 = pathWithCat;
          await this.myCreateFolderAsync(catPath, data.category);
        } else {
          await this.delObjectAsync(pathWithCat);
          await this.delObjectAsync(catPath);
        }
      }
      const objectExists = await this.objectExists(path2);
      if (!objectExists) {
        const obj = {
          type: "state",
          common: {
            name: this.removeSoftHyphen(data.parameterName),
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
          switch (data.parameterUnit) {
            case "kWh":
            case "Ws":
              obj.common.role = "value.energy";
              break;
            case "W":
            case "kW":
              obj.common.role = "value.power";
              break;
            case "\xB0C":
              obj.common.role = "value.temperature";
              break;
            case "Hz":
              obj.common.role = "value.frequency";
              break;
            case "A":
              obj.common.role = "value.current";
              break;
            case "V":
              obj.common.role = "value.voltage";
              break;
            case "%RH":
              obj.common.role = "value.humidity";
              obj.common.unit = "%";
              break;
            case "bar":
              obj.common.role = "value.pressure";
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
          const states = {};
          data.enumValues.forEach((enumValue) => {
            if (enumValue.text && enumValue.value) {
              states[enumValue.value] = this.removeSoftHyphen(enumValue.text);
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
  async myCreateDeviceAsync(path2, name) {
    await this.setObjectNotExistsAsync(path2, {
      type: "device",
      common: {
        name
      },
      native: {}
    });
  }
  async myCreateChannelAsync(path2, name) {
    await this.setObjectNotExistsAsync(path2, {
      type: "channel",
      common: {
        name
      },
      native: {}
    });
  }
  async myCreateFolderAsync(path2, name) {
    await this.setObjectNotExistsAsync(path2, {
      type: "folder",
      common: {
        name
      },
      native: {}
    });
  }
  async myCreateStringStateAsync(path2, name, value, role = "text") {
    await this.setObjectNotExistsAsync(path2, {
      type: "state",
      common: {
        name,
        type: "string",
        role,
        read: true,
        write: false
      },
      native: {}
    });
    await this.setStateAsync(path2, { val: value, ack: true });
  }
  async myCreateBooleanStateAsync(path2, name, role, value) {
    await this.setObjectNotExistsAsync(path2, {
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
    await this.setStateAsync(path2, { val: value, ack: true });
  }
  removeSoftHyphen(text) {
    return text.replace(new RegExp("\xAD", "g"), "");
  }
  replaceForbiddenCharacters(text) {
    return this.removeSoftHyphen(text).replace(new RegExp("\\.", "g"), "_").replace(this.FORBIDDEN_CHARS, "_");
  }
  async onStateChange(id, state) {
    if (state != null && state.ack === false && state.q == this.constants.STATE_QUALITY.GOOD && state.val != null && this.authRepository != null && this.myUplinkRepository != null) {
      this.log.debug(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
      const obj = await this.getObjectAsync(id);
      if (obj != null && obj.native != null && obj.native.writable == true && obj.native.deviceId != null && obj.native.deviceId != "") {
        try {
          const accessToken = await this.authRepository.getAccessToken();
          if (accessToken) {
            const deviceId = obj.native.deviceId;
            const value = state.val.toString();
            if (obj.native.parameterId != null && obj.native.parameterId != "") {
              const parameterId = obj.native.parameterId.toString();
              await this.myUplinkRepository.setDevicePointAsync(deviceId, accessToken, parameterId, value);
              await this.getAndSetParameters(id, deviceId, accessToken, [parameterId]);
            } else if (obj.native.rawJson === true) {
              const keyValueDictionary = JSON.parse(value);
              await this.myUplinkRepository.setDevicePointsAsync(deviceId, accessToken, keyValueDictionary);
              await this.setStateAsync(id, { val: state.val, q: this.constants.STATE_QUALITY.GOOD, ack: true, c: void 0 });
              const parameterIds = Object.keys(keyValueDictionary);
              await this.getAndSetParameters(id, deviceId, accessToken, parameterIds);
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
  async getAndSetParameters(id, deviceId, accessToken, parameterIds) {
    if (this.myUplinkRepository) {
      const devicePoints = await this.myUplinkRepository.getDevicePointsAsync(deviceId, accessToken, parameterIds.join(","));
      devicePoints == null ? void 0 : devicePoints.forEach(async (data) => {
        if (data.parameterId && parameterIds.includes(data.parameterId)) {
          await this.setStateAsync(id, { val: data.value, ack: true });
        }
      });
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
