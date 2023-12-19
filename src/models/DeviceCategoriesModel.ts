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

import { DeviceCategory } from '../models/DeviceCategory';

/**
 * Device equip model.
 */
export class DeviceCategoriesModel {
    /**
     * Device id.
     */
    'deviceId'?: string | null;
    /**
     * Categories.
     */
    'categories'?: Array<DeviceCategory> | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'deviceId',
            baseName: 'deviceId',
            type: 'string',
            format: '',
        },
        {
            name: 'categories',
            baseName: 'categories',
            type: 'Array<DeviceCategory>',
            format: '',
        },
    ];

    static getAttributeTypeMap() {
        return DeviceCategoriesModel.attributeTypeMap;
    }

    public constructor() {}
}
