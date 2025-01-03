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
var DeviceInfoSyncResponseModel_exports = {};
__export(DeviceInfoSyncResponseModel_exports, {
  DeviceInfoSyncResponseModel: () => DeviceInfoSyncResponseModel
});
module.exports = __toCommonJS(DeviceInfoSyncResponseModel_exports);
const _DeviceInfoSyncResponseModel = class _DeviceInfoSyncResponseModel {
  /**
   * Returns the attribute type map for the DeviceInfoSyncResponseModel.
   */
  static getAttributeTypeMap() {
    return _DeviceInfoSyncResponseModel.attributeTypeMap;
  }
  /**
   * Constructs a new instance of the DeviceInfoSyncResponseModel class.
   */
  constructor() {
  }
};
_DeviceInfoSyncResponseModel.discriminator = void 0;
_DeviceInfoSyncResponseModel.attributeTypeMap = [
  {
    name: "syncId",
    baseName: "syncId",
    type: "number",
    format: "int32"
  },
  {
    name: "status",
    baseName: "status",
    type: "string",
    format: ""
  }
];
let DeviceInfoSyncResponseModel = _DeviceInfoSyncResponseModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeviceInfoSyncResponseModel
});
//# sourceMappingURL=DeviceInfoSyncResponseModel.js.map
