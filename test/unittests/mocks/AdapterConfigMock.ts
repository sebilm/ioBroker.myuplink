import { AdapterConfig, RenameData } from '../../../src/types';

export class AdapterConfigMock implements AdapterConfig {
    Configured: boolean = true;
    Identifier: string = 'testID';
    Secret: string = 'testSecret';
    UseAuthorizationCodeGrant: boolean = true;
    AuthCode: string = 'testAuthCode';
    CallbackURL: string = 'https://sebilm.github.io/ioBroker.myuplink/myuplink.html';
    Interval: number = 1;
    Language: string = 'de';
    AddData: boolean = true;
    AddRawData: boolean = true;
    GroupData: boolean = true;
    AddActiveNotifications: boolean = true;
    AddRawActiveNotifications: boolean = true;
    RenameSystemIds: RenameData[] = new Array<RenameData>();
    RenameDeviceIds: RenameData[] = new Array<RenameData>();
    RenameCategories: RenameData[] = new Array<RenameData>();
    RenameDataIds: RenameData[] = new Array<RenameData>();
}
