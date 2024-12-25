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
var DeviceCategoriesModel_exports = {};
__export(DeviceCategoriesModel_exports, {
  DeviceCategoriesModel: () => DeviceCategoriesModel
});
module.exports = __toCommonJS(DeviceCategoriesModel_exports);
const _DeviceCategoriesModel = class _DeviceCategoriesModel {
  /**
   * Returns the attribute type map for the DeviceCategoriesModel.
   */
  static getAttributeTypeMap() {
    return _DeviceCategoriesModel.attributeTypeMap;
  }
  /**
   * Constructs a new instance of the DeviceCategoriesModel class.
   */
  constructor() {
  }
};
_DeviceCategoriesModel.discriminator = void 0;
_DeviceCategoriesModel.attributeTypeMap = [
  {
    name: "deviceId",
    baseName: "deviceId",
    type: "string",
    format: ""
  },
  {
    name: "categories",
    baseName: "categories",
    type: "Array<DeviceCategory>",
    format: ""
  }
];
let DeviceCategoriesModel = _DeviceCategoriesModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeviceCategoriesModel
});
//# sourceMappingURL=DeviceCategoriesModel.js.map
