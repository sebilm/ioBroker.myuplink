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
var SearchGroupSSG_exports = {};
__export(SearchGroupSSG_exports, {
  SearchGroupSSG: () => SearchGroupSSG
});
module.exports = __toCommonJS(SearchGroupSSG_exports);
const _SearchGroupSSG = class {
  static getAttributeTypeMap() {
    return _SearchGroupSSG.attributeTypeMap;
  }
  constructor() {
  }
};
let SearchGroupSSG = _SearchGroupSSG;
SearchGroupSSG.discriminator = void 0;
SearchGroupSSG.attributeTypeMap = [
  {
    name: "deviceId",
    baseName: "deviceId",
    type: "string",
    format: ""
  },
  {
    name: "systemId",
    baseName: "systemId",
    type: "string",
    format: "uuid"
  },
  {
    name: "version",
    baseName: "version",
    type: "number",
    format: "int64"
  },
  {
    name: "status",
    baseName: "status",
    type: "string",
    format: ""
  },
  {
    name: "connectionState",
    baseName: "connectionState",
    type: "string",
    format: ""
  },
  {
    name: "lastActivityTime",
    baseName: "lastActivityTime",
    type: "Date",
    format: "date-time"
  },
  {
    name: "authenticationType",
    baseName: "authenticationType",
    type: "string",
    format: ""
  },
  {
    name: "properties",
    baseName: "properties",
    type: "Properties",
    format: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SearchGroupSSG
});
//# sourceMappingURL=SearchGroupSSG.js.map
