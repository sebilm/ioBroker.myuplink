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
var DeviceFirmwareInfoResponse_exports = {};
__export(DeviceFirmwareInfoResponse_exports, {
  DeviceFirmwareInfoResponse: () => DeviceFirmwareInfoResponse
});
module.exports = __toCommonJS(DeviceFirmwareInfoResponse_exports);
const _DeviceFirmwareInfoResponse = class _DeviceFirmwareInfoResponse {
  static getAttributeTypeMap() {
    return _DeviceFirmwareInfoResponse.attributeTypeMap;
  }
  constructor() {
  }
};
_DeviceFirmwareInfoResponse.discriminator = void 0;
_DeviceFirmwareInfoResponse.attributeTypeMap = [
  {
    name: "deviceId",
    baseName: "deviceId",
    type: "string",
    format: ""
  },
  {
    name: "firmwareId",
    baseName: "firmwareId",
    type: "string",
    format: ""
  },
  {
    name: "currentFwVersion",
    baseName: "currentFwVersion",
    type: "string",
    format: ""
  },
  {
    name: "pendingFwVersion",
    baseName: "pendingFwVersion",
    type: "string",
    format: ""
  },
  {
    name: "desiredFwVersion",
    baseName: "desiredFwVersion",
    type: "string",
    format: ""
  }
];
let DeviceFirmwareInfoResponse = _DeviceFirmwareInfoResponse;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeviceFirmwareInfoResponse
});
//# sourceMappingURL=DeviceFirmwareInfoResponse.js.map
