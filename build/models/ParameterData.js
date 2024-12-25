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
var ParameterData_exports = {};
__export(ParameterData_exports, {
  ParameterData: () => ParameterData
});
module.exports = __toCommonJS(ParameterData_exports);
const _ParameterData = class _ParameterData {
  /**
   * Returns the attribute type map for the ParameterData class.
   */
  static getAttributeTypeMap() {
    return _ParameterData.attributeTypeMap;
  }
  /**
   * Constructs a new instance of the ParameterData class.
   */
  constructor() {
  }
};
_ParameterData.discriminator = void 0;
_ParameterData.attributeTypeMap = [
  {
    name: "category",
    baseName: "category",
    type: "string",
    format: ""
  },
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
    name: "writable",
    baseName: "writable",
    type: "boolean",
    format: ""
  },
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
    name: "strVal",
    baseName: "strVal",
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
    format: "double"
  },
  {
    name: "maxValue",
    baseName: "maxValue",
    type: "number",
    format: "double"
  },
  {
    name: "stepValue",
    baseName: "stepValue",
    type: "number",
    format: "double"
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
let ParameterData = _ParameterData;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ParameterData
});
//# sourceMappingURL=ParameterData.js.map
