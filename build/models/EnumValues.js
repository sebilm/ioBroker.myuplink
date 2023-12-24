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
var EnumValues_exports = {};
__export(EnumValues_exports, {
  EnumValues: () => EnumValues
});
module.exports = __toCommonJS(EnumValues_exports);
const _EnumValues = class {
  static getAttributeTypeMap() {
    return _EnumValues.attributeTypeMap;
  }
  constructor() {
  }
};
let EnumValues = _EnumValues;
EnumValues.discriminator = void 0;
EnumValues.attributeTypeMap = [
  {
    name: "value",
    baseName: "value",
    type: "string",
    format: ""
  },
  {
    name: "text",
    baseName: "text",
    type: "string",
    format: ""
  },
  {
    name: "icon",
    baseName: "icon",
    type: "string",
    format: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EnumValues
});
//# sourceMappingURL=EnumValues.js.map
