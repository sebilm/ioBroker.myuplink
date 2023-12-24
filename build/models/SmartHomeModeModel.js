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
const _SmartHomeModeModel = class {
  static getAttributeTypeMap() {
    return _SmartHomeModeModel.attributeTypeMap;
  }
  constructor() {
  }
};
let SmartHomeModeModel = _SmartHomeModeModel;
SmartHomeModeModel.discriminator = void 0;
SmartHomeModeModel.attributeTypeMap = [
  {
    name: "smartHomeMode",
    baseName: "smartHomeMode",
    type: "SmartMode",
    format: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartHomeModeModel
});
//# sourceMappingURL=SmartHomeModeModel.js.map
