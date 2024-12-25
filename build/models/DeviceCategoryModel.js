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
var DeviceCategoryModel_exports = {};
__export(DeviceCategoryModel_exports, {
  DeviceCategoryModel: () => DeviceCategoryModel
});
module.exports = __toCommonJS(DeviceCategoryModel_exports);
const _DeviceCategoryModel = class _DeviceCategoryModel {
  /**
   * Get the attribute type map.
   *
   * @returns Array of attribute type map objects.
   */
  static getAttributeTypeMap() {
    return _DeviceCategoryModel.attributeTypeMap;
  }
  /**
   * Constructs a new instance of the DeviceCategoryModel class.
   */
  constructor() {
  }
};
_DeviceCategoryModel.discriminator = void 0;
_DeviceCategoryModel.attributeTypeMap = [
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
let DeviceCategoryModel = _DeviceCategoryModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeviceCategoryModel
});
//# sourceMappingURL=DeviceCategoryModel.js.map
