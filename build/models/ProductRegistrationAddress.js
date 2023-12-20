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
exports.ProductRegistrationAddress = void 0;
class ProductRegistrationAddress {
    static getAttributeTypeMap() {
        return ProductRegistrationAddress.attributeTypeMap;
    }
    constructor() { }
}
exports.ProductRegistrationAddress = ProductRegistrationAddress;
ProductRegistrationAddress.discriminator = undefined;
ProductRegistrationAddress.attributeTypeMap = [
    {
        name: 'city',
        baseName: 'city',
        type: 'string',
        format: '',
    },
    {
        name: 'region',
        baseName: 'region',
        type: 'string',
        format: '',
    },
    {
        name: 'country',
        baseName: 'country',
        type: 'Country',
        format: '',
    },
    {
        name: 'postalCode',
        baseName: 'postalCode',
        type: 'string',
        format: '',
    },
];
//# sourceMappingURL=ProductRegistrationAddress.js.map