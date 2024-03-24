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
var DeviceParameterData_exports = {};
__export(DeviceParameterData_exports, {
  DeviceParameterData: () => DeviceParameterData
});
module.exports = __toCommonJS(DeviceParameterData_exports);
const _DeviceParameterData = class _DeviceParameterData {
  static getAttributeTypeMap() {
    return _DeviceParameterData.attributeTypeMap;
  }
  constructor() {
  }
};
_DeviceParameterData.discriminator = void 0;
_DeviceParameterData.attributeTypeMap = [
  {
    name: "parameterId",
    baseName: "parameterId",
    type: "string",
    format: ""
  },
  {
    name: "parameterName",
    baseName: "parameterName",
    type: "string",
    format: ""
  },
  {
    name: "parameterUnit",
    baseName: "parameterUnit",
    type: "string",
    format: ""
  },
  {
    name: "deviceId",
    baseName: "deviceId",
    type: "string",
    format: ""
  },
  {
    name: "timestamp",
    baseName: "timestamp",
    type: "Date",
    format: "date-time"
  },
  {
    name: "value",
    baseName: "value",
    type: "number",
    format: "double"
  },
  {
    name: "strVal",
    baseName: "strVal",
    type: "string",
    format: ""
  }
];
let DeviceParameterData = _DeviceParameterData;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeviceParameterData
});
//# sourceMappingURL=DeviceParameterData.js.map
