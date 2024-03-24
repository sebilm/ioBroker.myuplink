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
var SpotPriceDeliveryModel_exports = {};
__export(SpotPriceDeliveryModel_exports, {
  SpotPriceDeliveryModel: () => SpotPriceDeliveryModel
});
module.exports = __toCommonJS(SpotPriceDeliveryModel_exports);
const _SpotPriceDeliveryModel = class _SpotPriceDeliveryModel {
  static getAttributeTypeMap() {
    return _SpotPriceDeliveryModel.attributeTypeMap;
  }
  constructor() {
  }
};
_SpotPriceDeliveryModel.discriminator = void 0;
_SpotPriceDeliveryModel.attributeTypeMap = [
  {
    name: "prices",
    baseName: "prices",
    type: "{ [key: string]: number | null; }",
    format: "int32"
  }
];
let SpotPriceDeliveryModel = _SpotPriceDeliveryModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SpotPriceDeliveryModel
});
//# sourceMappingURL=SpotPriceDeliveryModel.js.map
