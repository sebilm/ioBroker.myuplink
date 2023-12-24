"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var AvailableMethods_exports = {};
__export(AvailableMethods_exports, {
  AvailableMethods: () => AvailableMethods
});
module.exports = __toCommonJS(AvailableMethods_exports);
const _AvailableMethods = class {
  static getAttributeTypeMap() {
    return _AvailableMethods.attributeTypeMap;
  }
  constructor() {
  }
};
let AvailableMethods = _AvailableMethods;
AvailableMethods.discriminator = void 0;
AvailableMethods.attributeTypeMap = [
  {
    name: "settings",
    baseName: "settings",
    type: "boolean",
    format: ""
  },
  {
    name: "reboot",
    baseName: "reboot",
    type: "boolean",
    format: ""
  },
  {
    name: "forcesync",
    baseName: "forcesync",
    type: "boolean",
    format: ""
  },
  {
    name: "forceUpdate",
    baseName: "forceUpdate",
    type: "boolean",
    format: ""
  },
  {
    name: "requestUpdate",
    baseName: "requestUpdate",
    type: "boolean",
    format: ""
  },
  {
    name: "resetAlarm",
    baseName: "resetAlarm",
    type: "boolean",
    format: ""
  },
  {
    name: "triggerEvent",
    baseName: "triggerEvent",
    type: "boolean",
    format: ""
  },
  {
    name: "getMenu",
    baseName: "getMenu",
    type: "boolean",
    format: ""
  },
  {
    name: "getMenuChain",
    baseName: "getMenuChain",
    type: "boolean",
    format: ""
  },
  {
    name: "getGuideQuestion",
    baseName: "getGuideQuestion",
    type: "boolean",
    format: ""
  },
  {
    name: "sendHaystack",
    baseName: "sendHaystack",
    type: "boolean",
    format: ""
  },
  {
    name: "setSmartMode",
    baseName: "setSmartMode",
    type: "boolean",
    format: ""
  },
  {
    name: "setAidMode",
    baseName: "setAidMode",
    type: "boolean",
    format: ""
  },
  {
    name: "getZones",
    baseName: "getZones",
    type: "boolean",
    format: ""
  },
  {
    name: "processIntent",
    baseName: "processIntent",
    type: "boolean",
    format: ""
  },
  {
    name: "boostHotWater",
    baseName: "boostHotWater",
    type: "boolean",
    format: ""
  },
  {
    name: "boostVentilation",
    baseName: "boostVentilation",
    type: "boolean",
    format: ""
  },
  {
    name: "getScheduleConfig",
    baseName: "getScheduleConfig",
    type: "boolean",
    format: ""
  },
  {
    name: "getScheduleModes",
    baseName: "getScheduleModes",
    type: "boolean",
    format: ""
  },
  {
    name: "getScheduleWeekly",
    baseName: "getScheduleWeekly",
    type: "boolean",
    format: ""
  },
  {
    name: "getScheduleVacation",
    baseName: "getScheduleVacation",
    type: "boolean",
    format: ""
  },
  {
    name: "setScheduleModes",
    baseName: "setScheduleModes",
    type: "boolean",
    format: ""
  },
  {
    name: "setScheduleWeekly",
    baseName: "setScheduleWeekly",
    type: "boolean",
    format: ""
  },
  {
    name: "setScheduleOverride",
    baseName: "setScheduleOverride",
    type: "boolean",
    format: ""
  },
  {
    name: "setScheduleVacation",
    baseName: "setScheduleVacation",
    type: "boolean",
    format: ""
  },
  {
    name: "setVentilationMode",
    baseName: "setVentilationMode",
    type: "boolean",
    format: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AvailableMethods
});
//# sourceMappingURL=AvailableMethods.js.map
