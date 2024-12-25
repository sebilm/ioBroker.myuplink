/**
 * Logger interface for logging messages at different levels.
 */
export interface Logger {
    /**
     * Logs a silly level message.
     *
     * @param msg - The message to log.
     */
    silly(msg: string): void;

    /**
     * Logs a debug level message.
     *
     * @param msg - The message to log.
     */
    debug(msg: string): void;

    /**
     * Logs an info level message.
     *
     * @param msg - The message to log.
     */
    info(msg: string): void;

    /**
     * Logs an error level message.
     *
     * @param msg - The message to log.
     */
    error(msg: string): void;

    /**
     * Logs a warn level message.
     *
     * @param msg - The message to log.
     */
    warn(msg: string): void;
}

/**
 * DataTarget interface for creating and updating various objects asynchronously.
 */
export interface DataTarget {
    /**
     * Creates a system asynchronously.
     *
     * @param path - The path of the system.
     * @param name - The name of the system.
     */
    CreateSystemAsync(path: string, name: string): Promise<void>;

    /**
     * Creates a device asynchronously.
     *
     * @param path - The path of the device.
     * @param name - The name of the device.
     */
    CreateDeviceAsync(path: string, name: string): Promise<void>;

    /**
     * Creates a category asynchronously.
     *
     * @param path - The path of the category.
     * @param name - The name of the category.
     */
    CreateCategoryAsync(path: string, name: string): Promise<void>;

    /**
     * Creates a string object asynchronously.
     *
     * @param path - The path of the object.
     * @param name - The name of the object.
     * @param value - The value of the object.
     * @param createObject - Whether to create the object.
     * @param role - The role of the object (optional).
     */
    CreateStringObjectAsync(
        path: string,
        name: string,
        value: string,
        createObject: boolean,
        role?: string,
    ): Promise<void>;

    /**
     * Creates a boolean object asynchronously.
     *
     * @param path - The path of the object.
     * @param name - The name of the object.
     * @param role - The role of the object.
     * @param value - The value of the object.
     * @param createObject - Whether to create the object.
     */
    CreateBooleanObjectAsync(
        path: string,
        name: string,
        role: string,
        value: boolean,
        createObject: boolean,
    ): Promise<void>;

    /**
     * Creates a writable string object asynchronously.
     *
     * @param path - The path of the object.
     * @param name - The name of the object.
     * @param role - The role of the object.
     * @param deviceId - The device ID.
     */
    CreateWritableStringObjectAsync(path: string, name: string, role: string, deviceId: string): Promise<void>;

    /**
     * Creates or updates a parameter object asynchronously.
     *
     * @param path - The path of the object.
     * @param name - The name of the object.
     * @param deviceId - The device ID (optional).
     * @param parameterId - The parameter ID (optional).
     * @param role - The role of the object.
     * @param writable - Whether the object is writable.
     * @param unit - The unit of the object (optional).
     * @param min - The minimum value of the object (optional).
     * @param max - The maximum value of the object (optional).
     * @param step - The step value of the object (optional).
     * @param states - The states of the object (optional).
     */
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

    /**
     * Sets the state asynchronously.
     *
     * @param path - The path of the state.
     * @param value - The value of the state.
     */
    SetStateAsync(path: string, value: string | number | boolean | null): Promise<void>;
}

/**
 * Type for state values, which can be a string, number, or boolean.
 */
export type StateValue = string | number | boolean;

/**
 * Type alias for ioBroker.AdapterConfig.
 */
export type AdapterConfig = ioBroker.AdapterConfig;

/**
 * Type alias for ioBroker.RenameData.
 */
export type RenameData = ioBroker.RenameData;
