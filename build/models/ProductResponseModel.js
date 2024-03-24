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
var ProductResponseModel_exports = {};
__export(ProductResponseModel_exports, {
  ProductResponseModel: () => ProductResponseModel
});
module.exports = __toCommonJS(ProductResponseModel_exports);
const _ProductResponseModel = class _ProductResponseModel {
  static getAttributeTypeMap() {
    return _ProductResponseModel.attributeTypeMap;
  }
  constructor() {
  }
};
_ProductResponseModel.discriminator = void 0;
_ProductResponseModel.attributeTypeMap = [
  {
    name: "serialNumber",
    baseName: "serialNumber",
    type: "string",
    format: ""
  },
  {
    name: "name",
    baseName: "name",
    type: "string",
    format: ""
  }
];
let ProductResponseModel = _ProductResponseModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductResponseModel
});
//# sourceMappingURL=ProductResponseModel.js.map
