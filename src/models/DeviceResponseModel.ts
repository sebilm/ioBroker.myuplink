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

import { AvailableMethods } from '../models/AvailableMethods';
import { DeviceConnectionState } from '../models/DeviceConnectionState';
import { FirmwareResponseModel } from '../models/FirmwareResponseModel';
import { ProductResponseModel } from '../models/ProductResponseModel';

/**
 * DeviceResponseModel.
 */
export class DeviceResponseModel {
    /**
     * Id.
     */
    'id'?: string | null;
    'connectionState'?: DeviceConnectionState;
    'firmware'?: FirmwareResponseModel;
    'product'?: ProductResponseModel;
    'availableFeatures'?: AvailableMethods;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'id',
            baseName: 'id',
            type: 'string',
            format: '',
        },
        {
            name: 'connectionState',
            baseName: 'connectionState',
            type: 'DeviceConnectionState',
            format: '',
        },
        {
            name: 'firmware',
            baseName: 'firmware',
            type: 'FirmwareResponseModel',
            format: '',
        },
        {
            name: 'product',
            baseName: 'product',
            type: 'ProductResponseModel',
            format: '',
        },
        {
            name: 'availableFeatures',
            baseName: 'availableFeatures',
            type: 'AvailableMethods',
            format: '',
        },
    ];

    static getAttributeTypeMap() {
        return DeviceResponseModel.attributeTypeMap;
    }

    public constructor() {}
}
