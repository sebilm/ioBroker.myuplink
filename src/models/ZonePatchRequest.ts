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

export class ZonePatchRequest {
    'setpointHeat'?: number | null;
    'setpointCool'?: number | null;
    'mode'?: string | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'setpointHeat',
            baseName: 'setpointHeat',
            type: 'number',
            format: 'double',
        },
        {
            name: 'setpointCool',
            baseName: 'setpointCool',
            type: 'number',
            format: 'double',
        },
        {
            name: 'mode',
            baseName: 'mode',
            type: 'string',
            format: '',
        },
    ];

    static getAttributeTypeMap() {
        return ZonePatchRequest.attributeTypeMap;
    }

    public constructor() {}
}
