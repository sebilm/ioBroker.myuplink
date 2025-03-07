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

import type { AddressResponseModel } from '../models/AddressResponseModel';

/**
 * DeviceInfoResponseModel represents the response model for device information.
 */
export class DeviceInfoResponseModel {
    'deviceId'?: string | null;
    'productName'?: string | null;
    'address'?: AddressResponseModel;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'deviceId',
            baseName: 'deviceId',
            type: 'string',
            format: '',
        },
        {
            name: 'productName',
            baseName: 'productName',
            type: 'string',
            format: '',
        },
        {
            name: 'address',
            baseName: 'address',
            type: 'AddressResponseModel',
            format: '',
        },
    ];

    /**
     * Returns the attribute type map for DeviceInfoResponseModel.
     */
    static getAttributeTypeMap(): Array<{ name: string; baseName: string; type: string; format: string }> {
        return DeviceInfoResponseModel.attributeTypeMap;
    }

    /**
     * Constructs a new instance of DeviceInfoResponseModel.
     */
    public constructor() {}
}
