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
var ParameterDetail_exports = {};
__export(ParameterDetail_exports, {
  ParameterDetail: () => ParameterDetail
});
module.exports = __toCommonJS(ParameterDetail_exports);
const _ParameterDetail = class _ParameterDetail {
  static getAttributeTypeMap() {
    return _ParameterDetail.attributeTypeMap;
  }
  constructor() {
  }
};
_ParameterDetail.discriminator = void 0;
_ParameterDetail.attributeTypeMap = [
  {
    name: "parameterId",
    baseName: "parameterId",
    type: "string",
    format: ""
  },
  {
    name: "parameterName",
    baseName: "parameterName",
    type: "string",
    format: ""
  },
  {
    name: "parameterUnit",
    baseName: "parameterUnit",
    type: "string",
    format: ""
  },
  {
    name: "smartHomeCategories",
    baseName: "smartHomeCategories",
    type: "Array<string>",
    format: ""
  },
  {
    name: "minValue",
    baseName: "minValue",
    type: "number",
    format: "int32"
  },
  {
    name: "maxValue",
    baseName: "maxValue",
    type: "number",
    format: "int32"
  },
  {
    name: "stepValue",
    baseName: "stepValue",
    type: "number",
    format: "int32"
  },
  {
    name: "enumValues",
    baseName: "enumValues",
    type: "Array<EnumValues>",
    format: ""
  },
  {
    name: "scaleValue",
    baseName: "scaleValue",
    type: "string",
    format: ""
  },
  {
    name: "zoneId",
    baseName: "zoneId",
    type: "string",
    format: ""
  }
];
let ParameterDetail = _ParameterDetail;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ParameterDetail
});
//# sourceMappingURL=ParameterDetail.js.map
