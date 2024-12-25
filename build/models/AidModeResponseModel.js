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
var AidModeResponseModel_exports = {};
__export(AidModeResponseModel_exports, {
  AidModeResponseModel: () => AidModeResponseModel
});
module.exports = __toCommonJS(AidModeResponseModel_exports);
const _AidModeResponseModel = class _AidModeResponseModel {
  /**
   * Returns the attribute type map for AidModeResponseModel.
   */
  static getAttributeTypeMap() {
    return _AidModeResponseModel.attributeTypeMap;
  }
  /**
   * Constructs a new instance of the AidModeResponseModel class.
   */
  constructor() {
  }
};
_AidModeResponseModel.discriminator = void 0;
_AidModeResponseModel.attributeTypeMap = [
  {
    name: "aidMode",
    baseName: "aidMode",
    type: "AidMode",
    format: ""
  }
];
let AidModeResponseModel = _AidModeResponseModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AidModeResponseModel
});
//# sourceMappingURL=AidModeResponseModel.js.map
