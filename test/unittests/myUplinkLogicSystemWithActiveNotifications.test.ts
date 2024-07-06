import { expect } from 'chai';
import sinon from 'sinon';
import { MyUplinkLogic } from '../../src/myUplinkLogic';
import { AdapterConfigMock } from './mocks/AdapterConfigMock';
import { DataTargetMock } from './mocks/DataTargetMock';
import { LoggerMock } from './mocks/LoggerMock';

describe('MyUplinkLogic: system with active notifications', () => {
    const dataTargetMock = new DataTargetMock();
    const adapterConfigMock = new AdapterConfigMock();
    const loggerMock = new LoggerMock();
    const myUplinkLogic = new MyUplinkLogic(dataTargetMock, adapterConfigMock, 'storedir', loggerMock);

    const authRepositoryMock = sinon.mock(myUplinkLogic.authRepository);
    authRepositoryMock.expects('getAccessTokenAsync').resolves('testtoken');
    const myUplinkRepositoryMock = sinon.mock(myUplinkLogic.myUplinkRepository);
    myUplinkRepositoryMock.expects('getSystemsAndDevicesAsync').resolves({ systems: [{ systemId: 'mySystemTestID', name: 'mySystemTestName' }] });
    myUplinkRepositoryMock
        .expects('getActiveNotificationsAsync')
        .withArgs('mySystemTestID', 'testtoken')
        .resolves({
            notifications: [
                { header: 'Alarm A', description: 'Alarm 1 Error Message' },
                { header: 'Alarm B', description: 'Alarm 2 Error Message' },
            ],
        });

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

    it('should create system', () => {
        expect(dataTargetMock.CreateSystemAsyncCalls).to.deep.include({ path: 'mySystemTestID', name: 'mySystemTestName' });
        expect(dataTargetMock.CreateSystemAsyncCalls).to.have.lengthOf(1);
    });

    it('should create string states', () => {
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
            path: 'mySystemTestID.rawActiveNotifications',
            name: 'Received raw JSON of active notifications',
            value: '[{"header":"Alarm A","description":"Alarm 1 Error Message"},{"header":"Alarm B","description":"Alarm 2 Error Message"}]',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.activeNotifications',
            name: 'Active notification descriptions',
            value: 'Alarm A: Alarm 1 Error Message\nAlarm B: Alarm 2 Error Message\n',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.have.lengthOf(4);
    });

    it('should not do more', () => {
        expect(dataTargetMock.CreateDeviceAsyncCalls).to.empty;
        expect(dataTargetMock.CreateCategoryAsyncCalls).to.empty;
        expect(dataTargetMock.CreateBooleanStateAsyncCalls).to.empty;
        expect(dataTargetMock.CreateWritableStringObjectAsyncCalls).to.empty;
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.empty;
        expect(dataTargetMock.SetStateAsyncCalls).to.empty;
    });
});
