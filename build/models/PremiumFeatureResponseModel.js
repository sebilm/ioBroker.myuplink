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
var PremiumFeatureResponseModel_exports = {};
__export(PremiumFeatureResponseModel_exports, {
  PremiumFeatureResponseModel: () => PremiumFeatureResponseModel
});
module.exports = __toCommonJS(PremiumFeatureResponseModel_exports);
const _PremiumFeatureResponseModel = class {
  static getAttributeTypeMap() {
    return _PremiumFeatureResponseModel.attributeTypeMap;
  }
  constructor() {
  }
};
let PremiumFeatureResponseModel = _PremiumFeatureResponseModel;
PremiumFeatureResponseModel.discriminator = void 0;
PremiumFeatureResponseModel.attributeTypeMap = [
  {
    name: "validUntil",
    baseName: "validUntil",
    type: "Date",
    format: "date-time"
  },
  {
    name: "type",
    baseName: "type",
    type: "PremiumFeatures",
    format: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PremiumFeatureResponseModel
});
//# sourceMappingURL=PremiumFeatureResponseModel.js.map
