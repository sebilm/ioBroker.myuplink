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

export class ZoneResponse {
    /**
     * sh-zone\'s parameter id.
     */
    'zoneId'?: string | null;
    /**
     * sh-zone\'s parameter name.
     */
    'name'?: string | null;
    /**
     * If true, zone is command-only and no temperature readings  are available. Setpoint will be an unspecified value  (not degrees).
     */
    'commandOnly'?: boolean;
    /**
     * sh-zone\'s supported modes.
     */
    'supportedModes'?: string | null;
    /**
     * Sh-zone\'s current mode.
     */
    'mode'?: string | null;
    /**
     * Current temperature in target unit.
     */
    'temperature'?: number | null;
    /**
     * Target temperature in target unit.
     */
    'setpoint'?: number | null;
    /**
     * Heating setpoint current value.
     */
    'setpointHeat'?: number | null;
    /**
     * Cooling setpoint current value.
     */
    'setpointCool'?: number | null;
    /**
     * Minimum temperature range.
     */
    'setpointRangeMin'?: number | null;
    /**
     * Maximum temperature range.
     */
    'setpointRangeMax'?: number | null;
    /**
     * Specified temperature unit in haystack.  If \"isCelsius\" is false then all temperatures are in Fahrenheit. Otherwies it is in Celsius.
     */
    'isCelsius'?: boolean;
    /**
     * Indoor CO2 levels (0-40000ppm)
     */
    'indoorCo2'?: number | null;
    /**
     * Indoor humidity (0-100%RH)
     */
    'indoorHumidity'?: number | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'zoneId',
            baseName: 'zoneId',
            type: 'string',
            format: '',
        },
        {
            name: 'name',
            baseName: 'name',
            type: 'string',
            format: '',
        },
        {
            name: 'commandOnly',
            baseName: 'commandOnly',
            type: 'boolean',
            format: '',
        },
        {
            name: 'supportedModes',
            baseName: 'supportedModes',
            type: 'string',
            format: '',
        },
        {
            name: 'mode',
            baseName: 'mode',
            type: 'string',
            format: '',
        },
        {
            name: 'temperature',
            baseName: 'temperature',
            type: 'number',
            format: 'double',
        },
        {
            name: 'setpoint',
            baseName: 'setpoint',
            type: 'number',
            format: 'double',
        },
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
            name: 'setpointRangeMin',
            baseName: 'setpointRangeMin',
            type: 'number',
            format: 'int32',
        },
        {
            name: 'setpointRangeMax',
            baseName: 'setpointRangeMax',
            type: 'number',
            format: 'int32',
        },
        {
            name: 'isCelsius',
            baseName: 'isCelsius',
            type: 'boolean',
            format: '',
        },
        {
            name: 'indoorCo2',
            baseName: 'indoorCo2',
            type: 'number',
            format: 'int32',
        },
        {
            name: 'indoorHumidity',
            baseName: 'indoorHumidity',
            type: 'number',
            format: 'double',
        },
    ];

    static getAttributeTypeMap() {
        return ZoneResponse.attributeTypeMap;
    }

    public constructor() {}
}
