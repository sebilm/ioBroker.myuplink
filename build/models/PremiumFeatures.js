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
var PremiumFeatures_exports = {};
__export(PremiumFeatures_exports, {
  PremiumFeatures: () => PremiumFeatures
});
module.exports = __toCommonJS(PremiumFeatures_exports);
var PremiumFeatures = /* @__PURE__ */ ((PremiumFeatures2) => {
  PremiumFeatures2["History"] = "history";
  PremiumFeatures2["Manage"] = "manage";
  PremiumFeatures2["Organization"] = "organization";
  return PremiumFeatures2;
})(PremiumFeatures || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PremiumFeatures
});
//# sourceMappingURL=PremiumFeatures.js.map
