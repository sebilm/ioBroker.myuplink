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
exports.AlarmStatus = void 0;
class AlarmStatus {
    static getAttributeTypeMap() {
        return AlarmStatus.attributeTypeMap;
    }
    constructor() { }
}
exports.AlarmStatus = AlarmStatus;
AlarmStatus.discriminator = undefined;
AlarmStatus.attributeTypeMap = [
    {
        name: 'status',
        baseName: 'status',
        type: 'Status',
        format: '',
    },
    {
        name: 'datetime',
        baseName: 'datetime',
        type: 'number',
        format: 'int32',
    },
];
//# sourceMappingURL=AlarmStatus.js.map