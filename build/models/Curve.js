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
exports.Curve = void 0;
/**
 * Curve.
 */
class Curve {
    static getAttributeTypeMap() {
        return Curve.attributeTypeMap;
    }
    constructor() { }
}
exports.Curve = Curve;
Curve.discriminator = undefined;
Curve.attributeTypeMap = [
    {
        name: 'parameter',
        baseName: 'parameter',
        type: 'ParameterData',
        format: '',
    },
    {
        name: 'data',
        baseName: 'data',
        type: 'Array<DataPoint>',
        format: '',
    },
];
//# sourceMappingURL=Curve.js.map