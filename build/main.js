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
    this.STRICT_FORBIDDEN_CHARS = /[^a-zA-Z0-9_-]+/gu;
    this.systemIds = /* @__PURE__ */ new Map();
    this.deviceIds = /* @__PURE__ */ new Map();
    this.categories = /* @__PURE__ */ new Map();
    this.parameterIds = /* @__PURE__ */ new Map();
    this.parameterIdToCategory = /* @__PURE__ */ new Map();
    this.objectIdIdByParameterIdByDeviceId = /* @__PURE__ */ new Map();
    this.existingSystemIds = [];
    this.existingFolders = [];
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
    await this.getDataAsync();
  }
  async getDataAsync() {
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
            await this.setSystemWithDevicesAsync(value, accessToken);
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
        await this.getDataAsync();
      },
      this.refreshInterval * 1e3
    );
  }
  async setSystemWithDevicesAsync(system, accessToken) {
    var _a, _b, _c;
    if (system.systemId != void 0 && system.name != void 0) {
      const systemIdExists = this.existingSystemIds.includes(system.systemId);
      const firstRun = !systemIdExists;
      if (!systemIdExists) {
        this.existingSystemIds.push(system.systemId);
      }
      const systemId = this.replaceForbiddenCharacters(system.systemId);
      const newSystemId = this.systemIds.get(systemId);
      const systemPath = newSystemId != null ? newSystemId : systemId;
      const systemName = this.removeSoftHyphen(system.name);
      if (firstRun) {
        await this.myCreateDeviceAsync(systemPath, systemName);
      }
      await this.myCreateStringStateAsync(`${systemPath}.systemId`, "System ID", system.systemId, firstRun);
      await this.myCreateStringStateAsync(`${systemPath}.name`, "Name", systemName, firstRun, "info.name");
      if (system.country != void 0) {
        await this.myCreateStringStateAsync(`${systemPath}.country`, "Country", system.country, firstRun);
      }
      if (system.securityLevel != void 0) {
        await this.myCreateStringStateAsync(`${systemPath}.securityLevel`, "Security Level", system.securityLevel, firstRun);
      }
      if (system.hasAlarm != void 0) {
        await this.myCreateBooleanStateAsync(`${systemPath}.hasAlarm`, "Has Alarm", "indicator.alarm", system.hasAlarm, firstRun);
      }
      (_a = system.devices) == null ? void 0 : _a.forEach(async (dev) => {
        await this.setSystemDeviceAsync(dev, systemPath, accessToken);
      });
      if (this.config.AddActiveNotifications) {
        const notifications = await ((_b = this.myUplinkRepository) == null ? void 0 : _b.getActiveNotificationsAsync(system.systemId, accessToken));
        if (this.config.AddRawActiveNotifications) {
          await this.myCreateStringStateAsync(
            `${systemPath}.rawActiveNotifications`,
            "Received raw JSON of active notifications",
            JSON.stringify(notifications == null ? void 0 : notifications.notifications, null, ""),
            firstRun
          );
        }
        let notificationsDescriptions = "";
        (_c = notifications == null ? void 0 : notifications.notifications) == null ? void 0 : _c.forEach((notification) => {
          notificationsDescriptions += `${notification.header}: ${notification.description}
`;
        });
        await this.myCreateStringStateAsync(`${systemPath}.activeNotifications`, "Active notification descriptions", notificationsDescriptions, firstRun);
      }
    }
  }
  async setSystemDeviceAsync(device, systemPath, accessToken) {
    var _a, _b, _c;
    if (device.id != void 0 && ((_a = device.product) == null ? void 0 : _a.name) != void 0) {
      const existingMap = this.objectIdIdByParameterIdByDeviceId.get(device.id);
      const firstRun = !existingMap;
      const stateIdByParameterId = existingMap != null ? existingMap : /* @__PURE__ */ new Map();
      if (!existingMap) {
        this.objectIdIdByParameterIdByDeviceId.set(device.id, stateIdByParameterId);
      }
      const deviceId = this.replaceForbiddenCharacters(device.id);
      const newDeviceId = this.deviceIds.get(deviceId);
      const deviceSubPath = newDeviceId != null ? newDeviceId : deviceId;
      const devicePath = `${systemPath}.${deviceSubPath}`;
      const deviceName = this.removeSoftHyphen(device.product.name);
      if (firstRun) {
        await this.myCreateChannelAsync(devicePath, deviceName);
      }
      await this.myCreateStringStateAsync(`${devicePath}.deviceId`, "Device ID", device.id, firstRun);
      await this.myCreateStringStateAsync(`${devicePath}.name`, "Name", deviceName, firstRun, "info.name");
      if (device.connectionState != void 0) {
        await this.myCreateStringStateAsync(`${devicePath}.connectionState`, "Connection State", device.connectionState, firstRun, "info.status");
      }
      if (device.currentFwVersion != void 0) {
        await this.myCreateStringStateAsync(`${devicePath}.currentFwVersion`, "Current Firmware Version", device.currentFwVersion, firstRun, "info.firmware");
      }
      if (((_b = device.product) == null ? void 0 : _b.serialNumber) != void 0) {
        await this.myCreateStringStateAsync(`${devicePath}.serialNumber`, "Serial Number", device.product.serialNumber, firstRun, "info.serial");
      }
      if (this.config.AddData) {
        const devicePoints = await ((_c = this.myUplinkRepository) == null ? void 0 : _c.getDevicePointsAsync(device.id, accessToken));
        if (this.config.AddRawData) {
          await this.myCreateStringStateAsync(`${devicePath}.rawData`, "Received raw JSON of parameter data", JSON.stringify(devicePoints, null, ""), firstRun);
        }
        devicePoints == null ? void 0 : devicePoints.forEach(async (data) => {
          await this.setParameterDataAsync(data, devicePath, device.id, stateIdByParameterId);
        });
        if (firstRun) {
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
  }
  async setParameterDataAsync(data, devicePath, deviceId, stateIdByParameterId) {
    if (data.parameterId) {
      const existingObjectId = stateIdByParameterId.get(data.parameterId);
      const stateId = existingObjectId != null ? existingObjectId : await this.getObjectIdAndCreateCategoryAsync(data.parameterId, data.category, devicePath);
      if (!existingObjectId) {
        stateIdByParameterId.set(data.parameterId, stateId);
        await this.createParameterObjectAsync(data, deviceId, stateId);
      }
      await this.setStateAsync(stateId, { val: data.value, ack: true });
    }
  }
  async getObjectIdAndCreateCategoryAsync(parameterId, category, devicePath) {
    var _a;
    const newParameterId = (_a = this.parameterIds.get(parameterId)) != null ? _a : parameterId;
    const parameterSubPath = this.replaceForbiddenCharacters(newParameterId);
    let objectId = `${devicePath}.${parameterSubPath}`;
    const newCategory = this.parameterIdToCategory.get(parameterId);
    if (newCategory) {
      objectId = `${devicePath}.${newCategory}.${parameterSubPath}`;
    } else if (category) {
      const categoryId = this.replaceForbiddenCharacters(category);
      const newCategoryId = this.categories.get(categoryId);
      const categorySubPath = newCategoryId != null ? newCategoryId : categoryId;
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
  async createParameterObjectAsync(data, deviceId, stateId) {
    var _a, _b;
    const obj = {
      type: "state",
      common: {
        name: this.removeSoftHyphen((_a = data.parameterName) != null ? _a : ""),
        type: "number",
        role: "value",
        read: true,
        write: (_b = data.writable) != null ? _b : false
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
    await this.setObjectNotExistsAsync(stateId, obj);
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
    this.log.debug(`create Device: ${path2}`);
    await this.setObjectNotExistsAsync(path2, {
      type: "device",
      common: {
        name
      },
      native: {}
    });
  }
  async myCreateChannelAsync(path2, name) {
    this.log.debug(`create Channel: ${path2}`);
    await this.setObjectNotExistsAsync(path2, {
      type: "channel",
      common: {
        name
      },
      native: {}
    });
  }
  async myCreateFolderAsync(path2, name) {
    if (!this.existingFolders.includes(path2)) {
      this.existingFolders.push(path2);
      this.log.debug(`create Folder: ${path2}`);
      await this.setObjectNotExistsAsync(path2, {
        type: "folder",
        common: {
          name
        },
        native: {}
      });
    }
  }
  async myCreateStringStateAsync(path2, name, value, createObject, role = "text") {
    if (createObject) {
      this.log.debug(`create State: ${path2}`);
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
    }
    await this.setStateAsync(path2, { val: value, ack: true });
  }
  async myCreateBooleanStateAsync(path2, name, role, value, createObject) {
    if (createObject) {
      this.log.debug(`create State: ${path2}`);
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
    }
    await this.setStateAsync(path2, { val: value, ack: true });
  }
  removeSoftHyphen(text) {
    return text.replace(new RegExp("\xAD", "g"), "");
  }
  replaceForbiddenCharacters(text) {
    return this.removeSoftHyphen(text).replace(this.STRICT_FORBIDDEN_CHARS, "_");
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
              const result = await this.myUplinkRepository.setDevicePointAsync(deviceId, accessToken, parameterId, value);
              if (result.status == 200 && result.payload && parameterId in result.payload && result.payload[parameterId] == "modified") {
                this.log.debug(`Parameter ${parameterId} modified by API`);
                await this.setStateAsync(id, { val: state.val, ack: true });
              }
            } else if (obj.native.rawJson === true && value) {
              const keyValueDictionary = JSON.parse(value);
              const result = await this.myUplinkRepository.setDevicePointsAsync(deviceId, accessToken, keyValueDictionary);
              if (result.status == 200) {
                await this.setStateAsync(id, { val: state.val, q: this.constants.STATE_QUALITY.GOOD, ack: true, c: void 0 });
                const objectIdByParameterId = this.objectIdIdByParameterIdByDeviceId.get(deviceId);
                if (objectIdByParameterId && result.payload) {
                  Object.entries(keyValueDictionary).forEach(async ([parameterId, value2]) => {
                    const objectId = objectIdByParameterId.get(parameterId);
                    const valNumber = parseFloat(value2);
                    if (objectId && !Number.isNaN(valNumber) && parameterId in result.payload && result.payload[parameterId] == "modified") {
                      await this.setStateAsync(objectId, { val: valNumber, ack: true });
                    }
                  });
                }
              } else {
                this.log.error(`SetData: "${value}"
Result: "${JSON.stringify(result, null, " ")}"`);
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
