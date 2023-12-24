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
var FirmwareResponseModel_exports = {};
__export(FirmwareResponseModel_exports, {
  FirmwareResponseModel: () => FirmwareResponseModel
});
module.exports = __toCommonJS(FirmwareResponseModel_exports);
const _FirmwareResponseModel = class {
  static getAttributeTypeMap() {
    return _FirmwareResponseModel.attributeTypeMap;
  }
  constructor() {
  }
};
let FirmwareResponseModel = _FirmwareResponseModel;
FirmwareResponseModel.discriminator = void 0;
FirmwareResponseModel.attributeTypeMap = [
  {
    name: "currentFwVersion",
    baseName: "currentFwVersion",
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FirmwareResponseModel
});
//# sourceMappingURL=FirmwareResponseModel.js.map
