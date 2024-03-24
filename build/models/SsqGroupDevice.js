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
var SsqGroupDevice_exports = {};
__export(SsqGroupDevice_exports, {
  SsqGroupDevice: () => SsqGroupDevice
});
module.exports = __toCommonJS(SsqGroupDevice_exports);
const _SsqGroupDevice = class _SsqGroupDevice {
  static getAttributeTypeMap() {
    return _SsqGroupDevice.attributeTypeMap;
  }
  constructor() {
  }
};
_SsqGroupDevice.discriminator = void 0;
_SsqGroupDevice.attributeTypeMap = [
  {
    name: "name",
    baseName: "name",
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
    name: "id",
    baseName: "id",
    type: "string",
    format: ""
  },
  {
    name: "type",
    baseName: "type",
    type: "string",
    format: ""
  }
];
let SsqGroupDevice = _SsqGroupDevice;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SsqGroupDevice
});
//# sourceMappingURL=SsqGroupDevice.js.map
