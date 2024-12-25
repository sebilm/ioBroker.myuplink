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

import type { AlarmStatus } from '../models/AlarmStatus';
import type { Status } from '../models/Status';

/**
 * Alarm.
 */
export class Alarm {
    /**
     * The id of the alarm stored in the database.
     */
    'id'?: string;
    /**
     * The company´s id of the alarm.
     */
    'alarmNumber'?: number;
    /**
     * The device which the alarm belongs to.
     */
    'deviceId'?: string | null;
    /**
     * Determines the severity of the alarm,  1 being the most severe.
     */
    'severity'?: number;
    'status'?: Status;
    /**
     * Date of the creation.
     */
    'createdDatetime'?: string | null;
    /**
     * Status history.
     */
    'statusHistory'?: Array<AlarmStatus> | null;
    /**
     * Localized alarm title.
     */
    'header'?: string | null;
    /**
     * Localized alarm description.
     */
    'description'?: string | null;
    /**
     * The name of the equipment.
     */
    'equipName'?: string | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'id',
            baseName: 'id',
            type: 'string',
            format: 'uuid',
        },
        {
            name: 'alarmNumber',
            baseName: 'alarmNumber',
            type: 'number',
            format: 'int32',
        },
        {
            name: 'deviceId',
            baseName: 'deviceId',
            type: 'string',
            format: '',
        },
        {
            name: 'severity',
            baseName: 'severity',
            type: 'number',
            format: 'int32',
        },
        {
            name: 'status',
            baseName: 'status',
            type: 'Status',
            format: '',
        },
        {
            name: 'createdDatetime',
            baseName: 'createdDatetime',
            type: 'string',
            format: '',
        },
        {
            name: 'statusHistory',
            baseName: 'statusHistory',
            type: 'Array<AlarmStatus>',
            format: '',
        },
        {
            name: 'header',
            baseName: 'header',
            type: 'string',
            format: '',
        },
        {
            name: 'description',
            baseName: 'description',
            type: 'string',
            format: '',
        },
        {
            name: 'equipName',
            baseName: 'equipName',
            type: 'string',
            format: '',
        },
    ];

    /**
     * Returns the attribute type map for the Alarm class.
     */
    static getAttributeTypeMap(): Array<{ name: string; baseName: string; type: string; format: string }> {
        return Alarm.attributeTypeMap;
    }

    /**
     * Constructs a new instance of the Alarm class.
     */
    public constructor() {}
}
