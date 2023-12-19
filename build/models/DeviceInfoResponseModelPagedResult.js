"use strict";
/**
 * myUplink Public API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: v2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceInfoResponseModelPagedResult = void 0;
class DeviceInfoResponseModelPagedResult {
    static getAttributeTypeMap() {
        return DeviceInfoResponseModelPagedResult.attributeTypeMap;
    }
    constructor() { }
}
exports.DeviceInfoResponseModelPagedResult = DeviceInfoResponseModelPagedResult;
DeviceInfoResponseModelPagedResult.discriminator = undefined;
DeviceInfoResponseModelPagedResult.attributeTypeMap = [
    {
        name: 'page',
        baseName: 'page',
        type: 'number',
        format: 'int32',
    },
    {
        name: 'pageSize',
        baseName: 'pageSize',
        type: 'number',
        format: 'int32',
    },
    {
        name: 'results',
        baseName: 'results',
        type: 'Array<DeviceInfoResponseModel>',
        format: '',
    },
    {
        name: 'total',
        baseName: 'total',
        type: 'number',
        format: 'int32',
    },
];
//# sourceMappingURL=DeviceInfoResponseModelPagedResult.js.map