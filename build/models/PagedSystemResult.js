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
var PagedSystemResult_exports = {};
__export(PagedSystemResult_exports, {
  PagedSystemResult: () => PagedSystemResult
});
module.exports = __toCommonJS(PagedSystemResult_exports);
const _PagedSystemResult = class _PagedSystemResult {
  static getAttributeTypeMap() {
    return _PagedSystemResult.attributeTypeMap;
  }
  constructor() {
  }
};
_PagedSystemResult.discriminator = void 0;
_PagedSystemResult.attributeTypeMap = [
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
    name: "systems",
    baseName: "systems",
    type: "Array<SystemWithDevices>",
    format: ""
  }
];
let PagedSystemResult = _PagedSystemResult;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PagedSystemResult
});
//# sourceMappingURL=PagedSystemResult.js.map
