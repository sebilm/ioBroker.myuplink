import { DataTarget } from '../../../src/types';

export class DataTargetMock implements DataTarget {
    CreateSystemAsync(path: string, name: string): Promise<void> {
        this.CreateSystemAsyncCalls.push({ path, name });
        return Promise.resolve();
    }

    CreateDeviceAsync(path: string, name: string): Promise<void> {
        this.CreateDeviceAsyncCalls.push({ path, name });
        return Promise.resolve();
    }

    CreateCategoryAsync(path: string, name: string): Promise<void> {
        this.CreateCategoryAsyncCalls.push({ path, name });
        return Promise.resolve();
    }

    CreateStringStateAsync(path: string, name: string, value: string, createObject: boolean, role?: string | undefined): Promise<void> {
        this.CreateStringStateAsyncCalls.push({ path, name, value, createObject, role });
        return Promise.resolve();
    }

    CreateBooleanStateAsync(path: string, name: string, role: string, value: boolean, createObject: boolean): Promise<void> {
        this.CreateBooleanStateAsyncCalls.push({ path, name, role, value, createObject });
        return Promise.resolve();
    }

    CreateWritableStringObjectAsync(path: string, name: string, role: string, deviceId: string): Promise<void> {
        this.CreateWritableStringObjectAsyncCalls.push({ path, name, role, deviceId });
        return Promise.resolve();
    }

    CreateParameterObjectAsync(
        path: string,
        name: string,
        deviceId: string | null | undefined,
        parameterId: string | null | undefined,
        role: string,
        writable: boolean,
        unit: string | undefined,
        min: number | undefined,
        max: number | undefined,
        step: number | undefined,
        states: Record<string, string> | undefined,
    ): Promise<void> {
        this.CreateParameterObjectAsyncCalls.push({ path, name, deviceId, parameterId, role, writable, unit, min, max, step, states });
        return Promise.resolve();
    }

    SetStateAsync(path: string, value: string | number | boolean | null): Promise<void> {
        this.SetStateAsyncCalls.push({ path, value });
        return Promise.resolve();
    }

    CreateSystemAsyncCalls: { path: string; name: string }[] = [];
    CreateDeviceAsyncCalls: { path: string; name: string }[] = [];
    CreateCategoryAsyncCalls: { path: string; name: string }[] = [];
    CreateStringStateAsyncCalls: { path: string; name: string; value: string; createObject: boolean; role?: string | undefined }[] = [];
    CreateBooleanStateAsyncCalls: { path: string; name: string; role: string; value: boolean; createObject: boolean }[] = [];
    CreateWritableStringObjectAsyncCalls: { path: string; name: string; role: string; deviceId: string }[] = [];
    CreateParameterObjectAsyncCalls: {
        path: string;
        name: string;
        deviceId: string | null | undefined;
        parameterId: string | null | undefined;
        role: string;
        writable: boolean;
        unit: string | undefined;
        min: number | undefined;
        max: number | undefined;
        step: number | undefined;
        states: Record<string, string> | undefined;
    }[] = [];
    SetStateAsyncCalls: { path: string; value: string | number | boolean | null }[] = [];
}
