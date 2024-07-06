import { expect } from 'chai';
import sinon from 'sinon';
import { MyUplinkLogic } from '../../src/myUplinkLogic';
import { AdapterConfigMock } from './mocks/AdapterConfigMock';
import { DataTargetMock } from './mocks/DataTargetMock';
import { LoggerMock } from './mocks/LoggerMock';

describe('MyUplinkLogic: two systems with all system data', () => {
    const dataTargetMock = new DataTargetMock();
    const adapterConfigMock = new AdapterConfigMock();
    const loggerMock = new LoggerMock();
    const myUplinkLogic = new MyUplinkLogic(dataTargetMock, adapterConfigMock, 'storedir', loggerMock);

    const authRepositoryMock = sinon.mock(myUplinkLogic.authRepository);
    authRepositoryMock.expects('getAccessTokenAsync').resolves('testtoken');
    const myUplinkRepositoryMock = sinon.mock(myUplinkLogic.myUplinkRepository);
    myUplinkRepositoryMock.expects('getSystemsAndDevicesAsync').resolves({
        systems: [
            { systemId: 'mySystemTestID', name: 'mySystemTestName', country: 'MyCountry', securityLevel: 'viewer', hasAlarm: true },
            { systemId: 'myOtherSystemID', name: 'myOtherTestName', country: 'Germany', securityLevel: 'manager', hasAlarm: false },
        ],
    });
    myUplinkRepositoryMock.expects('getActiveNotificationsAsync').withArgs('mySystemTestID', 'testtoken').resolves({});
    myUplinkRepositoryMock.expects('getActiveNotificationsAsync').withArgs('myOtherSystemID', 'testtoken').resolves(null);

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

    it('should create states', () => {
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
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.have.lengthOf(12);
        expect(dataTargetMock.CreateBooleanStateAsyncCalls).to.have.lengthOf(2);
    });

    it('should not do more', () => {
        expect(dataTargetMock.CreateDeviceAsyncCalls).to.empty;
        expect(dataTargetMock.CreateCategoryAsyncCalls).to.empty;
        expect(dataTargetMock.CreateWritableStringObjectAsyncCalls).to.empty;
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.empty;
        expect(dataTargetMock.SetStateAsyncCalls).to.empty;
    });
});
