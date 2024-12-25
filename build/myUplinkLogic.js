"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var myUplinkLogic_exports = {};
__export(myUplinkLogic_exports, {
  MyUplinkLogic: () => MyUplinkLogic
});
module.exports = __toCommonJS(myUplinkLogic_exports);
var path = __toESM(require("path"));
var import_authRepository = require("./authRepository");
var import_myUplinkRepository = require("./myUplinkRepository");
class MyUplinkLogic {
  /**
   * Creates an instance of MyUplinkLogic.
   *
   * @param dataTarget - The data target.
   * @param config - The adapter configuration.
   * @param storeDir - The directory to store session data.
   * @param log - The logger instance.
   */
  constructor(dataTarget, config, storeDir, log) {
    this.STRICT_FORBIDDEN_CHARS = /[^a-zA-Z0-9_-]+/gu;
    this.systemIds = /* @__PURE__ */ new Map();
    this.deviceIds = /* @__PURE__ */ new Map();
    this.categories = /* @__PURE__ */ new Map();
    this.parameterIds = /* @__PURE__ */ new Map();
    this.parameterIdToCategory = /* @__PURE__ */ new Map();
    this.objectIdIdByParameterIdByDeviceId = /* @__PURE__ */ new Map();
    this.existingSystemIds = [];
    this.existingCategoryPaths = [];
    var _a, _b, _c, _d;
    this.dataTarget = dataTarget;
    this.config = config;
    this.log = log;
    (_a = config.RenameSystemIds) == null ? void 0 : _a.forEach((renameData) => {
      if (renameData.OriginalId && renameData.NewId) {
        const newSystemId = this.replaceForbiddenCharacters(renameData.NewId);
        this.log.debug(`Map System ID: ${renameData.OriginalId} -> ${newSystemId}`);
        this.systemIds.set(renameData.OriginalId, newSystemId);
      }
    });
    (_b = config.RenameDeviceIds) == null ? void 0 : _b.forEach((renameData) => {
      if (renameData.OriginalId && renameData.NewId) {
        const newDeviceId = this.replaceForbiddenCharacters(renameData.NewId);
        this.log.debug(`Map Device ID: ${renameData.OriginalId} -> ${newDeviceId}`);
        this.deviceIds.set(renameData.OriginalId, newDeviceId);
      }
    });
    (_c = config.RenameCategories) == null ? void 0 : _c.forEach((renameData) => {
      if (renameData.OriginalId && renameData.NewId) {
        const newCategory = this.replaceForbiddenCharacters(renameData.NewId);
        this.log.debug(`Map Category: ${renameData.OriginalId} -> ${newCategory}`);
        this.categories.set(renameData.OriginalId, newCategory);
      }
    });
    (_d = config.RenameDataIds) == null ? void 0 : _d.forEach((renameData) => {
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
    const identifier = config.Identifier.trim();
    const secret = config.Secret.trim();
    const callbackURL = config.CallbackURL.trim();
    const configured = config.Configured;
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
      throw new Error("Missing settings!");
    }
    const storeFile = path.join(storeDir, "session.json");
    this.authRepository = new import_authRepository.AuthRepository(
      {
        clientId: identifier,
        clientSecret: secret,
        useAuthorizationCodeGrant: config.UseAuthorizationCodeGrant,
        redirectUri: callbackURL,
        authCode: config.AuthCode.trim(),
        sessionStoreFilePath: storeFile,
        baseUrl: "https://api.myuplink.com",
        scope: "READSYSTEM WRITESYSTEM",
        timeout: 45e3,
        userAgent: "iobroker.myuplink",
        renewBeforeExpiry: 5 * 60 * 1e3
      },
      log
    );
    this.myUplinkRepository = new import_myUplinkRepository.MyUplinkRepository(
      {
        baseUrl: "https://api.myuplink.com",
        timeout: 45e3,
        userAgent: "iobroker.myuplink",
        language: config.Language
      },
      this.log
    );
  }
  /**
   * Async function to get data asynchronously.
   *
   * @returns a promise with the error string (if there was an error) or undefined (if its all good)
   */
  async GetDataAsync() {
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
   * @param id - the object id
   * @param value - the value to be set
   * @param deviceId - the id of the device
   * @param parameterId - the id of the parameter, or null
   * @param isRawJson - flag indicating if the value is raw JSON
   * @returns a promise with the error string (if there was an error) or undefined (if its all good)
   */
  async SetDataAsync(id, value, deviceId, parameterId, isRawJson) {
    try {
      const accessToken = await this.authRepository.getAccessTokenAsync();
      if (accessToken) {
        const valueAsString = value.toString();
        if (parameterId) {
          const result = await this.myUplinkRepository.setDevicePointAsync(
            deviceId,
            accessToken,
            parameterId,
            valueAsString
          );
          if (result && parameterId in result && result[parameterId] == "modified") {
            this.log.debug(`Parameter ${parameterId} modified by API`);
            await this.dataTarget.SetStateAsync(id, value);
          }
        } else if (isRawJson === true && valueAsString) {
          const keyValueDictionary = JSON.parse(valueAsString);
          if (Object.keys(keyValueDictionary).length > 0) {
            const result = await this.myUplinkRepository.setDevicePointsAsync(
              deviceId,
              accessToken,
              keyValueDictionary
            );
            await this.dataTarget.SetStateAsync(id, value);
            const objectIdByParameterId = this.objectIdIdByParameterIdByDeviceId.get(deviceId);
            if (objectIdByParameterId && result) {
              for (const [parameterId2, value2] of Object.entries(keyValueDictionary)) {
                const objectId = objectIdByParameterId.get(parameterId2);
                const valNumber = parseFloat(value2);
                if (objectId && !Number.isNaN(valNumber) && parameterId2 in result && result[parameterId2] == "modified") {
                  await this.dataTarget.SetStateAsync(objectId, valNumber);
                }
              }
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
  async setSystemWithDevicesAsync(system, accessToken) {
    var _a, _b;
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
        await this.dataTarget.CreateSystemAsync(systemPath, systemName);
      }
      await this.dataTarget.CreateStringObjectAsync(
        `${systemPath}.systemId`,
        "System ID",
        system.systemId,
        firstRun
      );
      await this.dataTarget.CreateStringObjectAsync(
        `${systemPath}.name`,
        "Name",
        systemName,
        firstRun,
        "info.name"
      );
      if (system.country != void 0) {
        await this.dataTarget.CreateStringObjectAsync(
          `${systemPath}.country`,
          "Country",
          system.country,
          firstRun
        );
      }
      if (system.securityLevel != void 0) {
        await this.dataTarget.CreateStringObjectAsync(
          `${systemPath}.securityLevel`,
          "Security Level",
          system.securityLevel,
          firstRun
        );
      }
      if (system.hasAlarm != void 0) {
        await this.dataTarget.CreateBooleanObjectAsync(
          `${systemPath}.hasAlarm`,
          "Has Alarm",
          "indicator.alarm",
          system.hasAlarm,
          firstRun
        );
      }
      if (system.devices) {
        for (const device of system.devices) {
          await this.setSystemDeviceAsync(device, systemPath, accessToken);
        }
      }
      if (this.config.AddActiveNotifications) {
        const notifications = await ((_a = this.myUplinkRepository) == null ? void 0 : _a.getActiveNotificationsAsync(
          system.systemId,
          accessToken
        ));
        if (this.config.AddRawActiveNotifications) {
          await this.dataTarget.CreateStringObjectAsync(
            `${systemPath}.rawActiveNotifications`,
            "Received raw JSON of active notifications",
            JSON.stringify(notifications == null ? void 0 : notifications.notifications, null, ""),
            firstRun
          );
        }
        let notificationsDescriptions = "";
        (_b = notifications == null ? void 0 : notifications.notifications) == null ? void 0 : _b.forEach((notification) => {
          notificationsDescriptions += `${notification.header}: ${notification.description}
`;
        });
        await this.dataTarget.CreateStringObjectAsync(
          `${systemPath}.activeNotifications`,
          "Active notification descriptions",
          notificationsDescriptions,
          firstRun
        );
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
        await this.dataTarget.CreateDeviceAsync(devicePath, deviceName);
      }
      await this.dataTarget.CreateStringObjectAsync(`${devicePath}.deviceId`, "Device ID", device.id, firstRun);
      await this.dataTarget.CreateStringObjectAsync(
        `${devicePath}.name`,
        "Name",
        deviceName,
        firstRun,
        "info.name"
      );
      if (device.connectionState != void 0) {
        await this.dataTarget.CreateStringObjectAsync(
          `${devicePath}.connectionState`,
          "Connection State",
          device.connectionState,
          firstRun,
          "info.status"
        );
      }
      if (device.currentFwVersion != void 0) {
        await this.dataTarget.CreateStringObjectAsync(
          `${devicePath}.currentFwVersion`,
          "Current Firmware Version",
          device.currentFwVersion,
          firstRun,
          "info.firmware"
        );
      }
      if (((_b = device.product) == null ? void 0 : _b.serialNumber) != void 0) {
        await this.dataTarget.CreateStringObjectAsync(
          `${devicePath}.serialNumber`,
          "Serial Number",
          device.product.serialNumber,
          firstRun,
          "info.serial"
        );
      }
      if (this.config.AddData) {
        const devicePoints = await ((_c = this.myUplinkRepository) == null ? void 0 : _c.getDevicePointsAsync(device.id, accessToken));
        if (this.config.AddRawData) {
          await this.dataTarget.CreateStringObjectAsync(
            `${devicePath}.rawData`,
            "Received raw JSON of parameter data",
            JSON.stringify(devicePoints, null, ""),
            firstRun
          );
        }
        if (devicePoints) {
          for (const data of devicePoints) {
            await this.setParameterDataAsync(data, devicePath, device.id, stateIdByParameterId);
          }
        }
        if (firstRun) {
          await this.dataTarget.CreateWritableStringObjectAsync(
            `${devicePath}.setData`,
            "Send raw JSON of parameter data",
            "json",
            device.id
          );
        }
      }
    }
  }
  async setParameterDataAsync(data, devicePath, deviceId, stateIdByParameterId) {
    var _a;
    if (data.parameterId) {
      const existingObjectId = stateIdByParameterId.get(data.parameterId);
      const stateId = existingObjectId != null ? existingObjectId : await this.getObjectIdAndCreateCategoryAsync(data.parameterId, data.category, devicePath);
      if (!existingObjectId) {
        stateIdByParameterId.set(data.parameterId, stateId);
        await this.createParameterObjectAsync(data, deviceId, stateId);
      }
      await this.dataTarget.SetStateAsync(stateId, (_a = data.value) != null ? _a : null);
    }
  }
  async getObjectIdAndCreateCategoryAsync(parameterId, category, devicePath) {
    var _a, _b, _c, _d;
    const parameterSubPath = (_a = this.parameterIds.get(parameterId)) != null ? _a : this.replaceForbiddenCharacters(parameterId);
    const newCategory = this.parameterIdToCategory.get(parameterId);
    let categorySubPath = null;
    if (newCategory) {
      categorySubPath = newCategory;
    } else if (category && this.config.GroupData) {
      const categoryId = this.replaceForbiddenCharacters(category);
      categorySubPath = (_c = (_b = this.categories.get(category)) != null ? _b : this.categories.get(categoryId)) != null ? _c : categoryId;
    }
    if (categorySubPath) {
      const categoryPath = `${devicePath}.${categorySubPath}`;
      if (!this.existingCategoryPaths.includes(categoryPath)) {
        this.existingCategoryPaths.push(categoryPath);
        await this.dataTarget.CreateCategoryAsync(categoryPath, (_d = newCategory != null ? newCategory : category) != null ? _d : categorySubPath);
      }
      return `${devicePath}.${categorySubPath}.${parameterSubPath}`;
    }
    return `${devicePath}.${parameterSubPath}`;
  }
  async createParameterObjectAsync(data, deviceId, stateId) {
    var _a, _b, _c;
    let role = "value";
    let unit = void 0;
    if (data.parameterUnit) {
      unit = data.parameterUnit;
      switch (data.parameterUnit) {
        case "kWh":
        case "Ws":
          role = "value.energy";
          break;
        case "W":
        case "kW":
          role = "value.power";
          break;
        case "\xB0C":
          role = "value.temperature";
          break;
        case "Hz":
          role = "value.frequency";
          break;
        case "A":
          role = "value.current";
          break;
        case "V":
          role = "value.voltage";
          break;
        case "%RH":
          role = "value.humidity";
          unit = "%";
          break;
        case "bar":
          role = "value.pressure";
          break;
      }
    }
    let states = void 0;
    if (data.enumValues && data.enumValues.length > 0) {
      states = {};
      for (const enumValue of data.enumValues) {
        if (enumValue.text && enumValue.value) {
          states[enumValue.value] = this.removeSoftHyphen(enumValue.text);
        }
      }
    }
    const name = this.removeSoftHyphen((_a = data.parameterName) != null ? _a : "");
    const writable = (_b = data.writable) != null ? _b : false;
    let min = void 0;
    let max = void 0;
    if (data.minValue != null && data.maxValue != null) {
      if (data.minValue < data.maxValue) {
        if (data.value != null && (data.value < data.minValue || data.value > data.maxValue)) {
          this.log.warn(
            `Parameter '${data.parameterId}': value is outside min/max. Value: ${data.value}, Min: ${data.minValue}, Max: ${data.maxValue}. Ignoring min/max.`
          );
        } else {
          min = data.minValue;
          max = data.maxValue;
        }
      } else {
        this.log.warn(
          `Parameter '${data.parameterId}': min is bigger than max. Min: ${data.minValue}, Max: ${data.maxValue}. Ignoring min/max.`
        );
      }
    }
    const step = (_c = data.stepValue) != null ? _c : void 0;
    await this.dataTarget.CreateOrUpdateParameterObjectAsync(
      stateId,
      name,
      deviceId,
      data.parameterId,
      role,
      writable,
      unit,
      min,
      max,
      step,
      states
    );
  }
  removeSoftHyphen(text) {
    return text.replace(new RegExp("\xAD", "g"), "").trim();
  }
  replaceForbiddenCharacters(text) {
    return this.removeSoftHyphen(text).replace(this.STRICT_FORBIDDEN_CHARS, "_");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MyUplinkLogic
});
//# sourceMappingURL=myUplinkLogic.js.map
