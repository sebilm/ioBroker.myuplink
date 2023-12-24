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
var VoucherManyRequest_exports = {};
__export(VoucherManyRequest_exports, {
  VoucherManyRequest: () => VoucherManyRequest
});
module.exports = __toCommonJS(VoucherManyRequest_exports);
const _VoucherManyRequest = class {
  static getAttributeTypeMap() {
    return _VoucherManyRequest.attributeTypeMap;
  }
  constructor() {
  }
};
let VoucherManyRequest = _VoucherManyRequest;
VoucherManyRequest.discriminator = void 0;
VoucherManyRequest.attributeTypeMap = [
  {
    name: "numDays",
    baseName: "numDays",
    type: "number",
    format: "int32"
  },
  {
    name: "voucherType",
    baseName: "voucherType",
    type: "VoucherType",
    format: ""
  },
  {
    name: "numVouchers",
    baseName: "numVouchers",
    type: "number",
    format: "int32"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VoucherManyRequest
});
//# sourceMappingURL=VoucherManyRequest.js.map
