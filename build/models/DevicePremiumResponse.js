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
var DevicePremiumResponse_exports = {};
__export(DevicePremiumResponse_exports, {
  DevicePremiumResponse: () => DevicePremiumResponse
});
module.exports = __toCommonJS(DevicePremiumResponse_exports);
const _DevicePremiumResponse = class _DevicePremiumResponse {
  /**
   * Returns the attribute type map for DevicePremiumResponse.
   */
  static getAttributeTypeMap() {
    return _DevicePremiumResponse.attributeTypeMap;
  }
  /**
   * Constructs a new instance of the DevicePremiumResponse class.
   */
  constructor() {
  }
};
_DevicePremiumResponse.discriminator = void 0;
_DevicePremiumResponse.attributeTypeMap = [
  {
    name: "subscriptions",
    baseName: "subscriptions",
    type: "Array<PremiumFeatureResponseModel>",
    format: ""
  }
];
let DevicePremiumResponse = _DevicePremiumResponse;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DevicePremiumResponse
});
//# sourceMappingURL=DevicePremiumResponse.js.map
