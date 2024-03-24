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
var Product_exports = {};
__export(Product_exports, {
  Product: () => Product
});
module.exports = __toCommonJS(Product_exports);
const _Product = class _Product {
  static getAttributeTypeMap() {
    return _Product.attributeTypeMap;
  }
  constructor() {
  }
};
_Product.discriminator = void 0;
_Product.attributeTypeMap = [
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
let Product = _Product;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Product
});
//# sourceMappingURL=Product.js.map
