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
var ZonePatchRequest_exports = {};
__export(ZonePatchRequest_exports, {
  ZonePatchRequest: () => ZonePatchRequest
});
module.exports = __toCommonJS(ZonePatchRequest_exports);
const _ZonePatchRequest = class _ZonePatchRequest {
  /**
   * Returns the attribute type map for ZonePatchRequest.
   */
  static getAttributeTypeMap() {
    return _ZonePatchRequest.attributeTypeMap;
  }
  /**
   * Constructs a new ZonePatchRequest instance.
   */
  constructor() {
  }
};
_ZonePatchRequest.discriminator = void 0;
_ZonePatchRequest.attributeTypeMap = [
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
    name: "mode",
    baseName: "mode",
    type: "string",
    format: ""
  }
];
let ZonePatchRequest = _ZonePatchRequest;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ZonePatchRequest
});
//# sourceMappingURL=ZonePatchRequest.js.map
