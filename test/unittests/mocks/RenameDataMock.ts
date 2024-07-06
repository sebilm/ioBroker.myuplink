import { RenameData } from '../../../src/types';

export class RenameDataMock implements RenameData {
    OriginalId: string;
    NewId: string;
    Category: string | undefined;
}
