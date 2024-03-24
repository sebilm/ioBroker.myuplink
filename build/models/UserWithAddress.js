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
var UserWithAddress_exports = {};
__export(UserWithAddress_exports, {
  UserWithAddress: () => UserWithAddress
});
module.exports = __toCommonJS(UserWithAddress_exports);
const _UserWithAddress = class _UserWithAddress {
  static getAttributeTypeMap() {
    return _UserWithAddress.attributeTypeMap;
  }
  constructor() {
  }
};
_UserWithAddress.discriminator = void 0;
_UserWithAddress.attributeTypeMap = [
  {
    name: "userId",
    baseName: "userId",
    type: "string",
    format: "uuid"
  },
  {
    name: "email",
    baseName: "email",
    type: "string",
    format: ""
  },
  {
    name: "fullName",
    baseName: "fullName",
    type: "string",
    format: ""
  },
  {
    name: "address",
    baseName: "address",
    type: "Address",
    format: ""
  }
];
let UserWithAddress = _UserWithAddress;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserWithAddress
});
//# sourceMappingURL=UserWithAddress.js.map
