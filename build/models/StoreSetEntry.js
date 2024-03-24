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
var StoreSetEntry_exports = {};
__export(StoreSetEntry_exports, {
  StoreSetEntry: () => StoreSetEntry
});
module.exports = __toCommonJS(StoreSetEntry_exports);
const _StoreSetEntry = class _StoreSetEntry {
  static getAttributeTypeMap() {
    return _StoreSetEntry.attributeTypeMap;
  }
  constructor() {
  }
};
_StoreSetEntry.discriminator = void 0;
_StoreSetEntry.attributeTypeMap = [
  {
    name: "variableId",
    baseName: "variableId",
    type: "string",
    format: ""
  },
  {
    name: "description",
    baseName: "description",
    type: "string",
    format: ""
  },
  {
    name: "currentValue",
    baseName: "currentValue",
    type: "number",
    format: "int32"
  },
  {
    name: "defaultValue",
    baseName: "defaultValue",
    type: "number",
    format: "int32"
  }
];
let StoreSetEntry = _StoreSetEntry;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StoreSetEntry
});
//# sourceMappingURL=StoreSetEntry.js.map
