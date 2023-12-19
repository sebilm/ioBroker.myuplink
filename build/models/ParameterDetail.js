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
exports.ParameterDetail = void 0;
/**
 * Equip group model.
 */
class ParameterDetail {
    static getAttributeTypeMap() {
        return ParameterDetail.attributeTypeMap;
    }
    constructor() { }
}
exports.ParameterDetail = ParameterDetail;
ParameterDetail.discriminator = undefined;
ParameterDetail.attributeTypeMap = [
    {
        name: 'parameterId',
        baseName: 'parameterId',
        type: 'string',
        format: '',
    },
    {
        name: 'parameterName',
        baseName: 'parameterName',
        type: 'string',
        format: '',
    },
    {
        name: 'parameterUnit',
        baseName: 'parameterUnit',
        type: 'string',
        format: '',
    },
    {
        name: 'smartHomeCategories',
        baseName: 'smartHomeCategories',
        type: 'Array<string>',
        format: '',
    },
    {
        name: 'minValue',
        baseName: 'minValue',
        type: 'number',
        format: 'int32',
    },
    {
        name: 'maxValue',
        baseName: 'maxValue',
        type: 'number',
        format: 'int32',
    },
    {
        name: 'stepValue',
        baseName: 'stepValue',
        type: 'number',
        format: 'int32',
    },
    {
        name: 'enumValues',
        baseName: 'enumValues',
        type: 'Array<EnumValues>',
        format: '',
    },
    {
        name: 'scaleValue',
        baseName: 'scaleValue',
        type: 'string',
        format: '',
    },
    {
        name: 'zoneId',
        baseName: 'zoneId',
        type: 'string',
        format: '',
    },
];
//# sourceMappingURL=ParameterDetail.js.map