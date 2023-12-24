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
var AddressResponseModel_exports = {};
__export(AddressResponseModel_exports, {
  AddressResponseModel: () => AddressResponseModel
});
module.exports = __toCommonJS(AddressResponseModel_exports);
const _AddressResponseModel = class {
  static getAttributeTypeMap() {
    return _AddressResponseModel.attributeTypeMap;
  }
  constructor() {
  }
};
let AddressResponseModel = _AddressResponseModel;
AddressResponseModel.discriminator = void 0;
AddressResponseModel.attributeTypeMap = [
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddressResponseModel
});
//# sourceMappingURL=AddressResponseModel.js.map
