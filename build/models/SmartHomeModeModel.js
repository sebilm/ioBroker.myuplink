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
var SmartHomeModeModel_exports = {};
__export(SmartHomeModeModel_exports, {
  SmartHomeModeModel: () => SmartHomeModeModel
});
module.exports = __toCommonJS(SmartHomeModeModel_exports);
const _SmartHomeModeModel = class _SmartHomeModeModel {
  /**
   * Returns the attribute type map for SmartHomeModeModel.
   */
  static getAttributeTypeMap() {
    return _SmartHomeModeModel.attributeTypeMap;
  }
  /**
   * Constructs a new instance of SmartHomeModeModel.
   */
  constructor() {
  }
};
_SmartHomeModeModel.discriminator = void 0;
_SmartHomeModeModel.attributeTypeMap = [
  {
    name: "smartHomeMode",
    baseName: "smartHomeMode",
    type: "SmartMode",
    format: ""
  }
];
let SmartHomeModeModel = _SmartHomeModeModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartHomeModeModel
});
//# sourceMappingURL=SmartHomeModeModel.js.map
