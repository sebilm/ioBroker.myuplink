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
var DeviceInfoResponseModelPagedResult_exports = {};
__export(DeviceInfoResponseModelPagedResult_exports, {
  DeviceInfoResponseModelPagedResult: () => DeviceInfoResponseModelPagedResult
});
module.exports = __toCommonJS(DeviceInfoResponseModelPagedResult_exports);
const _DeviceInfoResponseModelPagedResult = class _DeviceInfoResponseModelPagedResult {
  static getAttributeTypeMap() {
    return _DeviceInfoResponseModelPagedResult.attributeTypeMap;
  }
  constructor() {
  }
};
_DeviceInfoResponseModelPagedResult.discriminator = void 0;
_DeviceInfoResponseModelPagedResult.attributeTypeMap = [
  {
    name: "page",
    baseName: "page",
    type: "number",
    format: "int32"
  },
  {
    name: "pageSize",
    baseName: "pageSize",
    type: "number",
    format: "int32"
  },
  {
    name: "results",
    baseName: "results",
    type: "Array<DeviceInfoResponseModel>",
    format: ""
  },
  {
    name: "total",
    baseName: "total",
    type: "number",
    format: "int32"
  }
];
let DeviceInfoResponseModelPagedResult = _DeviceInfoResponseModelPagedResult;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeviceInfoResponseModelPagedResult
});
//# sourceMappingURL=DeviceInfoResponseModelPagedResult.js.map
