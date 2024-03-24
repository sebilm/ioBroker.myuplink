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
var AlarmsPaged_exports = {};
__export(AlarmsPaged_exports, {
  AlarmsPaged: () => AlarmsPaged
});
module.exports = __toCommonJS(AlarmsPaged_exports);
const _AlarmsPaged = class _AlarmsPaged {
  static getAttributeTypeMap() {
    return _AlarmsPaged.attributeTypeMap;
  }
  constructor() {
  }
};
_AlarmsPaged.discriminator = void 0;
_AlarmsPaged.attributeTypeMap = [
  {
    name: "page",
    baseName: "page",
    type: "number",
    format: "int32"
  },
  {
    name: "itemsPerPage",
    baseName: "itemsPerPage",
    type: "number",
    format: "int32"
  },
  {
    name: "numItems",
    baseName: "numItems",
    type: "number",
    format: "int32"
  },
  {
    name: "notifications",
    baseName: "notifications",
    type: "Array<Alarm>",
    format: ""
  }
];
let AlarmsPaged = _AlarmsPaged;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AlarmsPaged
});
//# sourceMappingURL=AlarmsPaged.js.map
