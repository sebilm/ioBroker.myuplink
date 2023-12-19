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

/**
 * Firmware response model
 */
export class FirmwareResponseModel {
    /**
     * Current Firmware Version
     */
    'currentFwVersion'?: string | null;
    /**
     * Desired Firmware Version
     */
    'desiredFwVersion'?: string | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'currentFwVersion',
            baseName: 'currentFwVersion',
            type: 'string',
            format: '',
        },
        {
            name: 'desiredFwVersion',
            baseName: 'desiredFwVersion',
            type: 'string',
            format: '',
        },
    ];

    static getAttributeTypeMap() {
        return FirmwareResponseModel.attributeTypeMap;
    }

    public constructor() {}
}
