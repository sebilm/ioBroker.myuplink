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
var AlarmSeverity_exports = {};
__export(AlarmSeverity_exports, {
  AlarmSeverity: () => AlarmSeverity
});
module.exports = __toCommonJS(AlarmSeverity_exports);
var AlarmSeverity = /* @__PURE__ */ ((AlarmSeverity2) => {
  AlarmSeverity2[AlarmSeverity2["NUMBER_0"] = 0] = "NUMBER_0";
  AlarmSeverity2[AlarmSeverity2["NUMBER_1"] = 1] = "NUMBER_1";
  AlarmSeverity2[AlarmSeverity2["NUMBER_2"] = 2] = "NUMBER_2";
  AlarmSeverity2[AlarmSeverity2["NUMBER_3"] = 3] = "NUMBER_3";
  AlarmSeverity2[AlarmSeverity2["NUMBER_4"] = 4] = "NUMBER_4";
  AlarmSeverity2[AlarmSeverity2["NUMBER_5"] = 5] = "NUMBER_5";
  return AlarmSeverity2;
})(AlarmSeverity || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AlarmSeverity
});
//# sourceMappingURL=AlarmSeverity.js.map
