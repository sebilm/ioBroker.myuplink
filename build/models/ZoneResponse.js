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
var ZoneResponse_exports = {};
__export(ZoneResponse_exports, {
  ZoneResponse: () => ZoneResponse
});
module.exports = __toCommonJS(ZoneResponse_exports);
class ZoneResponse {
  /**
   * Returns the attribute type map for the ZoneResponse class.
   */
  static getAttributeTypeMap() {
    return this.attributeTypeMap;
  }
  /**
   * Constructs a new instance of the ZoneResponse class.
   */
  constructor() {
  }
}
ZoneResponse.discriminator = void 0;
ZoneResponse.attributeTypeMap = [
  {
    name: "zoneId",
    baseName: "zoneId",
    type: "string",
    format: ""
  },
  {
    name: "name",
    baseName: "name",
    type: "string",
    format: ""
  },
  {
    name: "commandOnly",
    baseName: "commandOnly",
    type: "boolean",
    format: ""
  },
  {
    name: "supportedModes",
    baseName: "supportedModes",
    type: "string",
    format: ""
  },
  {
    name: "mode",
    baseName: "mode",
    type: "string",
    format: ""
  },
  {
    name: "temperature",
    baseName: "temperature",
    type: "number",
    format: "double"
  },
  {
    name: "setpoint",
    baseName: "setpoint",
    type: "number",
    format: "double"
  },
  {
    name: "setpointHeat",
    baseName: "setpointHeat",
    type: "number",
    format: "double"
  },
  {
    name: "setpointCool",
    baseName: "setpointCool",
    type: "number",
    format: "double"
  },
  {
    name: "setpointRangeMin",
    baseName: "setpointRangeMin",
    type: "number",
    format: "int32"
  },
  {
    name: "setpointRangeMax",
    baseName: "setpointRangeMax",
    type: "number",
    format: "int32"
  },
  {
    name: "isCelsius",
    baseName: "isCelsius",
    type: "boolean",
    format: ""
  },
  {
    name: "indoorCo2",
    baseName: "indoorCo2",
    type: "number",
    format: "int32"
  },
  {
    name: "indoorHumidity",
    baseName: "indoorHumidity",
    type: "number",
    format: "double"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ZoneResponse
});
//# sourceMappingURL=ZoneResponse.js.map
