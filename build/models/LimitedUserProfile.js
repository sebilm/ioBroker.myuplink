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
var LimitedUserProfile_exports = {};
__export(LimitedUserProfile_exports, {
  LimitedUserProfile: () => LimitedUserProfile
});
module.exports = __toCommonJS(LimitedUserProfile_exports);
const _LimitedUserProfile = class _LimitedUserProfile {
  static getAttributeTypeMap() {
    return _LimitedUserProfile.attributeTypeMap;
  }
  constructor() {
  }
};
_LimitedUserProfile.discriminator = void 0;
_LimitedUserProfile.attributeTypeMap = [
  {
    name: "fullName",
    baseName: "fullName",
    type: "string",
    format: ""
  }
];
let LimitedUserProfile = _LimitedUserProfile;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LimitedUserProfile
});
//# sourceMappingURL=LimitedUserProfile.js.map
