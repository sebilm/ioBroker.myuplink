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
var SystemWithDevices_exports = {};
__export(SystemWithDevices_exports, {
  SystemWithDevices: () => SystemWithDevices
});
module.exports = __toCommonJS(SystemWithDevices_exports);
const _SystemWithDevices = class {
  static getAttributeTypeMap() {
    return _SystemWithDevices.attributeTypeMap;
  }
  constructor() {
  }
};
let SystemWithDevices = _SystemWithDevices;
SystemWithDevices.discriminator = void 0;
SystemWithDevices.attributeTypeMap = [
  {
    name: "systemId",
    baseName: "systemId",
    type: "string",
    format: "uuid"
  },
  {
    name: "name",
    baseName: "name",
    type: "string",
    format: ""
  },
  {
    name: "securityLevel",
    baseName: "securityLevel",
    type: "SecurityLevel",
    format: ""
  },
  {
    name: "hasAlarm",
    baseName: "hasAlarm",
    type: "boolean",
    format: ""
  },
  {
    name: "country",
    baseName: "country",
    type: "string",
    format: ""
  },
  {
    name: "devices",
    baseName: "devices",
    type: "Array<SystemDevice>",
    format: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SystemWithDevices
});
//# sourceMappingURL=SystemWithDevices.js.map
