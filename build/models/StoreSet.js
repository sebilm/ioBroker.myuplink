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
var StoreSet_exports = {};
__export(StoreSet_exports, {
  StoreSet: () => StoreSet
});
module.exports = __toCommonJS(StoreSet_exports);
const _StoreSet = class _StoreSet {
  /**
   * Returns the attribute type map for the StoreSet class.
   */
  static getAttributeTypeMap() {
    return _StoreSet.attributeTypeMap;
  }
  /**
   * Constructs a new instance of the StoreSet class.
   */
  constructor() {
  }
};
_StoreSet.discriminator = void 0;
_StoreSet.attributeTypeMap = [
  {
    name: "title",
    baseName: "title",
    type: "string",
    format: ""
  },
  {
    name: "rows",
    baseName: "rows",
    type: "Array<StoreSetEntry>",
    format: ""
  }
];
let StoreSet = _StoreSet;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StoreSet
});
//# sourceMappingURL=StoreSet.js.map
