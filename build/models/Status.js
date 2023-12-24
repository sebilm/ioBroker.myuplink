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
var Status_exports = {};
__export(Status_exports, {
  Status: () => Status
});
module.exports = __toCommonJS(Status_exports);
var Status = /* @__PURE__ */ ((Status2) => {
  Status2["None"] = "None";
  Status2["Active"] = "Active";
  Status2["DismissedByDevice"] = "DismissedByDevice";
  Status2["ResetByUserOnDevice"] = "ResetByUserOnDevice";
  Status2["ResetByUserFromCloud"] = "ResetByUserFromCloud";
  Status2["Unknown"] = "Unknown";
  return Status2;
})(Status || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Status
});
//# sourceMappingURL=Status.js.map
