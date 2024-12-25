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
var ReportedFirmware_exports = {};
__export(ReportedFirmware_exports, {
  ReportedFirmware: () => ReportedFirmware
});
module.exports = __toCommonJS(ReportedFirmware_exports);
const _ReportedFirmware = class _ReportedFirmware {
  /**
   * Returns the attribute type map for the ReportedFirmware class.
   */
  static getAttributeTypeMap() {
    return _ReportedFirmware.attributeTypeMap;
  }
  /**
   * Constructs a new instance of the ReportedFirmware class.
   */
  constructor() {
  }
};
_ReportedFirmware.discriminator = void 0;
_ReportedFirmware.attributeTypeMap = [
  {
    name: "firmwareId",
    baseName: "firmwareId",
    type: "string",
    format: ""
  },
  {
    name: "pendingFwVersion",
    baseName: "pendingFwVersion",
    type: "string",
    format: ""
  },
  {
    name: "lastFwUpdateStartTime",
    baseName: "lastFwUpdateStartTime",
    type: "string",
    format: ""
  },
  {
    name: "currentFwVersion",
    baseName: "currentFwVersion",
    type: "string",
    format: ""
  },
  {
    name: "lastFwUpdateEndTime",
    baseName: "lastFwUpdateEndTime",
    type: "string",
    format: ""
  }
];
let ReportedFirmware = _ReportedFirmware;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReportedFirmware
});
//# sourceMappingURL=ReportedFirmware.js.map
