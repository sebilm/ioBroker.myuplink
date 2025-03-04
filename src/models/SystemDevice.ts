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

import type { DeviceConnectionState } from '../models/DeviceConnectionState';
import type { Product } from '../models/Product';

/**
 * Device model.
 */
export class SystemDevice {
    /**
     * Id.
     */
    'id'?: string | null;
    'connectionState'?: DeviceConnectionState;
    /**
     * Current firmware version.
     */
    'currentFwVersion'?: string | null;
    'product'?: Product;

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
            name: 'currentFwVersion',
            baseName: 'currentFwVersion',
            type: 'string',
            format: '',
        },
        {
            name: 'product',
            baseName: 'product',
            type: 'Product',
            format: '',
        },
    ];

    /**
     * Returns the attribute type map for the SystemDevice class.
     */
    static getAttributeTypeMap(): Array<{ name: string; baseName: string; type: string; format: string }> {
        return SystemDevice.attributeTypeMap;
    }

    /**
     * Constructs a new instance of the SystemDevice class.
     */
    public constructor() {}
}
