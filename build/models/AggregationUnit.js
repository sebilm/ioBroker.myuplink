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
var AggregationUnit_exports = {};
__export(AggregationUnit_exports, {
  AggregationUnit: () => AggregationUnit
});
module.exports = __toCommonJS(AggregationUnit_exports);
var AggregationUnit = /* @__PURE__ */ ((AggregationUnit2) => {
  AggregationUnit2["None"] = "None";
  AggregationUnit2["Hours"] = "Hours";
  AggregationUnit2["Days"] = "Days";
  AggregationUnit2["Weeks"] = "Weeks";
  AggregationUnit2["Months"] = "Months";
  AggregationUnit2["WeeksStartingOnSunday"] = "WeeksStartingOnSunday";
  AggregationUnit2["Infinite"] = "Infinite";
  return AggregationUnit2;
})(AggregationUnit || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AggregationUnit
});
//# sourceMappingURL=AggregationUnit.js.map
