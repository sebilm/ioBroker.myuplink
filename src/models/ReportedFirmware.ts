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

export class ReportedFirmware {
    'firmwareId'?: string | null;
    'pendingFwVersion'?: string | null;
    'lastFwUpdateStartTime'?: string | null;
    'currentFwVersion'?: string | null;
    'lastFwUpdateEndTime'?: string | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'firmwareId',
            baseName: 'firmwareId',
            type: 'string',
            format: '',
        },
        {
            name: 'pendingFwVersion',
            baseName: 'pendingFwVersion',
            type: 'string',
            format: '',
        },
        {
            name: 'lastFwUpdateStartTime',
            baseName: 'lastFwUpdateStartTime',
            type: 'string',
            format: '',
        },
        {
            name: 'currentFwVersion',
            baseName: 'currentFwVersion',
            type: 'string',
            format: '',
        },
        {
            name: 'lastFwUpdateEndTime',
            baseName: 'lastFwUpdateEndTime',
            type: 'string',
            format: '',
        },
    ];

    static getAttributeTypeMap() {
        return ReportedFirmware.attributeTypeMap;
    }

    public constructor() {}
}
