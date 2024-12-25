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
var GroupedDeviceParameterData_exports = {};
__export(GroupedDeviceParameterData_exports, {
  GroupedDeviceParameterData: () => GroupedDeviceParameterData
});
module.exports = __toCommonJS(GroupedDeviceParameterData_exports);
const _GroupedDeviceParameterData = class _GroupedDeviceParameterData {
  /**
   * Returns the attribute type map.
   */
  static getAttributeTypeMap() {
    return _GroupedDeviceParameterData.attributeTypeMap;
  }
  /**
   * Constructs a new instance of the GroupedDeviceParameterData class.
   */
  constructor() {
  }
};
_GroupedDeviceParameterData.discriminator = void 0;
_GroupedDeviceParameterData.attributeTypeMap = [
  {
    name: "categoryName",
    baseName: "categoryName",
    type: "string",
    format: ""
  },
  {
    name: "parameters",
    baseName: "parameters",
    type: "Array<DeviceParameterData>",
    format: ""
  }
];
let GroupedDeviceParameterData = _GroupedDeviceParameterData;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupedDeviceParameterData
});
//# sourceMappingURL=GroupedDeviceParameterData.js.map
