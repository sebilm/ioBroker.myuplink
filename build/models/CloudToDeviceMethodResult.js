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
var CloudToDeviceMethodResult_exports = {};
__export(CloudToDeviceMethodResult_exports, {
  CloudToDeviceMethodResult: () => CloudToDeviceMethodResult
});
module.exports = __toCommonJS(CloudToDeviceMethodResult_exports);
const _CloudToDeviceMethodResult = class {
  static getAttributeTypeMap() {
    return _CloudToDeviceMethodResult.attributeTypeMap;
  }
  constructor() {
  }
};
let CloudToDeviceMethodResult = _CloudToDeviceMethodResult;
CloudToDeviceMethodResult.discriminator = void 0;
CloudToDeviceMethodResult.attributeTypeMap = [
  {
    name: "status",
    baseName: "status",
    type: "number",
    format: "int32"
  },
  {
    name: "payload",
    baseName: "payload",
    type: "any",
    format: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CloudToDeviceMethodResult
});
//# sourceMappingURL=CloudToDeviceMethodResult.js.map
