import { expect } from 'chai';
import sinon from 'sinon';
import { MyUplinkLogic } from '../../src/myUplinkLogic';
import { AdapterConfigMock } from './mocks/AdapterConfigMock';
import { DataTargetMock } from './mocks/DataTargetMock';
import { LoggerMock } from './mocks/LoggerMock';

describe('MyUplinkLogic: different data formats', () => {
    const dataTargetMock = new DataTargetMock();
    const adapterConfigMock = new AdapterConfigMock();
    const loggerMock = new LoggerMock();
    const myUplinkLogic = new MyUplinkLogic(dataTargetMock, adapterConfigMock, 'storedir', loggerMock);

    const authRepositoryMock = sinon.mock(myUplinkLogic.authRepository);
    authRepositoryMock.expects('getAccessTokenAsync').resolves('testtoken');
    const myUplinkRepositoryMock = sinon.mock(myUplinkLogic.myUplinkRepository);
    myUplinkRepositoryMock.expects('getSystemsAndDevicesAsync').resolves({
        systems: [
            {
                systemId: 'mySystemTestID',
                name: 'mySystemTestName',
                devices: [{ id: 'Device1ID', product: { name: 'Product 1 Name' } }],
            },
        ],
    });
    myUplinkRepositoryMock.expects('getActiveNotificationsAsync').withArgs('mySystemTestID', 'testtoken').resolves({});
    myUplinkRepositoryMock
        .expects('getDevicePointsAsync')
        .withArgs('Device1ID', 'testtoken')
        .resolves([
            {
                category: 'C1',
                parameterId: '102',
                parameterName: 'Temp',
                value: 23.2,
                parameterUnit: '°C',
                writable: false,
                minValue: null,
                maxValue: null,
                stepValue: 0.1,
                enumValues: [],
            },
            {
                category: null,
                parameterId: '781',
                parameterName: 'Degree minutes',
                value: -10,
                parameterUnit: 'DM',
                writable: true,
                minValue: -3000,
                maxValue: 3000,
                stepValue: 2,
                enumValues: null,
            },
            {
                category: undefined,
                parameterId: '40079',
                parameterName: 'Current (BE3)',
                value: 3.52,
                parameterUnit: 'A',
                writable: false,
                minValue: undefined,
                maxValue: undefined,
                stepValue: 0.1,
                enumValues: undefined,
            },
            {
                category: 'C1',
                parameterId: '40311',
                parameterName: 'Fan speed (GQ2)\r\n            ',
                value: 77,
                parameterUnit: '%',
                writable: false,
                minValue: null,
                maxValue: null,
                stepValue: null,
                enumValues: null,
            },
            {
                category: 'Slave 1 (EB101)',
                parameterId: '40782',
                parameterName: 'Re­quested com­pressor freq (EB101)',
                value: 5,
                parameterUnit: 'Hz',
                writable: false,
                minValue: null,
                maxValue: null,
                stepValue: 1,
                enumValues: null,
            },
            {
                category: 'Heat meter',
                parameterId: '44298',
                parameterName: 'Hot water, includ­ing int. add. heat',
                value: 11297.4,
                parameterUnit: 'kWh',
                writable: false,
                minValue: null,
                maxValue: null,
                stepValue: 0.1,
                enumValues: null,
            },
            {
                category: 'Slave 1 (EB101)',
                parameterId: '44700',
                parameterName: 'Low pres­sure (EB101-BP8)',
                value: 11.5,
                parameterUnit: 'bar',
                writable: false,
                minValue: null,
                maxValue: null,
                stepValue: 0.1,
                enumValues: [],
            },
            {
                category: 'C1',
                parameterId: '47041',
                parameterName: 'comfort mode',
                value: 2,
                parameterUnit: '',
                writable: true,
                minValue: null,
                maxValue: null,
                stepValue: 1,
                enumValues: [
                    {
                        value: 4,
                        text: 'smart control',
                    },
                    {
                        value: '0',
                        text: 'economy',
                    },
                    {
                        value: '1',
                        text: 'normal',
                    },
                    {
                        value: '2',
                        text: 'luxury',
                    },
                ],
            },
            {
                category: 'Slave 1 (EB101)',
                parameterId: '22130',
                parameterName: 'Mo­mentan ver­wendete Leis­tung',
                value: 519.0,
                parameterUnit: 'Ws',
                writable: false,
                minValue: 0.0,
                maxValue: 9999999.0,
                stepValue: 10.0,
                enumValues: [],
            },
            {
                category: 'inomhusklimat',
                parameterId: '50830',
                parameterName: 'Luft­fuktighet: entrevåning',
                value: 45.0,
                parameterUnit: '%RH',
                writable: false,
                minValue: 0,
                maxValue: 100,
                stepValue: 0.1,
                enumValues: [],
            },
            {
                category: 'C1',
                parameterId: '666',
                parameterName: 'Wrong min/max #39',
                value: 56.7,
                parameterUnit: '',
                writable: false,
                minValue: 120,
                maxValue: -100,
                stepValue: 0.1,
                enumValues: [],
            },
            {
                category: 'C1',
                parameterId: '111',
                parameterName: 'Value outside min/max: min #39',
                value: 30,
                parameterUnit: '',
                writable: false,
                minValue: 50,
                maxValue: 100,
                stepValue: 0.1,
                enumValues: [],
            },
            {
                category: 'C1',
                parameterId: '222',
                parameterName: 'Value outside min/max: max #39',
                value: 300,
                parameterUnit: '',
                writable: false,
                minValue: 50,
                maxValue: 100,
                stepValue: 0.1,
                enumValues: [],
            },
        ]);

    let error: string | undefined;
    before(async () => {
        error = await myUplinkLogic.GetDataAsync();
    });

    it('should return no error', () => {
        expect(error).to.undefined;
    });

    it('should log no errors', () => {
        expect(loggerMock.ErrorLogs).to.empty;
    });

    it('should log warings', () => {
        expect(loggerMock.WarnLogs).to.deep.include("Parameter '666': min is bigger than max. Min: 120, Max: -100. Ignoring min/max.");
        expect(loggerMock.WarnLogs).to.deep.include("Parameter '111': value is outside min/max. Value: 30, Min: 50, Max: 100. Ignoring min/max.");
        expect(loggerMock.WarnLogs).to.deep.include("Parameter '222': value is outside min/max. Value: 300, Min: 50, Max: 100. Ignoring min/max.");
    });

    it('should create data states', () => {
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.C1.102',
            name: 'Temp',
            deviceId: 'Device1ID',
            parameterId: '102',
            role: 'value.temperature',
            writable: false,
            unit: '°C',
            min: undefined,
            max: undefined,
            step: 0.1,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.781',
            name: 'Degree minutes',
            deviceId: 'Device1ID',
            parameterId: '781',
            role: 'value',
            writable: true,
            unit: 'DM',
            min: -3000,
            max: 3000,
            step: 2,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.40079',
            name: 'Current (BE3)',
            deviceId: 'Device1ID',
            parameterId: '40079',
            role: 'value.current',
            writable: false,
            unit: 'A',
            min: undefined,
            max: undefined,
            step: 0.1,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.C1.40311',
            name: 'Fan speed (GQ2)',
            deviceId: 'Device1ID',
            parameterId: '40311',
            role: 'value',
            writable: false,
            unit: '%',
            min: undefined,
            max: undefined,
            step: undefined,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.Slave_1_EB101_.40782',
            name: 'Requested compressor freq (EB101)',
            deviceId: 'Device1ID',
            parameterId: '40782',
            role: 'value.frequency',
            writable: false,
            unit: 'Hz',
            min: undefined,
            max: undefined,
            step: 1,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.Heat_meter.44298',
            name: 'Hot water, including int. add. heat',
            deviceId: 'Device1ID',
            parameterId: '44298',
            role: 'value.energy',
            writable: false,
            unit: 'kWh',
            min: undefined,
            max: undefined,
            step: 0.1,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.Slave_1_EB101_.44700',
            name: 'Low pressure (EB101-BP8)',
            deviceId: 'Device1ID',
            parameterId: '44700',
            role: 'value.pressure',
            writable: false,
            unit: 'bar',
            min: undefined,
            max: undefined,
            step: 0.1,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.C1.47041',
            name: 'comfort mode',
            deviceId: 'Device1ID',
            parameterId: '47041',
            role: 'value',
            writable: true,
            unit: undefined,
            min: undefined,
            max: undefined,
            step: 1,
            states: { '4': 'smart control', '0': 'economy', '1': 'normal', '2': 'luxury' },
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.Slave_1_EB101_.22130',
            name: 'Momentan verwendete Leistung',
            deviceId: 'Device1ID',
            parameterId: '22130',
            role: 'value.energy',
            writable: false,
            unit: 'Ws',
            min: 0,
            max: 9999999,
            step: 10,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.inomhusklimat.50830',
            name: 'Luftfuktighet: entrevåning',
            deviceId: 'Device1ID',
            parameterId: '50830',
            role: 'value.humidity',
            writable: false,
            unit: '%',
            min: 0,
            max: 100,
            step: 0.1,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.C1.666',
            name: 'Wrong min/max #39',
            deviceId: 'Device1ID',
            parameterId: '666',
            role: 'value',
            writable: false,
            unit: undefined,
            min: undefined,
            max: undefined,
            step: 0.1,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.C1.111',
            name: 'Value outside min/max: min #39',
            deviceId: 'Device1ID',
            parameterId: '111',
            role: 'value',
            writable: false,
            unit: undefined,
            min: undefined,
            max: undefined,
            step: 0.1,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.C1.222',
            name: 'Value outside min/max: max #39',
            deviceId: 'Device1ID',
            parameterId: '222',
            role: 'value',
            writable: false,
            unit: undefined,
            min: undefined,
            max: undefined,
            step: 0.1,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.have.lengthOf(13);
    });

    it('should set data states', () => {
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.C1.102',
            value: 23.2,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.781',
            value: -10,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.40079',
            value: 3.52,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.C1.40311',
            value: 77,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.Slave_1_EB101_.40782',
            value: 5,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.Heat_meter.44298',
            value: 11297.4,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.Slave_1_EB101_.44700',
            value: 11.5,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.C1.47041',
            value: 2,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.Slave_1_EB101_.22130',
            value: 519,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.inomhusklimat.50830',
            value: 45,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.C1.666',
            value: 56.7,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.C1.111',
            value: 30,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.C1.222',
            value: 300,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.have.lengthOf(13);
    });

    it('should create categories', () => {
        expect(dataTargetMock.CreateCategoryAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.C1',
            name: 'C1',
        });
        expect(dataTargetMock.CreateCategoryAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.Slave_1_EB101_',
            name: 'Slave 1 (EB101)',
        });
        expect(dataTargetMock.CreateCategoryAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.Heat_meter',
            name: 'Heat meter',
        });
        expect(dataTargetMock.CreateCategoryAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.inomhusklimat',
            name: 'inomhusklimat',
        });
        expect(dataTargetMock.CreateCategoryAsyncCalls).to.have.lengthOf(4);
    });
});
