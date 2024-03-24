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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ObjectSerializer_exports = {};
__export(ObjectSerializer_exports, {
  ObjectSerializer: () => ObjectSerializer
});
module.exports = __toCommonJS(ObjectSerializer_exports);
__reExport(ObjectSerializer_exports, require("../models/Address"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/AddressResponseModel"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/AggregationMethod"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/AggregationUnit"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/AidMode"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/AidModeResponseModel"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/Alarm"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/AlarmSeverity"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/AlarmStatus"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/AlarmsPaged"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/AvailableMethods"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/CloudToDeviceMethodResult"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/Country"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/Curve"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/DataPoint"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/DeviceCategoriesModel"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/DeviceCategory"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/DeviceCategoryModel"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/DeviceConnectionState"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/DeviceFirmwareInfoResponse"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/DeviceInfoResponseModel"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/DeviceInfoResponseModelPagedResult"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/DeviceInfoSyncResponseModel"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/DeviceParameterData"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/DevicePremiumResponse"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/DeviceResponseModel"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/EnumValues"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/FirmwareResponseModel"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/GroupedDeviceParameterData"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/LimitedUserProfile"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/PagedSystemResult"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/ParameterData"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/ParameterDetail"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/PatchSystemModel"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/PremiumFeatureResponseModel"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/PremiumFeatures"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/Product"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/ProductRegistrationAddress"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/ProductRegistrationResponse"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/ProductRegistrationResponseWithAddress"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/ProductResponseModel"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/Properties"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/Reported"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/ReportedFirmware"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/SearchGroupSSG"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/SecurityLevel"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/SmartHomeModeModel"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/SmartMode"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/SpotPriceDeliveryModel"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/SsqGroupDevice"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/Status"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/StoreSet"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/StoreSetEntry"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/SystemDevice"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/SystemWithDevices"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/UpdateGroupRequest"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/UserWithAddress"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/V2DevicesDeviceIdSmartHomeCategoriesGet200Response"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/VoucherManyRequest"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/VoucherSingleRequest"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/VoucherType"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/ZonePatchRequest"), module.exports);
__reExport(ObjectSerializer_exports, require("../models/ZoneResponse"), module.exports);
var import_Address = require("../models/Address");
var import_AddressResponseModel = require("../models/AddressResponseModel");
var import_AidModeResponseModel = require("../models/AidModeResponseModel");
var import_Alarm = require("../models/Alarm");
var import_AlarmStatus = require("../models/AlarmStatus");
var import_AlarmsPaged = require("../models/AlarmsPaged");
var import_AvailableMethods = require("../models/AvailableMethods");
var import_CloudToDeviceMethodResult = require("../models/CloudToDeviceMethodResult");
var import_Country = require("../models/Country");
var import_Curve = require("../models/Curve");
var import_DataPoint = require("../models/DataPoint");
var import_DeviceCategoriesModel = require("../models/DeviceCategoriesModel");
var import_DeviceCategory = require("../models/DeviceCategory");
var import_DeviceCategoryModel = require("../models/DeviceCategoryModel");
var import_DeviceFirmwareInfoResponse = require("../models/DeviceFirmwareInfoResponse");
var import_DeviceInfoResponseModel = require("../models/DeviceInfoResponseModel");
var import_DeviceInfoResponseModelPagedResult = require("../models/DeviceInfoResponseModelPagedResult");
var import_DeviceInfoSyncResponseModel = require("../models/DeviceInfoSyncResponseModel");
var import_DeviceParameterData = require("../models/DeviceParameterData");
var import_DevicePremiumResponse = require("../models/DevicePremiumResponse");
var import_DeviceResponseModel = require("../models/DeviceResponseModel");
var import_EnumValues = require("../models/EnumValues");
var import_FirmwareResponseModel = require("../models/FirmwareResponseModel");
var import_GroupedDeviceParameterData = require("../models/GroupedDeviceParameterData");
var import_LimitedUserProfile = require("../models/LimitedUserProfile");
var import_PagedSystemResult = require("../models/PagedSystemResult");
var import_ParameterData = require("../models/ParameterData");
var import_ParameterDetail = require("../models/ParameterDetail");
var import_PatchSystemModel = require("../models/PatchSystemModel");
var import_PremiumFeatureResponseModel = require("../models/PremiumFeatureResponseModel");
var import_Product = require("../models/Product");
var import_ProductRegistrationAddress = require("../models/ProductRegistrationAddress");
var import_ProductRegistrationResponse = require("../models/ProductRegistrationResponse");
var import_ProductRegistrationResponseWithAddress = require("../models/ProductRegistrationResponseWithAddress");
var import_ProductResponseModel = require("../models/ProductResponseModel");
var import_Properties = require("../models/Properties");
var import_Reported = require("../models/Reported");
var import_ReportedFirmware = require("../models/ReportedFirmware");
var import_SearchGroupSSG = require("../models/SearchGroupSSG");
var import_SmartHomeModeModel = require("../models/SmartHomeModeModel");
var import_SpotPriceDeliveryModel = require("../models/SpotPriceDeliveryModel");
var import_SsqGroupDevice = require("../models/SsqGroupDevice");
var import_StoreSet = require("../models/StoreSet");
var import_StoreSetEntry = require("../models/StoreSetEntry");
var import_SystemDevice = require("../models/SystemDevice");
var import_SystemWithDevices = require("../models/SystemWithDevices");
var import_UpdateGroupRequest = require("../models/UpdateGroupRequest");
var import_UserWithAddress = require("../models/UserWithAddress");
var import_V2DevicesDeviceIdSmartHomeCategoriesGet200Response = require("../models/V2DevicesDeviceIdSmartHomeCategoriesGet200Response");
var import_VoucherManyRequest = require("../models/VoucherManyRequest");
var import_VoucherSingleRequest = require("../models/VoucherSingleRequest");
var import_ZonePatchRequest = require("../models/ZonePatchRequest");
var import_ZoneResponse = require("../models/ZoneResponse");
const primitives = ["string", "boolean", "double", "integer", "long", "float", "number", "any"];
const supportedMediaTypes = {
  "application/json": Infinity,
  "application/json-patch+json": 1,
  "application/merge-patch+json": 1,
  "application/strategic-merge-patch+json": 1,
  "application/octet-stream": 0,
  "application/x-www-form-urlencoded": 0
};
const enumsMap = /* @__PURE__ */ new Set([
  "AggregationMethod",
  "AggregationUnit",
  "AidMode",
  "AlarmSeverity",
  "DeviceConnectionState",
  "PremiumFeatures",
  "SecurityLevel",
  "SmartMode",
  "Status",
  "VoucherType"
]);
const typeMap = {
  Address: import_Address.Address,
  AddressResponseModel: import_AddressResponseModel.AddressResponseModel,
  AidModeResponseModel: import_AidModeResponseModel.AidModeResponseModel,
  Alarm: import_Alarm.Alarm,
  AlarmStatus: import_AlarmStatus.AlarmStatus,
  AlarmsPaged: import_AlarmsPaged.AlarmsPaged,
  AvailableMethods: import_AvailableMethods.AvailableMethods,
  CloudToDeviceMethodResult: import_CloudToDeviceMethodResult.CloudToDeviceMethodResult,
  Country: import_Country.Country,
  Curve: import_Curve.Curve,
  DataPoint: import_DataPoint.DataPoint,
  DeviceCategoriesModel: import_DeviceCategoriesModel.DeviceCategoriesModel,
  DeviceCategory: import_DeviceCategory.DeviceCategory,
  DeviceCategoryModel: import_DeviceCategoryModel.DeviceCategoryModel,
  DeviceFirmwareInfoResponse: import_DeviceFirmwareInfoResponse.DeviceFirmwareInfoResponse,
  DeviceInfoResponseModel: import_DeviceInfoResponseModel.DeviceInfoResponseModel,
  DeviceInfoResponseModelPagedResult: import_DeviceInfoResponseModelPagedResult.DeviceInfoResponseModelPagedResult,
  DeviceInfoSyncResponseModel: import_DeviceInfoSyncResponseModel.DeviceInfoSyncResponseModel,
  DeviceParameterData: import_DeviceParameterData.DeviceParameterData,
  DevicePremiumResponse: import_DevicePremiumResponse.DevicePremiumResponse,
  DeviceResponseModel: import_DeviceResponseModel.DeviceResponseModel,
  EnumValues: import_EnumValues.EnumValues,
  FirmwareResponseModel: import_FirmwareResponseModel.FirmwareResponseModel,
  GroupedDeviceParameterData: import_GroupedDeviceParameterData.GroupedDeviceParameterData,
  LimitedUserProfile: import_LimitedUserProfile.LimitedUserProfile,
  PagedSystemResult: import_PagedSystemResult.PagedSystemResult,
  ParameterData: import_ParameterData.ParameterData,
  ParameterDetail: import_ParameterDetail.ParameterDetail,
  PatchSystemModel: import_PatchSystemModel.PatchSystemModel,
  PremiumFeatureResponseModel: import_PremiumFeatureResponseModel.PremiumFeatureResponseModel,
  Product: import_Product.Product,
  ProductRegistrationAddress: import_ProductRegistrationAddress.ProductRegistrationAddress,
  ProductRegistrationResponse: import_ProductRegistrationResponse.ProductRegistrationResponse,
  ProductRegistrationResponseWithAddress: import_ProductRegistrationResponseWithAddress.ProductRegistrationResponseWithAddress,
  ProductResponseModel: import_ProductResponseModel.ProductResponseModel,
  Properties: import_Properties.Properties,
  Reported: import_Reported.Reported,
  ReportedFirmware: import_ReportedFirmware.ReportedFirmware,
  SearchGroupSSG: import_SearchGroupSSG.SearchGroupSSG,
  SmartHomeModeModel: import_SmartHomeModeModel.SmartHomeModeModel,
  SpotPriceDeliveryModel: import_SpotPriceDeliveryModel.SpotPriceDeliveryModel,
  SsqGroupDevice: import_SsqGroupDevice.SsqGroupDevice,
  StoreSet: import_StoreSet.StoreSet,
  StoreSetEntry: import_StoreSetEntry.StoreSetEntry,
  SystemDevice: import_SystemDevice.SystemDevice,
  SystemWithDevices: import_SystemWithDevices.SystemWithDevices,
  UpdateGroupRequest: import_UpdateGroupRequest.UpdateGroupRequest,
  UserWithAddress: import_UserWithAddress.UserWithAddress,
  V2DevicesDeviceIdSmartHomeCategoriesGet200Response: import_V2DevicesDeviceIdSmartHomeCategoriesGet200Response.V2DevicesDeviceIdSmartHomeCategoriesGet200Response,
  VoucherManyRequest: import_VoucherManyRequest.VoucherManyRequest,
  VoucherSingleRequest: import_VoucherSingleRequest.VoucherSingleRequest,
  ZonePatchRequest: import_ZonePatchRequest.ZonePatchRequest,
  ZoneResponse: import_ZoneResponse.ZoneResponse
};
class ObjectSerializer {
  static findCorrectType(data, expectedType) {
    if (data == void 0) {
      return expectedType;
    } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
      return expectedType;
    } else if (expectedType === "Date") {
      return expectedType;
    } else {
      if (enumsMap.has(expectedType)) {
        return expectedType;
      }
      if (!typeMap[expectedType]) {
        return expectedType;
      }
      const discriminatorProperty = typeMap[expectedType].discriminator;
      if (discriminatorProperty == null) {
        return expectedType;
      } else {
        if (data[discriminatorProperty]) {
          const discriminatorType = data[discriminatorProperty];
          if (typeMap[discriminatorType]) {
            return discriminatorType;
          } else {
            return expectedType;
          }
        } else {
          return expectedType;
        }
      }
    }
  }
  static serialize(data, type, format) {
    if (data == void 0) {
      return data;
    } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
      return data;
    } else if (type.lastIndexOf("Array<", 0) === 0) {
      let subType = type.replace("Array<", "");
      subType = subType.substring(0, subType.length - 1);
      const transformedData = [];
      for (const date of data) {
        transformedData.push(ObjectSerializer.serialize(date, subType, format));
      }
      return transformedData;
    } else if (type === "Date") {
      if (format == "date") {
        let month = data.getMonth() + 1;
        month = month < 10 ? "0" + month.toString() : month.toString();
        let day = data.getDate();
        day = day < 10 ? "0" + day.toString() : day.toString();
        return data.getFullYear() + "-" + month + "-" + day;
      } else {
        return data.toISOString();
      }
    } else {
      if (enumsMap.has(type)) {
        return data;
      }
      if (!typeMap[type]) {
        return data;
      }
      type = this.findCorrectType(data, type);
      const attributeTypes = typeMap[type].getAttributeTypeMap();
      const instance = {};
      for (const attributeType of attributeTypes) {
        instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type, attributeType.format);
      }
      return instance;
    }
  }
  static deserialize(data, type, format) {
    type = ObjectSerializer.findCorrectType(data, type);
    if (data == void 0) {
      return data;
    } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
      return data;
    } else if (type.lastIndexOf("Array<", 0) === 0) {
      let subType = type.replace("Array<", "");
      subType = subType.substring(0, subType.length - 1);
      const transformedData = [];
      for (const date of data) {
        transformedData.push(ObjectSerializer.deserialize(date, subType, format));
      }
      return transformedData;
    } else if (type === "Date") {
      return new Date(data);
    } else {
      if (enumsMap.has(type)) {
        return data;
      }
      if (!typeMap[type]) {
        return data;
      }
      const instance = new typeMap[type]();
      const attributeTypes = typeMap[type].getAttributeTypeMap();
      for (const attributeType of attributeTypes) {
        const value = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type, attributeType.format);
        if (value !== void 0) {
          instance[attributeType.name] = value;
        }
      }
      return instance;
    }
  }
  /**
   * Normalize media type
   *
   * We currently do not handle any media types attributes, i.e. anything
   * after a semicolon. All content is assumed to be UTF-8 compatible.
   */
  static normalizeMediaType(mediaType) {
    if (mediaType === void 0) {
      return void 0;
    }
    return mediaType.split(";")[0].trim().toLowerCase();
  }
  /**
   * From a list of possible media types, choose the one we can handle best.
   *
   * The order of the given media types does not have any impact on the choice
   * made.
   */
  static getPreferredMediaType(mediaTypes) {
    if (mediaTypes.length === 0) {
      return "application/json";
    }
    const normalMediaTypes = mediaTypes.map(this.normalizeMediaType);
    let selectedMediaType = void 0;
    let selectedRank = -Infinity;
    for (const mediaType of normalMediaTypes) {
      if (supportedMediaTypes[mediaType] > selectedRank) {
        selectedMediaType = mediaType;
        selectedRank = supportedMediaTypes[mediaType];
      }
    }
    if (selectedMediaType === void 0) {
      throw new Error("None of the given media types are supported: " + mediaTypes.join(", "));
    }
    return selectedMediaType;
  }
  /**
   * Convert data to a string according the given media type
   */
  static stringify(data, mediaType) {
    if (mediaType === "text/plain") {
      return String(data);
    }
    if (mediaType === "application/json" || mediaType === "application/json-patch+json" || mediaType === "application/merge-patch+json" || mediaType === "application/strategic-merge-patch+json") {
      return JSON.stringify(data);
    }
    throw new Error("The mediaType " + mediaType + " is not supported by ObjectSerializer.stringify.");
  }
  /**
   * Parse data from a string according to the given media type
   */
  static parse(rawData, mediaType) {
    if (mediaType === void 0) {
      throw new Error("Cannot parse content. No Content-Type defined.");
    }
    if (mediaType === "text/plain") {
      return rawData;
    }
    if (mediaType === "application/json" || mediaType === "application/json-patch+json" || mediaType === "application/merge-patch+json" || mediaType === "application/strategic-merge-patch+json") {
      return JSON.parse(rawData);
    }
    if (mediaType === "text/html") {
      return rawData;
    }
    throw new Error("The mediaType " + mediaType + " is not supported by ObjectSerializer.parse.");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ObjectSerializer,
  ...require("../models/Address"),
  ...require("../models/AddressResponseModel"),
  ...require("../models/AggregationMethod"),
  ...require("../models/AggregationUnit"),
  ...require("../models/AidMode"),
  ...require("../models/AidModeResponseModel"),
  ...require("../models/Alarm"),
  ...require("../models/AlarmSeverity"),
  ...require("../models/AlarmStatus"),
  ...require("../models/AlarmsPaged"),
  ...require("../models/AvailableMethods"),
  ...require("../models/CloudToDeviceMethodResult"),
  ...require("../models/Country"),
  ...require("../models/Curve"),
  ...require("../models/DataPoint"),
  ...require("../models/DeviceCategoriesModel"),
  ...require("../models/DeviceCategory"),
  ...require("../models/DeviceCategoryModel"),
  ...require("../models/DeviceConnectionState"),
  ...require("../models/DeviceFirmwareInfoResponse"),
  ...require("../models/DeviceInfoResponseModel"),
  ...require("../models/DeviceInfoResponseModelPagedResult"),
  ...require("../models/DeviceInfoSyncResponseModel"),
  ...require("../models/DeviceParameterData"),
  ...require("../models/DevicePremiumResponse"),
  ...require("../models/DeviceResponseModel"),
  ...require("../models/EnumValues"),
  ...require("../models/FirmwareResponseModel"),
  ...require("../models/GroupedDeviceParameterData"),
  ...require("../models/LimitedUserProfile"),
  ...require("../models/PagedSystemResult"),
  ...require("../models/ParameterData"),
  ...require("../models/ParameterDetail"),
  ...require("../models/PatchSystemModel"),
  ...require("../models/PremiumFeatureResponseModel"),
  ...require("../models/PremiumFeatures"),
  ...require("../models/Product"),
  ...require("../models/ProductRegistrationAddress"),
  ...require("../models/ProductRegistrationResponse"),
  ...require("../models/ProductRegistrationResponseWithAddress"),
  ...require("../models/ProductResponseModel"),
  ...require("../models/Properties"),
  ...require("../models/Reported"),
  ...require("../models/ReportedFirmware"),
  ...require("../models/SearchGroupSSG"),
  ...require("../models/SecurityLevel"),
  ...require("../models/SmartHomeModeModel"),
  ...require("../models/SmartMode"),
  ...require("../models/SpotPriceDeliveryModel"),
  ...require("../models/SsqGroupDevice"),
  ...require("../models/Status"),
  ...require("../models/StoreSet"),
  ...require("../models/StoreSetEntry"),
  ...require("../models/SystemDevice"),
  ...require("../models/SystemWithDevices"),
  ...require("../models/UpdateGroupRequest"),
  ...require("../models/UserWithAddress"),
  ...require("../models/V2DevicesDeviceIdSmartHomeCategoriesGet200Response"),
  ...require("../models/VoucherManyRequest"),
  ...require("../models/VoucherSingleRequest"),
  ...require("../models/VoucherType"),
  ...require("../models/ZonePatchRequest"),
  ...require("../models/ZoneResponse")
});
//# sourceMappingURL=ObjectSerializer.js.map
