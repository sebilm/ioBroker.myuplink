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
var Address_exports = {};
__export(Address_exports, {
  Address: () => Address
});
module.exports = __toCommonJS(Address_exports);
const _Address = class _Address {
  static getAttributeTypeMap() {
    return _Address.attributeTypeMap;
  }
  constructor() {
  }
};
_Address.discriminator = void 0;
_Address.attributeTypeMap = [
  {
    name: "id",
    baseName: "id",
    type: "string",
    format: ""
  },
  {
    name: "lineOne",
    baseName: "lineOne",
    type: "string",
    format: ""
  },
  {
    name: "lineTwo",
    baseName: "lineTwo",
    type: "string",
    format: ""
  },
  {
    name: "postalCode",
    baseName: "postalCode",
    type: "string",
    format: ""
  },
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
  }
];
let Address = _Address;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Address
});
//# sourceMappingURL=Address.js.map
