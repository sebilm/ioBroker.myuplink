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
var DeviceResponseModel_exports = {};
__export(DeviceResponseModel_exports, {
  DeviceResponseModel: () => DeviceResponseModel
});
module.exports = __toCommonJS(DeviceResponseModel_exports);
const _DeviceResponseModel = class _DeviceResponseModel {
  /**
   * Returns the attribute type map.
   */
  static getAttributeTypeMap() {
    return _DeviceResponseModel.attributeTypeMap;
  }
  /**
   * Constructs a new instance of the DeviceResponseModel class.
   */
  constructor() {
  }
};
_DeviceResponseModel.discriminator = void 0;
_DeviceResponseModel.attributeTypeMap = [
  {
    name: "id",
    baseName: "id",
    type: "string",
    format: ""
  },
  {
    name: "connectionState",
    baseName: "connectionState",
    type: "DeviceConnectionState",
    format: ""
  },
  {
    name: "firmware",
    baseName: "firmware",
    type: "FirmwareResponseModel",
    format: ""
  },
  {
    name: "product",
    baseName: "product",
    type: "ProductResponseModel",
    format: ""
  },
  {
    name: "availableFeatures",
    baseName: "availableFeatures",
    type: "AvailableMethods",
    format: ""
  }
];
let DeviceResponseModel = _DeviceResponseModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeviceResponseModel
});
//# sourceMappingURL=DeviceResponseModel.js.map
