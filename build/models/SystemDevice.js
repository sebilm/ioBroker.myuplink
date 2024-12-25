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
var SystemDevice_exports = {};
__export(SystemDevice_exports, {
  SystemDevice: () => SystemDevice
});
module.exports = __toCommonJS(SystemDevice_exports);
const _SystemDevice = class _SystemDevice {
  /**
   * Returns the attribute type map for the SystemDevice class.
   */
  static getAttributeTypeMap() {
    return _SystemDevice.attributeTypeMap;
  }
  /**
   * Constructs a new instance of the SystemDevice class.
   */
  constructor() {
  }
};
_SystemDevice.discriminator = void 0;
_SystemDevice.attributeTypeMap = [
  {
    name: "id",
    baseName: "id",
    type: "string",
    format: ""
  },
  {
    name: "connectionState",
    baseName: "connectionState",
    type: "DeviceConnectionState",
    format: ""
  },
  {
    name: "currentFwVersion",
    baseName: "currentFwVersion",
    type: "string",
    format: ""
  },
  {
    name: "product",
    baseName: "product",
    type: "Product",
    format: ""
  }
];
let SystemDevice = _SystemDevice;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SystemDevice
});
//# sourceMappingURL=SystemDevice.js.map
