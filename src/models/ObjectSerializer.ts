export * from '../models/Address';
export * from '../models/AddressResponseModel';
export * from '../models/AggregationMethod';
export * from '../models/AggregationUnit';
export * from '../models/AidMode';
export * from '../models/AidModeResponseModel';
export * from '../models/Alarm';
export * from '../models/AlarmSeverity';
export * from '../models/AlarmStatus';
export * from '../models/AlarmsPaged';
export * from '../models/AvailableMethods';
export * from '../models/CloudToDeviceMethodResult';
export * from '../models/Country';
export * from '../models/Curve';
export * from '../models/DataPoint';
export * from '../models/DeviceCategoriesModel';
export * from '../models/DeviceCategory';
export * from '../models/DeviceCategoryModel';
export * from '../models/DeviceConnectionState';
export * from '../models/DeviceFirmwareInfoResponse';
export * from '../models/DeviceInfoResponseModel';
export * from '../models/DeviceInfoResponseModelPagedResult';
export * from '../models/DeviceInfoSyncResponseModel';
export * from '../models/DeviceParameterData';
export * from '../models/DevicePremiumResponse';
export * from '../models/DeviceResponseModel';
export * from '../models/EnumValues';
export * from '../models/FirmwareResponseModel';
export * from '../models/GroupedDeviceParameterData';
export * from '../models/LimitedUserProfile';
export * from '../models/PagedSystemResult';
export * from '../models/ParameterData';
export * from '../models/ParameterDetail';
export * from '../models/PatchSystemModel';
export * from '../models/PremiumFeatureResponseModel';
export * from '../models/PremiumFeatures';
export * from '../models/Product';
export * from '../models/ProductRegistrationAddress';
export * from '../models/ProductRegistrationResponse';
export * from '../models/ProductRegistrationResponseWithAddress';
export * from '../models/ProductResponseModel';
export * from '../models/Properties';
export * from '../models/Reported';
export * from '../models/ReportedFirmware';
export * from '../models/SearchGroupSSG';
export * from '../models/SecurityLevel';
export * from '../models/SmartHomeModeModel';
export * from '../models/SmartMode';
export * from '../models/SpotPriceDeliveryModel';
export * from '../models/SsqGroupDevice';
export * from '../models/Status';
export * from '../models/StoreSet';
export * from '../models/StoreSetEntry';
export * from '../models/SystemDevice';
export * from '../models/SystemWithDevices';
export * from '../models/UpdateGroupRequest';
export * from '../models/UserWithAddress';
export * from '../models/V2DevicesDeviceIdSmartHomeCategoriesGet200Response';
export * from '../models/VoucherManyRequest';
export * from '../models/VoucherSingleRequest';
export * from '../models/VoucherType';
export * from '../models/ZonePatchRequest';
export * from '../models/ZoneResponse';

import { Address } from '../models/Address';
import { AddressResponseModel } from '../models/AddressResponseModel';
import { AidModeResponseModel } from '../models/AidModeResponseModel';
import { Alarm } from '../models/Alarm';
import { AlarmStatus } from '../models/AlarmStatus';
import { AlarmsPaged } from '../models/AlarmsPaged';
import { AvailableMethods } from '../models/AvailableMethods';
import { CloudToDeviceMethodResult } from '../models/CloudToDeviceMethodResult';
import { Country } from '../models/Country';
import { Curve } from '../models/Curve';
import { DataPoint } from '../models/DataPoint';
import { DeviceCategoriesModel } from '../models/DeviceCategoriesModel';
import { DeviceCategory } from '../models/DeviceCategory';
import { DeviceCategoryModel } from '../models/DeviceCategoryModel';
import { DeviceFirmwareInfoResponse } from '../models/DeviceFirmwareInfoResponse';
import { DeviceInfoResponseModel } from '../models/DeviceInfoResponseModel';
import { DeviceInfoResponseModelPagedResult } from '../models/DeviceInfoResponseModelPagedResult';
import { DeviceInfoSyncResponseModel } from '../models/DeviceInfoSyncResponseModel';
import { DeviceParameterData } from '../models/DeviceParameterData';
import { DevicePremiumResponse } from '../models/DevicePremiumResponse';
import { DeviceResponseModel } from '../models/DeviceResponseModel';
import { EnumValues } from '../models/EnumValues';
import { FirmwareResponseModel } from '../models/FirmwareResponseModel';
import { GroupedDeviceParameterData } from '../models/GroupedDeviceParameterData';
import { LimitedUserProfile } from '../models/LimitedUserProfile';
import { PagedSystemResult } from '../models/PagedSystemResult';
import { ParameterData } from '../models/ParameterData';
import { ParameterDetail } from '../models/ParameterDetail';
import { PatchSystemModel } from '../models/PatchSystemModel';
import { PremiumFeatureResponseModel } from '../models/PremiumFeatureResponseModel';
import { Product } from '../models/Product';
import { ProductRegistrationAddress } from '../models/ProductRegistrationAddress';
import { ProductRegistrationResponse } from '../models/ProductRegistrationResponse';
import { ProductRegistrationResponseWithAddress } from '../models/ProductRegistrationResponseWithAddress';
import { ProductResponseModel } from '../models/ProductResponseModel';
import { Properties } from '../models/Properties';
import { Reported } from '../models/Reported';
import { ReportedFirmware } from '../models/ReportedFirmware';
import { SearchGroupSSG } from '../models/SearchGroupSSG';
import { SmartHomeModeModel } from '../models/SmartHomeModeModel';
import { SpotPriceDeliveryModel } from '../models/SpotPriceDeliveryModel';
import { SsqGroupDevice } from '../models/SsqGroupDevice';
import { StoreSet } from '../models/StoreSet';
import { StoreSetEntry } from '../models/StoreSetEntry';
import { SystemDevice } from '../models/SystemDevice';
import { SystemWithDevices } from '../models/SystemWithDevices';
import { UpdateGroupRequest } from '../models/UpdateGroupRequest';
import { UserWithAddress } from '../models/UserWithAddress';
import { V2DevicesDeviceIdSmartHomeCategoriesGet200Response } from '../models/V2DevicesDeviceIdSmartHomeCategoriesGet200Response';
import { VoucherManyRequest } from '../models/VoucherManyRequest';
import { VoucherSingleRequest } from '../models/VoucherSingleRequest';
import { ZonePatchRequest } from '../models/ZonePatchRequest';
import { ZoneResponse } from '../models/ZoneResponse';

/* tslint:disable:no-unused-variable */
const primitives = ['string', 'boolean', 'double', 'integer', 'long', 'float', 'number', 'any'];

const supportedMediaTypes: { [mediaType: string]: number } = {
    'application/json': Infinity,
    'application/json-patch+json': 1,
    'application/merge-patch+json': 1,
    'application/strategic-merge-patch+json': 1,
    'application/octet-stream': 0,
    'application/x-www-form-urlencoded': 0,
};

const enumsMap: Set<string> = new Set<string>([
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

const typeMap: { [index: string]: any } = {
    Address: Address,
    AddressResponseModel: AddressResponseModel,
    AidModeResponseModel: AidModeResponseModel,
    Alarm: Alarm,
    AlarmStatus: AlarmStatus,
    AlarmsPaged: AlarmsPaged,
    AvailableMethods: AvailableMethods,
    CloudToDeviceMethodResult: CloudToDeviceMethodResult,
    Country: Country,
    Curve: Curve,
    DataPoint: DataPoint,
    DeviceCategoriesModel: DeviceCategoriesModel,
    DeviceCategory: DeviceCategory,
    DeviceCategoryModel: DeviceCategoryModel,
    DeviceFirmwareInfoResponse: DeviceFirmwareInfoResponse,
    DeviceInfoResponseModel: DeviceInfoResponseModel,
    DeviceInfoResponseModelPagedResult: DeviceInfoResponseModelPagedResult,
    DeviceInfoSyncResponseModel: DeviceInfoSyncResponseModel,
    DeviceParameterData: DeviceParameterData,
    DevicePremiumResponse: DevicePremiumResponse,
    DeviceResponseModel: DeviceResponseModel,
    EnumValues: EnumValues,
    FirmwareResponseModel: FirmwareResponseModel,
    GroupedDeviceParameterData: GroupedDeviceParameterData,
    LimitedUserProfile: LimitedUserProfile,
    PagedSystemResult: PagedSystemResult,
    ParameterData: ParameterData,
    ParameterDetail: ParameterDetail,
    PatchSystemModel: PatchSystemModel,
    PremiumFeatureResponseModel: PremiumFeatureResponseModel,
    Product: Product,
    ProductRegistrationAddress: ProductRegistrationAddress,
    ProductRegistrationResponse: ProductRegistrationResponse,
    ProductRegistrationResponseWithAddress: ProductRegistrationResponseWithAddress,
    ProductResponseModel: ProductResponseModel,
    Properties: Properties,
    Reported: Reported,
    ReportedFirmware: ReportedFirmware,
    SearchGroupSSG: SearchGroupSSG,
    SmartHomeModeModel: SmartHomeModeModel,
    SpotPriceDeliveryModel: SpotPriceDeliveryModel,
    SsqGroupDevice: SsqGroupDevice,
    StoreSet: StoreSet,
    StoreSetEntry: StoreSetEntry,
    SystemDevice: SystemDevice,
    SystemWithDevices: SystemWithDevices,
    UpdateGroupRequest: UpdateGroupRequest,
    UserWithAddress: UserWithAddress,
    V2DevicesDeviceIdSmartHomeCategoriesGet200Response: V2DevicesDeviceIdSmartHomeCategoriesGet200Response,
    VoucherManyRequest: VoucherManyRequest,
    VoucherSingleRequest: VoucherSingleRequest,
    ZonePatchRequest: ZonePatchRequest,
    ZoneResponse: ZoneResponse,
};

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string): string {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === 'Date') {
            return expectedType;
        } else {
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
            } else {
                if (data[discriminatorProperty]) {
                    const discriminatorType = data[discriminatorProperty];
                    if (typeMap[discriminatorType]) {
                        return discriminatorType; // use the type given in the discriminator
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string, format: string): any {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf('Array<', 0) === 0) {
            // string.startsWith pre es6
            let subType: string = type.replace('Array<', ''); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            const transformedData: any[] = [];
            for (const date of data) {
                transformedData.push(ObjectSerializer.serialize(date, subType, format));
            }
            return transformedData;
        } else if (type === 'Date') {
            if (format == 'date') {
                let month = data.getMonth() + 1;
                month = month < 10 ? '0' + month.toString() : month.toString();
                let day = data.getDate();
                day = day < 10 ? '0' + day.toString() : day.toString();

                return data.getFullYear() + '-' + month + '-' + day;
            } else {
                return data.toISOString();
            }
        } else {
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
            const instance: { [index: string]: any } = {};
            for (const attributeType of attributeTypes) {
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type, attributeType.format);
            }
            return instance;
        }
    }

    public static deserialize(data: any, type: string, format: string): any {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf('Array<', 0) === 0) {
            // string.startsWith pre es6
            let subType: string = type.replace('Array<', ''); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            const transformedData: any[] = [];
            for (const date of data) {
                transformedData.push(ObjectSerializer.deserialize(date, subType, format));
            }
            return transformedData;
        } else if (type === 'Date') {
            return new Date(data);
        } else {
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
    public static normalizeMediaType(mediaType: string | undefined): string | undefined {
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
    public static getPreferredMediaType(mediaTypes: Array<string>): string {
        /** According to OAS 3 we should default to json */
        if (mediaTypes.length === 0) {
            return 'application/json';
        }

        const normalMediaTypes = mediaTypes.map(this.normalizeMediaType);
        let selectedMediaType: string | undefined = undefined;
        let selectedRank: number = -Infinity;
        for (const mediaType of normalMediaTypes) {
            if (supportedMediaTypes[mediaType!] > selectedRank) {
                selectedMediaType = mediaType;
                selectedRank = supportedMediaTypes[mediaType!];
            }
        }

        if (selectedMediaType === undefined) {
            throw new Error('None of the given media types are supported: ' + mediaTypes.join(', '));
        }

        return selectedMediaType!;
    }

    /**
     * Convert data to a string according the given media type
     */
    public static stringify(data: any, mediaType: string): string {
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
    public static parse(rawData: string, mediaType: string | undefined): string {
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
