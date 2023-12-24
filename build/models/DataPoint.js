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
var DataPoint_exports = {};
__export(DataPoint_exports, {
  DataPoint: () => DataPoint
});
module.exports = __toCommonJS(DataPoint_exports);
const _DataPoint = class {
  static getAttributeTypeMap() {
    return _DataPoint.attributeTypeMap;
  }
  constructor() {
  }
};
let DataPoint = _DataPoint;
DataPoint.discriminator = void 0;
DataPoint.attributeTypeMap = [
  {
    name: "timestamp",
    baseName: "timestamp",
    type: "Date",
    format: "date-time"
  },
  {
    name: "value",
    baseName: "value",
    type: "number",
    format: "double"
  },
  {
    name: "pointId",
    baseName: "pointId",
    type: "string",
    format: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataPoint
});
//# sourceMappingURL=DataPoint.js.map
