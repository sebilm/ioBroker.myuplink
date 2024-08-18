export interface Logger {
    silly(msg: string): void;
    debug(msg: string): void;
    info(msg: string): void;
    error(msg: string): void;
    warn(msg: string): void;
}

export interface DataTarget {
    CreateSystemAsync(path: string, name: string): Promise<void>;
    CreateDeviceAsync(path: string, name: string): Promise<void>;
    CreateCategoryAsync(path: string, name: string): Promise<void>;
    CreateStringObjectAsync(path: string, name: string, value: string, createObject: boolean, role?: string): Promise<void>;
    CreateBooleanObjectAsync(path: string, name: string, role: string, value: boolean, createObject: boolean): Promise<void>;
    CreateWritableStringObjectAsync(path: string, name: string, role: string, deviceId: string): Promise<void>;
    CreateOrUpdateParameterObjectAsync(
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
    ): Promise<void>;
    SetStateAsync(path: string, value: string | number | boolean | null): Promise<void>;
}

export type StateValue = string | number | boolean;

export type AdapterConfig = ioBroker.AdapterConfig;
export type RenameData = ioBroker.RenameData;
