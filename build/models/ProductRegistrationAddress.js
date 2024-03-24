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
var ProductRegistrationAddress_exports = {};
__export(ProductRegistrationAddress_exports, {
  ProductRegistrationAddress: () => ProductRegistrationAddress
});
module.exports = __toCommonJS(ProductRegistrationAddress_exports);
const _ProductRegistrationAddress = class _ProductRegistrationAddress {
  static getAttributeTypeMap() {
    return _ProductRegistrationAddress.attributeTypeMap;
  }
  constructor() {
  }
};
_ProductRegistrationAddress.discriminator = void 0;
_ProductRegistrationAddress.attributeTypeMap = [
  {
    name: "city",
    baseName: "city",
    type: "string",
    format: ""
  },
  {
    name: "region",
    baseName: "region",
    type: "string",
    format: ""
  },
  {
    name: "country",
    baseName: "country",
    type: "Country",
    format: ""
  },
  {
    name: "postalCode",
    baseName: "postalCode",
    type: "string",
    format: ""
  }
];
let ProductRegistrationAddress = _ProductRegistrationAddress;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductRegistrationAddress
});
//# sourceMappingURL=ProductRegistrationAddress.js.map
