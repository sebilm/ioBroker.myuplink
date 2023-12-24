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
var V2DevicesDeviceIdSmartHomeCategoriesGet200Response_exports = {};
__export(V2DevicesDeviceIdSmartHomeCategoriesGet200Response_exports, {
  V2DevicesDeviceIdSmartHomeCategoriesGet200Response: () => V2DevicesDeviceIdSmartHomeCategoriesGet200Response
});
module.exports = __toCommonJS(V2DevicesDeviceIdSmartHomeCategoriesGet200Response_exports);
const _V2DevicesDeviceIdSmartHomeCategoriesGet200Response = class {
  static getAttributeTypeMap() {
    return _V2DevicesDeviceIdSmartHomeCategoriesGet200Response.attributeTypeMap;
  }
  constructor() {
  }
};
let V2DevicesDeviceIdSmartHomeCategoriesGet200Response = _V2DevicesDeviceIdSmartHomeCategoriesGet200Response;
V2DevicesDeviceIdSmartHomeCategoriesGet200Response.discriminator = void 0;
V2DevicesDeviceIdSmartHomeCategoriesGet200Response.attributeTypeMap = [
  {
    name: "shEnergyMetered",
    baseName: "sh-energyMetered",
    type: "boolean",
    format: ""
  },
  {
    name: "shHwBoost",
    baseName: "sh-hwBoost",
    type: "boolean",
    format: ""
  },
  {
    name: "shHwTemp",
    baseName: "sh-hwTemp",
    type: "boolean",
    format: ""
  },
  {
    name: "shIndoorCO2",
    baseName: "sh-indoorCO2",
    type: "boolean",
    format: ""
  },
  {
    name: "shIndoorHumidity",
    baseName: "sh-indoorHumidity",
    type: "boolean",
    format: ""
  },
  {
    name: "shIndoorSpHeat",
    baseName: "sh-indoorSpHeat",
    type: "boolean",
    format: ""
  },
  {
    name: "shIndoorSpCool",
    baseName: "sh-indoorSpCool",
    type: "boolean",
    format: ""
  },
  {
    name: "shIndoorSpOffsHeat",
    baseName: "sh-indoorSpOffsHeat",
    type: "boolean",
    format: ""
  },
  {
    name: "shIndoorSpOffsCool",
    baseName: "sh-indoorSpOffsCool",
    type: "boolean",
    format: ""
  },
  {
    name: "shIndoorTemp",
    baseName: "sh-indoorTemp",
    type: "boolean",
    format: ""
  },
  {
    name: "shOutdoorTemp",
    baseName: "sh-outdoorTemp",
    type: "boolean",
    format: ""
  },
  {
    name: "shPoolTemp",
    baseName: "sh-poolTemp",
    type: "boolean",
    format: ""
  },
  {
    name: "shReturnTemp",
    baseName: "sh-returnTemp",
    type: "boolean",
    format: ""
  },
  {
    name: "shSmartMode",
    baseName: "sh-smartMode",
    type: "boolean",
    format: ""
  },
  {
    name: "shSolarEnergyProducedDay",
    baseName: "sh-solarEnergyProducedDay",
    type: "boolean",
    format: ""
  },
  {
    name: "shSolarEnergyProducedWeek",
    baseName: "sh-solarEnergyProducedWeek",
    type: "boolean",
    format: ""
  },
  {
    name: "shSolarEnergyProducedMonth",
    baseName: "sh-solarEnergyProducedMonth",
    type: "boolean",
    format: ""
  },
  {
    name: "shSolarEnergyProducedYear",
    baseName: "sh-solarEnergyProducedYear",
    type: "boolean",
    format: ""
  },
  {
    name: "shSolarEnergyProducedTotal",
    baseName: "sh-solarEnergyProducedTotal",
    type: "boolean",
    format: ""
  },
  {
    name: "shSupplyTemp",
    baseName: "sh-supplyTemp",
    type: "boolean",
    format: ""
  },
  {
    name: "shVentBoost",
    baseName: "sh-ventBoost",
    type: "boolean",
    format: ""
  },
  {
    name: "shVentMode",
    baseName: "sh-ventMode",
    type: "boolean",
    format: ""
  },
  {
    name: "shZones",
    baseName: "sh-zones",
    type: "boolean",
    format: ""
  },
  {
    name: "shZoneMode",
    baseName: "sh-zoneMode",
    type: "boolean",
    format: ""
  },
  {
    name: "shElectricPowerUsedCurrently",
    baseName: "sh-electricPowerUsedCurrently",
    type: "boolean",
    format: ""
  },
  {
    name: "shHwMode",
    baseName: "sh-hwMode",
    type: "boolean",
    format: ""
  },
  {
    name: "shIndoorCO2Sp",
    baseName: "sh-indoorCO2Sp",
    type: "boolean",
    format: ""
  },
  {
    name: "shIndoorHumiditySp",
    baseName: "sh-indoorHumiditySp",
    type: "boolean",
    format: ""
  },
  {
    name: "shPoolSp",
    baseName: "sh-poolSp",
    type: "boolean",
    format: ""
  },
  {
    name: "shSolarPowerAvailableCurrently",
    baseName: "sh-solarPowerAvailableCurrently",
    type: "boolean",
    format: ""
  },
  {
    name: "shElectricalPriceMode",
    baseName: "sh-electricalPriceMode",
    type: "boolean",
    format: ""
  },
  {
    name: "shElectricalPriceModeDuration",
    baseName: "sh-electricalPriceModeDuration",
    type: "boolean",
    format: ""
  },
  {
    name: "shIndoorHumidityMode",
    baseName: "sh-indoorHumidityMode",
    type: "boolean",
    format: ""
  },
  {
    name: "shIndoorDeHumiditySp",
    baseName: "sh-indoorDeHumiditySp",
    type: "boolean",
    format: ""
  },
  {
    name: "shFanMode",
    baseName: "sh-fanMode",
    type: "boolean",
    format: ""
  },
  {
    name: "shFanStatus",
    baseName: "sh-fanStatus",
    type: "boolean",
    format: ""
  },
  {
    name: "shEnergyStateOfCharge",
    baseName: "sh-energyStateOfCharge",
    type: "boolean",
    format: ""
  },
  {
    name: "shEnergyMeteredDay",
    baseName: "sh-energyMeteredDay",
    type: "boolean",
    format: ""
  },
  {
    name: "shEnergyMeteredMonth",
    baseName: "sh-energyMeteredMonth",
    type: "boolean",
    format: ""
  },
  {
    name: "shEnergyMeteredYear",
    baseName: "sh-energyMeteredYear",
    type: "boolean",
    format: ""
  },
  {
    name: "shElectricalPriceNextLow",
    baseName: "sh-electricalPriceNextLow",
    type: "boolean",
    format: ""
  },
  {
    name: "shElectricalPriceNextHigh",
    baseName: "sh-electricalPriceNextHigh",
    type: "boolean",
    format: ""
  },
  {
    name: "shHeatMode",
    baseName: "sh-heatMode",
    type: "boolean",
    format: ""
  },
  {
    name: "shHeatBoost",
    baseName: "sh-heatBoost",
    type: "boolean",
    format: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  V2DevicesDeviceIdSmartHomeCategoriesGet200Response
});
//# sourceMappingURL=V2DevicesDeviceIdSmartHomeCategoriesGet200Response.js.map
