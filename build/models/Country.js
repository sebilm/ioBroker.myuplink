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
var Country_exports = {};
__export(Country_exports, {
  Country: () => Country
});
module.exports = __toCommonJS(Country_exports);
const _Country = class _Country {
  /**
   * Returns the attribute type map for the Country model.
   */
  static getAttributeTypeMap() {
    return _Country.attributeTypeMap;
  }
  /**
   * Constructor for the Country model.
   */
  constructor() {
  }
};
_Country.discriminator = void 0;
_Country.attributeTypeMap = [
  {
    name: "name",
    baseName: "name",
    type: "string",
    format: ""
  }
];
let Country = _Country;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Country
});
//# sourceMappingURL=Country.js.map
