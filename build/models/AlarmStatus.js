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
var AlarmStatus_exports = {};
__export(AlarmStatus_exports, {
  AlarmStatus: () => AlarmStatus
});
module.exports = __toCommonJS(AlarmStatus_exports);
const _AlarmStatus = class _AlarmStatus {
  /**
   * Returns the attribute type map for the AlarmStatus class.
   */
  static getAttributeTypeMap() {
    return _AlarmStatus.attributeTypeMap;
  }
  /**
   * Constructs an instance of the AlarmStatus class.
   */
  constructor() {
  }
};
_AlarmStatus.discriminator = void 0;
_AlarmStatus.attributeTypeMap = [
  {
    name: "status",
    baseName: "status",
    type: "Status",
    format: ""
  },
  {
    name: "datetime",
    baseName: "datetime",
    type: "number",
    format: "int32"
  }
];
let AlarmStatus = _AlarmStatus;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AlarmStatus
});
//# sourceMappingURL=AlarmStatus.js.map
