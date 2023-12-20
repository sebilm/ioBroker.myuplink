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
exports.AlarmsPaged = void 0;
/**
 * Alarms paged.
 */
class AlarmsPaged {
    static getAttributeTypeMap() {
        return AlarmsPaged.attributeTypeMap;
    }
    constructor() { }
}
exports.AlarmsPaged = AlarmsPaged;
AlarmsPaged.discriminator = undefined;
AlarmsPaged.attributeTypeMap = [
    {
        name: 'page',
        baseName: 'page',
        type: 'number',
        format: 'int32',
    },
    {
        name: 'itemsPerPage',
        baseName: 'itemsPerPage',
        type: 'number',
        format: 'int32',
    },
    {
        name: 'numItems',
        baseName: 'numItems',
        type: 'number',
        format: 'int32',
    },
    {
        name: 'notifications',
        baseName: 'notifications',
        type: 'Array<Alarm>',
        format: '',
    },
];
//# sourceMappingURL=AlarmsPaged.js.map