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

import type { DataPoint } from '../models/DataPoint';
import type { ParameterData } from '../models/ParameterData';

/**
 * Curve.
 */
export class Curve {
    'parameter'?: ParameterData;
    /**
     * List of curve points.
     */
    'data'?: Array<DataPoint> | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
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

    /**
     * Returns the attribute type map for the Curve class.
     */
    static getAttributeTypeMap(): Array<{ name: string; baseName: string; type: string; format: string }> {
        return Curve.attributeTypeMap;
    }

    /**
     * Constructs a new instance of the Curve class.
     */
    public constructor() {}
}
