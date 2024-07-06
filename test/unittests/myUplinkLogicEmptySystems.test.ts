import { expect } from 'chai';
import sinon from 'sinon';
import { MyUplinkLogic } from '../../src/myUplinkLogic';
import { AdapterConfigMock } from './mocks/AdapterConfigMock';
import { DataTargetMock } from './mocks/DataTargetMock';
import { LoggerMock } from './mocks/LoggerMock';

describe('MyUplinkLogic: empty systems', () => {
    const dataTargetMock = new DataTargetMock();
    const adapterConfigMock = new AdapterConfigMock();
    const loggerMock = new LoggerMock();
    const myUplinkLogic = new MyUplinkLogic(dataTargetMock, adapterConfigMock, 'storedir', loggerMock);

    const authRepositoryMock = sinon.mock(myUplinkLogic.authRepository);
    authRepositoryMock.expects('getAccessTokenAsync').resolves('testtoken');
    const myUplinkRepositoryMock = sinon.mock(myUplinkLogic.myUplinkRepository);
    myUplinkRepositoryMock.expects('getSystemsAndDevicesAsync').resolves({ systems: [] });

    let error: string | undefined;
    before(async () => {
        error = await myUplinkLogic.GetDataAsync();
    });

    it(`should return no error`, () => {
        expect(error).to.undefined;
    });

    it(`should log no errors`, () => {
        expect(loggerMock.ErrorLogs).to.empty;
    });

    it(`should log no warings`, () => {
        expect(loggerMock.WarnLogs).to.empty;
    });

    it(`should do nothing`, () => {
        expect(dataTargetMock.CreateSystemAsyncCalls).to.empty;
        expect(dataTargetMock.CreateDeviceAsyncCalls).to.empty;
        expect(dataTargetMock.CreateCategoryAsyncCalls).to.empty;
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.empty;
        expect(dataTargetMock.CreateBooleanStateAsyncCalls).to.empty;
        expect(dataTargetMock.CreateWritableStringObjectAsyncCalls).to.empty;
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.empty;
        expect(dataTargetMock.SetStateAsyncCalls).to.empty;
    });
});
