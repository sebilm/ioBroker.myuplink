import { expect } from 'chai';
import sinon from 'sinon';
import { MyUplinkLogic } from '../../src/myUplinkLogic';
import { AdapterConfigMock } from './mocks/AdapterConfigMock';
import { DataTargetMock } from './mocks/DataTargetMock';
import { LoggerMock } from './mocks/LoggerMock';

describe('MyUplinkLogic: two systems with devices and data', () => {
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
                country: 'MyCountry',
                securityLevel: 'viewer',
                hasAlarm: true,
                devices: [{ id: 'Device1ID', product: { name: 'Product 1 Name' } }],
            },
            {
                systemId: 'myOtherSystemID',
                name: 'myOtherTestName',
                country: 'Germany',
                securityLevel: 'manager',
                hasAlarm: false,
                devices: [{ id: 'DeviceId2', product: { name: 'Product B', serialNumber: '123ABC' }, connectionState: 'Connected', currentFwVersion: '1.2.3' }],
            },
        ],
    });
    myUplinkRepositoryMock.expects('getActiveNotificationsAsync').withArgs('mySystemTestID', 'testtoken').resolves({});
    myUplinkRepositoryMock.expects('getActiveNotificationsAsync').withArgs('myOtherSystemID', 'testtoken').resolves({});
    myUplinkRepositoryMock
        .expects('getDevicePointsAsync')
        .withArgs('Device1ID', 'testtoken')
        .resolves([{ parameterId: '12345' }, { parameterId: 'Abcdef', value: 42 }, { parameterId: '2', parameterName: 'Parameter Test Name', value: 23 }]);
    myUplinkRepositoryMock
        .expects('getDevicePointsAsync')
        .withArgs('DeviceId2', 'testtoken')
        .resolves([{ parameterId: 's w f' }, { parameterId: '1 2 3', value: 123.456 }, { parameterId: '5', parameterName: 'Other Parameter Test Name', value: 65536 }]);

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

    it('should log no warings', () => {
        expect(loggerMock.WarnLogs).to.empty;
    });

    it('should create systems', () => {
        expect(dataTargetMock.CreateSystemAsyncCalls).to.deep.include({ path: 'mySystemTestID', name: 'mySystemTestName' });
        expect(dataTargetMock.CreateSystemAsyncCalls).to.deep.include({ path: 'myOtherSystemID', name: 'myOtherTestName' });
        expect(dataTargetMock.CreateSystemAsyncCalls).to.have.lengthOf(2);
    });

    it('should create devices', () => {
        expect(dataTargetMock.CreateDeviceAsyncCalls).to.deep.include({ path: 'mySystemTestID.Device1ID', name: 'Product 1 Name' });
        expect(dataTargetMock.CreateDeviceAsyncCalls).to.deep.include({ path: 'myOtherSystemID.DeviceId2', name: 'Product B' });
        expect(dataTargetMock.CreateDeviceAsyncCalls).to.have.lengthOf(2);
    });

    it('should create system states', () => {
        // System 1:
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.systemId',
            name: 'System ID',
            value: 'mySystemTestID',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.name',
            name: 'Name',
            value: 'mySystemTestName',
            createObject: true,
            role: 'info.name',
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.country',
            name: 'Country',
            value: 'MyCountry',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.securityLevel',
            name: 'Security Level',
            value: 'viewer',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.rawActiveNotifications',
            name: 'Received raw JSON of active notifications',
            value: undefined,
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.activeNotifications',
            name: 'Active notification descriptions',
            value: '',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateBooleanStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.hasAlarm',
            name: 'Has Alarm',
            value: true,
            createObject: true,
            role: 'indicator.alarm',
        });
        // System 2:
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.systemId',
            name: 'System ID',
            value: 'myOtherSystemID',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.name',
            name: 'Name',
            value: 'myOtherTestName',
            createObject: true,
            role: 'info.name',
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.country',
            name: 'Country',
            value: 'Germany',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.securityLevel',
            name: 'Security Level',
            value: 'manager',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.rawActiveNotifications',
            name: 'Received raw JSON of active notifications',
            value: undefined,
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.activeNotifications',
            name: 'Active notification descriptions',
            value: '',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateBooleanStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.hasAlarm',
            name: 'Has Alarm',
            value: false,
            createObject: true,
            role: 'indicator.alarm',
        });
    });

    it('should create device states', () => {
        // Device 1-1:
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.deviceId',
            name: 'Device ID',
            value: 'Device1ID',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.name',
            name: 'Name',
            value: 'Product 1 Name',
            createObject: true,
            role: 'info.name',
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.rawData',
            name: 'Received raw JSON of parameter data',
            value: '[{"parameterId":"12345"},{"parameterId":"Abcdef","value":42},{"parameterId":"2","parameterName":"Parameter Test Name","value":23}]',
            createObject: true,
            role: undefined,
        });
        // Device 2-1:
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.deviceId',
            name: 'Device ID',
            value: 'DeviceId2',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.name',
            name: 'Name',
            value: 'Product B',
            createObject: true,
            role: 'info.name',
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.rawData',
            name: 'Received raw JSON of parameter data',
            value: '[{"parameterId":"s w f"},{"parameterId":"1 2 3","value":123.456},{"parameterId":"5","parameterName":"Other Parameter Test Name","value":65536}]',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.serialNumber',
            name: 'Serial Number',
            value: '123ABC',
            createObject: true,
            role: 'info.serial',
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.connectionState',
            name: 'Connection State',
            value: 'Connected',
            createObject: true,
            role: 'info.status',
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.currentFwVersion',
            name: 'Current Firmware Version',
            value: '1.2.3',
            createObject: true,
            role: 'info.firmware',
        });
    });

    it('should create data states', () => {
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.12345',
            name: '',
            deviceId: 'Device1ID',
            parameterId: '12345',
            role: 'value',
            writable: false,
            unit: undefined,
            min: undefined,
            max: undefined,
            step: undefined,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.Abcdef',
            name: '',
            deviceId: 'Device1ID',
            parameterId: 'Abcdef',
            role: 'value',
            writable: false,
            unit: undefined,
            min: undefined,
            max: undefined,
            step: undefined,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.2',
            name: 'Parameter Test Name',
            deviceId: 'Device1ID',
            parameterId: '2',
            role: 'value',
            writable: false,
            unit: undefined,
            min: undefined,
            max: undefined,
            step: undefined,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.s_w_f',
            name: '',
            deviceId: 'DeviceId2',
            parameterId: 's w f',
            role: 'value',
            writable: false,
            unit: undefined,
            min: undefined,
            max: undefined,
            step: undefined,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.1_2_3',
            name: '',
            deviceId: 'DeviceId2',
            parameterId: '1 2 3',
            role: 'value',
            writable: false,
            unit: undefined,
            min: undefined,
            max: undefined,
            step: undefined,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.5',
            name: 'Other Parameter Test Name',
            deviceId: 'DeviceId2',
            parameterId: '5',
            role: 'value',
            writable: false,
            unit: undefined,
            min: undefined,
            max: undefined,
            step: undefined,
            states: undefined,
        });
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.have.lengthOf(6);
    });

    it('should set data states', () => {
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.12345',
            value: null,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.Abcdef',
            value: 42,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.2',
            value: 23,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.s_w_f',
            value: null,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.1_2_3',
            value: 123.456,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.5',
            value: 65536,
        });
        expect(dataTargetMock.SetStateAsyncCalls).to.have.lengthOf(6);
    });

    it('should create no more states', () => {
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.have.lengthOf(21);
        expect(dataTargetMock.CreateBooleanStateAsyncCalls).to.have.lengthOf(2);
    });

    it('should create writeable string objects', () => {
        expect(dataTargetMock.CreateWritableStringObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.setData',
            name: 'Send raw JSON of parameter data',
            role: 'json',
            deviceId: 'Device1ID',
        });
        expect(dataTargetMock.CreateWritableStringObjectAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.setData',
            name: 'Send raw JSON of parameter data',
            role: 'json',
            deviceId: 'DeviceId2',
        });
        expect(dataTargetMock.CreateWritableStringObjectAsyncCalls).to.have.lengthOf(2);
    });

    it('should not do more', () => {
        expect(dataTargetMock.CreateCategoryAsyncCalls).to.empty;
    });
});
