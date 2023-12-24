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
var Reported_exports = {};
__export(Reported_exports, {
  Reported: () => Reported
});
module.exports = __toCommonJS(Reported_exports);
const _Reported = class {
  static getAttributeTypeMap() {
    return _Reported.attributeTypeMap;
  }
  constructor() {
  }
};
let Reported = _Reported;
Reported.discriminator = void 0;
Reported.attributeTypeMap = [
  {
    name: "deviceName",
    baseName: "deviceName",
    type: "string",
    format: ""
  },
  {
    name: "productName",
    baseName: "productName",
    type: "string",
    format: ""
  },
  {
    name: "brand",
    baseName: "brand",
    type: "string",
    format: ""
  },
  {
    name: "version",
    baseName: "version",
    type: "string",
    format: ""
  },
  {
    name: "serialId",
    baseName: "serialId",
    type: "string",
    format: ""
  },
  {
    name: "firmware",
    baseName: "firmware",
    type: "ReportedFirmware",
    format: ""
  },
  {
    name: "aidMode",
    baseName: "aidMode",
    type: "string",
    format: ""
  },
  {
    name: "smartMode",
    baseName: "smartMode",
    type: "string",
    format: ""
  },
  {
    name: "country",
    baseName: "country",
    type: "string",
    format: ""
  },
  {
    name: "version",
    baseName: "$version",
    type: "string",
    format: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Reported
});
//# sourceMappingURL=Reported.js.map
