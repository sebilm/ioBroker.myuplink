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
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var utils = __toESM(require("@iobroker/adapter-core"));
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var import_myUplinkLogic = require("./myUplinkLogic");
Date.prototype.today = function() {
  return `${this.getFullYear()}-${this.getMonth() + 1 < 10 ? "0" : ""}${this.getMonth() + 1}-${this.getDate() < 10 ? "0" : ""}${this.getDate()}`;
};
Date.prototype.timeNow = function() {
  return `${(this.getHours() < 10 ? "0" : "") + this.getHours()}:${this.getMinutes() < 10 ? "0" : ""}${this.getMinutes()}:${this.getSeconds() < 10 ? "0" : ""}${this.getSeconds()}`;
};
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
  async CreateSystemAsync(path2, name) {
    this.log.debug(`Create Device object if not exists: ${path2}`);
    await this.setObjectNotExistsAsync(path2, {
      type: "device",
      common: {
        name
      },
      native: {}
    });
  }
  async CreateDeviceAsync(path2, name) {
    this.log.debug(`Create Channel object if not exists: ${path2}`);
    await this.setObjectNotExistsAsync(path2, {
      type: "channel",
      common: {
        name
      },
      native: {}
    });
  }
  async CreateCategoryAsync(path2, name) {
    this.log.debug(`Create Folder object if not exists: ${path2}`);
    await this.setObjectNotExistsAsync(path2, {
      type: "folder",
      common: {
        name
      },
      native: {}
    });
  }
  async CreateStringObjectAsync(path2, name, value, createObject, role = "text") {
    if (createObject) {
      this.log.debug(`Create string object if not exists: ${path2}`);
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
    await this.setState(path2, { val: value, ack: true });
  }
  async CreateBooleanObjectAsync(path2, name, role, value, createObject) {
    if (createObject) {
      this.log.debug(`Create boolean object if not exists: ${path2}`);
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
    await this.setState(path2, { val: value, ack: true });
  }
  async CreateWritableStringObjectAsync(path2, name, role, deviceId) {
    this.log.debug(`Create or update writeable string object: ${path2}`);
    await this.extendObject(path2, {
      type: "state",
      common: {
        name,
        type: "string",
        role,
        read: true,
        write: true
      },
      native: {
        rawJson: true,
        writable: true,
        deviceId
      }
    });
  }
  async CreateOrUpdateParameterObjectAsync(path2, name, deviceId, parameterId, role, writable, unit, min, max, step, states) {
    const readObject = await this.getObjectAsync(path2);
    if (readObject == null) {
      const newObject = {
        type: "state",
        common: {
          name,
          type: "number",
          role,
          read: true,
          write: writable,
          unit,
          min,
          max,
          step,
          states
        },
        native: {
          parameterId,
          writable,
          deviceId
        }
      };
      this.log.debug(`Create new parameter object: ${path2}`);
      await this.setObjectAsync(path2, newObject);
    } else {
      let changed = false;
      if (readObject.common == null) {
        readObject.common = {
          name,
          type: "number",
          role,
          read: true,
          write: writable,
          unit,
          min,
          max,
          step,
          states
        };
        changed = true;
      } else {
        if (readObject.common.name != name) {
          readObject.common.name = name;
          changed = true;
        }
        if (readObject.common.type != "number") {
          readObject.common.type = "number";
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
          parameterId,
          writable,
          deviceId
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
        this.log.debug(`Update parameter object: ${path2}`);
        await this.setObjectAsync(path2, readObject);
      }
    }
  }
  async SetStateAsync(path2, value) {
    await this.setState(path2, { val: value, ack: true });
  }
  areRecordsEqual(record1, record2) {
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
  async onReady() {
    this.log.info("Starting adapter.");
    await this.setInfoObjects();
    this.refreshInterval = this.config.Interval * 60;
    if (this.refreshInterval < 60) {
      this.refreshInterval = 60;
    }
    const dataDir = utils.getAbsoluteDefaultDataDir();
    const storeDir = path.join(dataDir, `myuplink_${this.instance}`);
    try {
      if (!fs.existsSync(storeDir)) {
        fs.mkdirSync(storeDir);
      }
    } catch (err) {
      this.log.error(`Could not create storage directory (${storeDir}): ${err}`);
      return;
    }
    try {
      this.myUplink = new import_myUplinkLogic.MyUplinkLogic(this, this.config, storeDir, this.log);
    } catch (error) {
      await this.setState("info.connection", { val: false, ack: true });
      await this.setState("info.currentError", { val: `${error}`, ack: true });
      return;
    }
    await this.subscribeStatesAsync("*");
    this.log.info("Adapter started.");
    await this.getDataAsync();
  }
  async getDataAsync() {
    if (this.myUplink) {
      const error = await this.myUplink.GetDataAsync();
      const newDate = /* @__PURE__ */ new Date();
      const datetime = `${newDate.today()} ${newDate.timeNow()}`;
      if (error) {
        await this.setState("info.connection", { val: false, ack: true });
        await this.setState("info.lastErrorTime", { val: datetime, ack: true });
        await this.setState("info.lastError", { val: error, ack: true });
        await this.setState("info.currentError", { val: error, ack: true });
      } else {
        await this.setState("info.connection", { val: true, expire: this.refreshInterval + 30, ack: true });
        await this.setState("info.updateTime", { val: datetime, ack: true });
        await this.setState("info.currentError", { val: "", ack: true });
      }
    }
    this.log.debug("Set timer");
    this.timeout = this.setTimeout(async () => {
      await this.getDataAsync();
    }, this.refreshInterval * 1e3);
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
  /**
   * Is called if a subscribed state changes
   *
   * @param id - The id of the state that has changed
   * @param state - The state that has changed
   */
  async onStateChange(id, state) {
    var _a;
    if (state != null && state.ack === false && state.q == this.constants.STATE_QUALITY.GOOD && state.val != null && this.myUplink != null) {
      this.log.debug(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
      const obj = await this.getObjectAsync(id);
      if (obj != null && obj.native != null && obj.native.writable == true && obj.native.deviceId) {
        const deviceId = obj.native.deviceId;
        const parameterId = (_a = obj.native.parameterId) == null ? void 0 : _a.toString();
        const error = await this.myUplink.SetDataAsync(
          id,
          state.val,
          deviceId,
          parameterId,
          obj.native.rawJson === true
        );
        if (error) {
          await this.setState(id, {
            val: state.val,
            q: this.constants.STATE_QUALITY.DEVICE_ERROR_REPORT,
            ack: false,
            c: error
          });
        }
      }
    }
  }
  /**
   * Is called when adapter shuts down - callback has to be called under any circumstances!
   *
   * @param callback - The callback function to be called when the unload process is complete
   */
  async onUnload(callback) {
    try {
      this.clearTimeout(this.timeout);
      this.timeout = void 0;
      this.myUplink = void 0;
      await this.setState("info.connection", { val: false, ack: true });
      this.log.info("Cleaned everything up...");
      callback();
    } catch {
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
