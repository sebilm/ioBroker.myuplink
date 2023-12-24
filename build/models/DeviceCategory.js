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
var DeviceCategory_exports = {};
__export(DeviceCategory_exports, {
  DeviceCategory: () => DeviceCategory
});
module.exports = __toCommonJS(DeviceCategory_exports);
const _DeviceCategory = class {
  static getAttributeTypeMap() {
    return _DeviceCategory.attributeTypeMap;
  }
  constructor() {
  }
};
let DeviceCategory = _DeviceCategory;
DeviceCategory.discriminator = void 0;
DeviceCategory.attributeTypeMap = [
  {
    name: "categoryName",
    baseName: "categoryName",
    type: "string",
    format: ""
  },
  {
    name: "parameters",
    baseName: "parameters",
    type: "Array<ParameterDetail>",
    format: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeviceCategory
});
//# sourceMappingURL=DeviceCategory.js.map
