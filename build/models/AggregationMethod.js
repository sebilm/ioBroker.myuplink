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
var AggregationMethod_exports = {};
__export(AggregationMethod_exports, {
  AggregationMethod: () => AggregationMethod
});
module.exports = __toCommonJS(AggregationMethod_exports);
var AggregationMethod = /* @__PURE__ */ ((AggregationMethod2) => {
  AggregationMethod2["Max"] = "Max";
  AggregationMethod2["Min"] = "Min";
  AggregationMethod2["Sum"] = "Sum";
  AggregationMethod2["Average"] = "Average";
  AggregationMethod2["Median"] = "Median";
  AggregationMethod2["Diff"] = "Diff";
  AggregationMethod2["None"] = "None";
  return AggregationMethod2;
})(AggregationMethod || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AggregationMethod
});
//# sourceMappingURL=AggregationMethod.js.map
