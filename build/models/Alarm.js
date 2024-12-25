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
var Alarm_exports = {};
__export(Alarm_exports, {
  Alarm: () => Alarm
});
module.exports = __toCommonJS(Alarm_exports);
const _Alarm = class _Alarm {
  /**
   * Returns the attribute type map for the Alarm class.
   */
  static getAttributeTypeMap() {
    return _Alarm.attributeTypeMap;
  }
  /**
   * Constructs a new instance of the Alarm class.
   */
  constructor() {
  }
};
_Alarm.discriminator = void 0;
_Alarm.attributeTypeMap = [
  {
    name: "id",
    baseName: "id",
    type: "string",
    format: "uuid"
  },
  {
    name: "alarmNumber",
    baseName: "alarmNumber",
    type: "number",
    format: "int32"
  },
  {
    name: "deviceId",
    baseName: "deviceId",
    type: "string",
    format: ""
  },
  {
    name: "severity",
    baseName: "severity",
    type: "number",
    format: "int32"
  },
  {
    name: "status",
    baseName: "status",
    type: "Status",
    format: ""
  },
  {
    name: "createdDatetime",
    baseName: "createdDatetime",
    type: "string",
    format: ""
  },
  {
    name: "statusHistory",
    baseName: "statusHistory",
    type: "Array<AlarmStatus>",
    format: ""
  },
  {
    name: "header",
    baseName: "header",
    type: "string",
    format: ""
  },
  {
    name: "description",
    baseName: "description",
    type: "string",
    format: ""
  },
  {
    name: "equipName",
    baseName: "equipName",
    type: "string",
    format: ""
  }
];
let Alarm = _Alarm;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Alarm
});
//# sourceMappingURL=Alarm.js.map
