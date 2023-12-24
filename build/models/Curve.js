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
var Curve_exports = {};
__export(Curve_exports, {
  Curve: () => Curve
});
module.exports = __toCommonJS(Curve_exports);
const _Curve = class {
  static getAttributeTypeMap() {
    return _Curve.attributeTypeMap;
  }
  constructor() {
  }
};
let Curve = _Curve;
Curve.discriminator = void 0;
Curve.attributeTypeMap = [
  {
    name: "parameter",
    baseName: "parameter",
    type: "ParameterData",
    format: ""
  },
  {
    name: "data",
    baseName: "data",
    type: "Array<DataPoint>",
    format: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Curve
});
//# sourceMappingURL=Curve.js.map
