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
exports.LimitedUserProfile = void 0;
/**
 * User profile model.
 */
class LimitedUserProfile {
    static getAttributeTypeMap() {
        return LimitedUserProfile.attributeTypeMap;
    }
    constructor() { }
}
exports.LimitedUserProfile = LimitedUserProfile;
LimitedUserProfile.discriminator = undefined;
LimitedUserProfile.attributeTypeMap = [
    {
        name: 'fullName',
        baseName: 'fullName',
        type: 'string',
        format: '',
    },
];
//# sourceMappingURL=LimitedUserProfile.js.map