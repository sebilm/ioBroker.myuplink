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

import type { DeviceInfoResponseModel } from '../models/DeviceInfoResponseModel';

/**
 * Represents a paged result of DeviceInfoResponseModel.
 */
export class DeviceInfoResponseModelPagedResult {
    'page'?: number;
    'pageSize'?: number;
    'results'?: Array<DeviceInfoResponseModel> | null;
    'total'?: number;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
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

    /**
     * Returns the attribute type map for DeviceInfoResponseModelPagedResult.
     */
    static getAttributeTypeMap(): Array<{ name: string; baseName: string; type: string; format: string }> {
        return DeviceInfoResponseModelPagedResult.attributeTypeMap;
    }

    /**
     * Constructs a new instance of the DeviceInfoResponseModelPagedResult class.
     */
    public constructor() {}
}
