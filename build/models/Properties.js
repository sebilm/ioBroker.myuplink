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
var Properties_exports = {};
__export(Properties_exports, {
  Properties: () => Properties
});
module.exports = __toCommonJS(Properties_exports);
const _Properties = class {
  static getAttributeTypeMap() {
    return _Properties.attributeTypeMap;
  }
  constructor() {
  }
};
let Properties = _Properties;
Properties.discriminator = void 0;
Properties.attributeTypeMap = [
  {
    name: "reported",
    baseName: "reported",
    type: "Reported",
    format: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Properties
});
//# sourceMappingURL=Properties.js.map
