"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectSerializer = void 0;
__exportStar(require("../models/Address"), exports);
__exportStar(require("../models/AddressResponseModel"), exports);
__exportStar(require("../models/AggregationMethod"), exports);
__exportStar(require("../models/AggregationUnit"), exports);
__exportStar(require("../models/AidMode"), exports);
__exportStar(require("../models/AidModeResponseModel"), exports);
__exportStar(require("../models/Alarm"), exports);
__exportStar(require("../models/AlarmSeverity"), exports);
__exportStar(require("../models/AlarmStatus"), exports);
__exportStar(require("../models/AlarmsPaged"), exports);
__exportStar(require("../models/AvailableMethods"), exports);
__exportStar(require("../models/CloudToDeviceMethodResult"), exports);
__exportStar(require("../models/Country"), exports);
__exportStar(require("../models/Curve"), exports);
__exportStar(require("../models/DataPoint"), exports);
__exportStar(require("../models/DeviceCategoriesModel"), exports);
__exportStar(require("../models/DeviceCategory"), exports);
__exportStar(require("../models/DeviceCategoryModel"), exports);
__exportStar(require("../models/DeviceConnectionState"), exports);
__exportStar(require("../models/DeviceFirmwareInfoResponse"), exports);
__exportStar(require("../models/DeviceInfoResponseModel"), exports);
__exportStar(require("../models/DeviceInfoResponseModelPagedResult"), exports);
__exportStar(require("../models/DeviceInfoSyncResponseModel"), exports);
__exportStar(require("../models/DeviceParameterData"), exports);
__exportStar(require("../models/DevicePremiumResponse"), exports);
__exportStar(require("../models/DeviceResponseModel"), exports);
__exportStar(require("../models/EnumValues"), exports);
__exportStar(require("../models/FirmwareResponseModel"), exports);
__exportStar(require("../models/GroupedDeviceParameterData"), exports);
__exportStar(require("../models/LimitedUserProfile"), exports);
__exportStar(require("../models/PagedSystemResult"), exports);
__exportStar(require("../models/ParameterData"), exports);
__exportStar(require("../models/ParameterDetail"), exports);
__exportStar(require("../models/PatchSystemModel"), exports);
__exportStar(require("../models/PremiumFeatureResponseModel"), exports);
__exportStar(require("../models/PremiumFeatures"), exports);
__exportStar(require("../models/Product"), exports);
__exportStar(require("../models/ProductRegistrationAddress"), exports);
__exportStar(require("../models/ProductRegistrationResponse"), exports);
__exportStar(require("../models/ProductRegistrationResponseWithAddress"), exports);
__exportStar(require("../models/ProductResponseModel"), exports);
__exportStar(require("../models/Properties"), exports);
__exportStar(require("../models/Reported"), exports);
__exportStar(require("../models/ReportedFirmware"), exports);
__exportStar(require("../models/SearchGroupSSG"), exports);
__exportStar(require("../models/SecurityLevel"), exports);
__exportStar(require("../models/SmartHomeModeModel"), exports);
__exportStar(require("../models/SmartMode"), exports);
__exportStar(require("../models/SpotPriceDeliveryModel"), exports);
__exportStar(require("../models/SsqGroupDevice"), exports);
__exportStar(require("../models/Status"), exports);
__exportStar(require("../models/StoreSet"), exports);
__exportStar(require("../models/StoreSetEntry"), exports);
__exportStar(require("../models/SystemDevice"), exports);
__exportStar(require("../models/SystemWithDevices"), exports);
__exportStar(require("../models/UpdateGroupRequest"), exports);
__exportStar(require("../models/UserWithAddress"), exports);
__exportStar(require("../models/V2DevicesDeviceIdSmartHomeCategoriesGet200Response"), exports);
__exportStar(require("../models/VoucherManyRequest"), exports);
__exportStar(require("../models/VoucherSingleRequest"), exports);
__exportStar(require("../models/VoucherType"), exports);
__exportStar(require("../models/ZonePatchRequest"), exports);
__exportStar(require("../models/ZoneResponse"), exports);
const Address_1 = require("../models/Address");
const AddressResponseModel_1 = require("../models/AddressResponseModel");
const AidModeResponseModel_1 = require("../models/AidModeResponseModel");
const Alarm_1 = require("../models/Alarm");
const AlarmStatus_1 = require("../models/AlarmStatus");
const AlarmsPaged_1 = require("../models/AlarmsPaged");
const AvailableMethods_1 = require("../models/AvailableMethods");
const CloudToDeviceMethodResult_1 = require("../models/CloudToDeviceMethodResult");
const Country_1 = require("../models/Country");
const Curve_1 = require("../models/Curve");
const DataPoint_1 = require("../models/DataPoint");
const DeviceCategoriesModel_1 = require("../models/DeviceCategoriesModel");
const DeviceCategory_1 = require("../models/DeviceCategory");
const DeviceCategoryModel_1 = require("../models/DeviceCategoryModel");
const DeviceFirmwareInfoResponse_1 = require("../models/DeviceFirmwareInfoResponse");
const DeviceInfoResponseModel_1 = require("../models/DeviceInfoResponseModel");
const DeviceInfoResponseModelPagedResult_1 = require("../models/DeviceInfoResponseModelPagedResult");
const DeviceInfoSyncResponseModel_1 = require("../models/DeviceInfoSyncResponseModel");
const DeviceParameterData_1 = require("../models/DeviceParameterData");
const DevicePremiumResponse_1 = require("../models/DevicePremiumResponse");
const DeviceResponseModel_1 = require("../models/DeviceResponseModel");
const EnumValues_1 = require("../models/EnumValues");
const FirmwareResponseModel_1 = require("../models/FirmwareResponseModel");
const GroupedDeviceParameterData_1 = require("../models/GroupedDeviceParameterData");
const LimitedUserProfile_1 = require("../models/LimitedUserProfile");
const PagedSystemResult_1 = require("../models/PagedSystemResult");
const ParameterData_1 = require("../models/ParameterData");
const ParameterDetail_1 = require("../models/ParameterDetail");
const PatchSystemModel_1 = require("../models/PatchSystemModel");
const PremiumFeatureResponseModel_1 = require("../models/PremiumFeatureResponseModel");
const Product_1 = require("../models/Product");
const ProductRegistrationAddress_1 = require("../models/ProductRegistrationAddress");
const ProductRegistrationResponse_1 = require("../models/ProductRegistrationResponse");
const ProductRegistrationResponseWithAddress_1 = require("../models/ProductRegistrationResponseWithAddress");
const ProductResponseModel_1 = require("../models/ProductResponseModel");
const Properties_1 = require("../models/Properties");
const Reported_1 = require("../models/Reported");
const ReportedFirmware_1 = require("../models/ReportedFirmware");
const SearchGroupSSG_1 = require("../models/SearchGroupSSG");
const SmartHomeModeModel_1 = require("../models/SmartHomeModeModel");
const SpotPriceDeliveryModel_1 = require("../models/SpotPriceDeliveryModel");
const SsqGroupDevice_1 = require("../models/SsqGroupDevice");
const StoreSet_1 = require("../models/StoreSet");
const StoreSetEntry_1 = require("../models/StoreSetEntry");
const SystemDevice_1 = require("../models/SystemDevice");
const SystemWithDevices_1 = require("../models/SystemWithDevices");
const UpdateGroupRequest_1 = require("../models/UpdateGroupRequest");
const UserWithAddress_1 = require("../models/UserWithAddress");
const V2DevicesDeviceIdSmartHomeCategoriesGet200Response_1 = require("../models/V2DevicesDeviceIdSmartHomeCategoriesGet200Response");
const VoucherManyRequest_1 = require("../models/VoucherManyRequest");
const VoucherSingleRequest_1 = require("../models/VoucherSingleRequest");
const ZonePatchRequest_1 = require("../models/ZonePatchRequest");
const ZoneResponse_1 = require("../models/ZoneResponse");
/* tslint:disable:no-unused-variable */
const primitives = ['string', 'boolean', 'double', 'integer', 'long', 'float', 'number', 'any'];
const supportedMediaTypes = {
    'application/json': Infinity,
    'application/json-patch+json': 1,
    'application/merge-patch+json': 1,
    'application/strategic-merge-patch+json': 1,
    'application/octet-stream': 0,
    'application/x-www-form-urlencoded': 0,
};
const enumsMap = new Set([
    'AggregationMethod',
    'AggregationUnit',
    'AidMode',
    'AlarmSeverity',
    'DeviceConnectionState',
    'PremiumFeatures',
    'SecurityLevel',
    'SmartMode',
    'Status',
    'VoucherType',
]);
const typeMap = {
    Address: Address_1.Address,
    AddressResponseModel: AddressResponseModel_1.AddressResponseModel,
    AidModeResponseModel: AidModeResponseModel_1.AidModeResponseModel,
    Alarm: Alarm_1.Alarm,
    AlarmStatus: AlarmStatus_1.AlarmStatus,
    AlarmsPaged: AlarmsPaged_1.AlarmsPaged,
    AvailableMethods: AvailableMethods_1.AvailableMethods,
    CloudToDeviceMethodResult: CloudToDeviceMethodResult_1.CloudToDeviceMethodResult,
    Country: Country_1.Country,
    Curve: Curve_1.Curve,
    DataPoint: DataPoint_1.DataPoint,
    DeviceCategoriesModel: DeviceCategoriesModel_1.DeviceCategoriesModel,
    DeviceCategory: DeviceCategory_1.DeviceCategory,
    DeviceCategoryModel: DeviceCategoryModel_1.DeviceCategoryModel,
    DeviceFirmwareInfoResponse: DeviceFirmwareInfoResponse_1.DeviceFirmwareInfoResponse,
    DeviceInfoResponseModel: DeviceInfoResponseModel_1.DeviceInfoResponseModel,
    DeviceInfoResponseModelPagedResult: DeviceInfoResponseModelPagedResult_1.DeviceInfoResponseModelPagedResult,
    DeviceInfoSyncResponseModel: DeviceInfoSyncResponseModel_1.DeviceInfoSyncResponseModel,
    DeviceParameterData: DeviceParameterData_1.DeviceParameterData,
    DevicePremiumResponse: DevicePremiumResponse_1.DevicePremiumResponse,
    DeviceResponseModel: DeviceResponseModel_1.DeviceResponseModel,
    EnumValues: EnumValues_1.EnumValues,
    FirmwareResponseModel: FirmwareResponseModel_1.FirmwareResponseModel,
    GroupedDeviceParameterData: GroupedDeviceParameterData_1.GroupedDeviceParameterData,
    LimitedUserProfile: LimitedUserProfile_1.LimitedUserProfile,
    PagedSystemResult: PagedSystemResult_1.PagedSystemResult,
    ParameterData: ParameterData_1.ParameterData,
    ParameterDetail: ParameterDetail_1.ParameterDetail,
    PatchSystemModel: PatchSystemModel_1.PatchSystemModel,
    PremiumFeatureResponseModel: PremiumFeatureResponseModel_1.PremiumFeatureResponseModel,
    Product: Product_1.Product,
    ProductRegistrationAddress: ProductRegistrationAddress_1.ProductRegistrationAddress,
    ProductRegistrationResponse: ProductRegistrationResponse_1.ProductRegistrationResponse,
    ProductRegistrationResponseWithAddress: ProductRegistrationResponseWithAddress_1.ProductRegistrationResponseWithAddress,
    ProductResponseModel: ProductResponseModel_1.ProductResponseModel,
    Properties: Properties_1.Properties,
    Reported: Reported_1.Reported,
    ReportedFirmware: ReportedFirmware_1.ReportedFirmware,
    SearchGroupSSG: SearchGroupSSG_1.SearchGroupSSG,
    SmartHomeModeModel: SmartHomeModeModel_1.SmartHomeModeModel,
    SpotPriceDeliveryModel: SpotPriceDeliveryModel_1.SpotPriceDeliveryModel,
    SsqGroupDevice: SsqGroupDevice_1.SsqGroupDevice,
    StoreSet: StoreSet_1.StoreSet,
    StoreSetEntry: StoreSetEntry_1.StoreSetEntry,
    SystemDevice: SystemDevice_1.SystemDevice,
    SystemWithDevices: SystemWithDevices_1.SystemWithDevices,
    UpdateGroupRequest: UpdateGroupRequest_1.UpdateGroupRequest,
    UserWithAddress: UserWithAddress_1.UserWithAddress,
    V2DevicesDeviceIdSmartHomeCategoriesGet200Response: V2DevicesDeviceIdSmartHomeCategoriesGet200Response_1.V2DevicesDeviceIdSmartHomeCategoriesGet200Response,
    VoucherManyRequest: VoucherManyRequest_1.VoucherManyRequest,
    VoucherSingleRequest: VoucherSingleRequest_1.VoucherSingleRequest,
    ZonePatchRequest: ZonePatchRequest_1.ZonePatchRequest,
    ZoneResponse: ZoneResponse_1.ZoneResponse,
};
class ObjectSerializer {
    static findCorrectType(data, expectedType) {
        if (data == undefined) {
            return expectedType;
        }
        else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        }
        else if (expectedType === 'Date') {
            return expectedType;
        }
        else {
            if (enumsMap.has(expectedType)) {
                return expectedType;
            }
            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }
            // Check the discriminator
            const discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            }
            else {
                if (data[discriminatorProperty]) {
                    const discriminatorType = data[discriminatorProperty];
                    if (typeMap[discriminatorType]) {
                        return discriminatorType; // use the type given in the discriminator
                    }
                    else {
                        return expectedType; // discriminator did not map to a type
                    }
                }
                else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }
    static serialize(data, type, format) {
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf('Array<', 0) === 0) {
            // string.startsWith pre es6
            let subType = type.replace('Array<', ''); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            const transformedData = [];
            for (const date of data) {
                transformedData.push(ObjectSerializer.serialize(date, subType, format));
            }
            return transformedData;
        }
        else if (type === 'Date') {
            if (format == 'date') {
                let month = data.getMonth() + 1;
                month = month < 10 ? '0' + month.toString() : month.toString();
                let day = data.getDate();
                day = day < 10 ? '0' + day.toString() : day.toString();
                return data.getFullYear() + '-' + month + '-' + day;
            }
            else {
                return data.toISOString();
            }
        }
        else {
            if (enumsMap.has(type)) {
                return data;
            }
            if (!typeMap[type]) {
                // in case we dont know the type
                return data;
            }
            // Get the actual type of this object
            type = this.findCorrectType(data, type);
            // get the map for the correct type.
            const attributeTypes = typeMap[type].getAttributeTypeMap();
            const instance = {};
            for (const attributeType of attributeTypes) {
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type, attributeType.format);
            }
            return instance;
        }
    }
    static deserialize(data, type, format) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf('Array<', 0) === 0) {
            // string.startsWith pre es6
            let subType = type.replace('Array<', ''); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            const transformedData = [];
            for (const date of data) {
                transformedData.push(ObjectSerializer.deserialize(date, subType, format));
            }
            return transformedData;
        }
        else if (type === 'Date') {
            return new Date(data);
        }
        else {
            if (enumsMap.has(type)) {
                // is Enum
                return data;
            }
            if (!typeMap[type]) {
                // dont know the type
                return data;
            }
            const instance = new typeMap[type]();
            const attributeTypes = typeMap[type].getAttributeTypeMap();
            for (const attributeType of attributeTypes) {
                const value = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type, attributeType.format);
                if (value !== undefined) {
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
        if (mediaType === undefined) {
            return undefined;
        }
        return mediaType.split(';')[0].trim().toLowerCase();
    }
    /**
     * From a list of possible media types, choose the one we can handle best.
     *
     * The order of the given media types does not have any impact on the choice
     * made.
     */
    static getPreferredMediaType(mediaTypes) {
        /** According to OAS 3 we should default to json */
        if (mediaTypes.length === 0) {
            return 'application/json';
        }
        const normalMediaTypes = mediaTypes.map(this.normalizeMediaType);
        let selectedMediaType = undefined;
        let selectedRank = -Infinity;
        for (const mediaType of normalMediaTypes) {
            if (supportedMediaTypes[mediaType] > selectedRank) {
                selectedMediaType = mediaType;
                selectedRank = supportedMediaTypes[mediaType];
            }
        }
        if (selectedMediaType === undefined) {
            throw new Error('None of the given media types are supported: ' + mediaTypes.join(', '));
        }
        return selectedMediaType;
    }
    /**
     * Convert data to a string according the given media type
     */
    static stringify(data, mediaType) {
        if (mediaType === 'text/plain') {
            return String(data);
        }
        if (mediaType === 'application/json' || mediaType === 'application/json-patch+json' || mediaType === 'application/merge-patch+json' || mediaType === 'application/strategic-merge-patch+json') {
            return JSON.stringify(data);
        }
        throw new Error('The mediaType ' + mediaType + ' is not supported by ObjectSerializer.stringify.');
    }
    /**
     * Parse data from a string according to the given media type
     */
    static parse(rawData, mediaType) {
        if (mediaType === undefined) {
            throw new Error('Cannot parse content. No Content-Type defined.');
        }
        if (mediaType === 'text/plain') {
            return rawData;
        }
        if (mediaType === 'application/json' || mediaType === 'application/json-patch+json' || mediaType === 'application/merge-patch+json' || mediaType === 'application/strategic-merge-patch+json') {
            return JSON.parse(rawData);
        }
        if (mediaType === 'text/html') {
            return rawData;
        }
        throw new Error('The mediaType ' + mediaType + ' is not supported by ObjectSerializer.parse.');
    }
}
exports.ObjectSerializer = ObjectSerializer;
//# sourceMappingURL=ObjectSerializer.js.map