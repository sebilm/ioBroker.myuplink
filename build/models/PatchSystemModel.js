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
var PatchSystemModel_exports = {};
__export(PatchSystemModel_exports, {
  PatchSystemModel: () => PatchSystemModel
});
module.exports = __toCommonJS(PatchSystemModel_exports);
const _PatchSystemModel = class {
  static getAttributeTypeMap() {
    return _PatchSystemModel.attributeTypeMap;
  }
  constructor() {
  }
};
let PatchSystemModel = _PatchSystemModel;
PatchSystemModel.discriminator = void 0;
PatchSystemModel.attributeTypeMap = [
  {
    name: "systemId",
    baseName: "systemId",
    type: "string",
    format: "uuid"
  },
  {
    name: "name",
    baseName: "name",
    type: "string",
    format: ""
  },
  {
    name: "isFound",
    baseName: "isFound",
    type: "boolean",
    format: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PatchSystemModel
});
//# sourceMappingURL=PatchSystemModel.js.map
