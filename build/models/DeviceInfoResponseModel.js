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
var DeviceInfoResponseModel_exports = {};
__export(DeviceInfoResponseModel_exports, {
  DeviceInfoResponseModel: () => DeviceInfoResponseModel
});
module.exports = __toCommonJS(DeviceInfoResponseModel_exports);
const _DeviceInfoResponseModel = class _DeviceInfoResponseModel {
  static getAttributeTypeMap() {
    return _DeviceInfoResponseModel.attributeTypeMap;
  }
  constructor() {
  }
};
_DeviceInfoResponseModel.discriminator = void 0;
_DeviceInfoResponseModel.attributeTypeMap = [
  {
    name: "deviceId",
    baseName: "deviceId",
    type: "string",
    format: ""
  },
  {
    name: "productName",
    baseName: "productName",
    type: "string",
    format: ""
  },
  {
    name: "address",
    baseName: "address",
    type: "AddressResponseModel",
    format: ""
  }
];
let DeviceInfoResponseModel = _DeviceInfoResponseModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeviceInfoResponseModel
});
//# sourceMappingURL=DeviceInfoResponseModel.js.map
