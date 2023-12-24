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
var AidMode_exports = {};
__export(AidMode_exports, {
  AidMode: () => AidMode
});
module.exports = __toCommonJS(AidMode_exports);
var AidMode = /* @__PURE__ */ ((AidMode2) => {
  AidMode2[AidMode2["NUMBER_0"] = 0] = "NUMBER_0";
  AidMode2[AidMode2["NUMBER_1"] = 1] = "NUMBER_1";
  return AidMode2;
})(AidMode || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AidMode
});
//# sourceMappingURL=AidMode.js.map
