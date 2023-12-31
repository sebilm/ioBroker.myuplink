// This file extends the AdapterConfig type from "@types/iobroker"

// Augment the globally declared type ioBroker.AdapterConfig
declare global {
    namespace ioBroker {
        interface AdapterConfig {
            Configured: boolean;
            Identifier: string;
            Secret: string;
            UseAuthorizationCodeGrant: boolean;
            AuthCode: string;
            CallbackURL: string;
            Interval: number;
            Language: string;
            AddData: boolean;
            AddRawData: boolean;
            GroupData: boolean;
            AddActiveNotifications: boolean;
            AddRawActiveNotifications: boolean;
            RenameSystemIds: RenameData[];
            RenameDeviceIds: RenameData[];
            RenameCategories: RenameData[];
            RenameDataIds: RenameData[];
        }

        interface RenameData {
            OriginalId: string;
            NewId: string;
            Category: string | undefined;
        }
    }
}

// this is required so the above AdapterConfig is found by TypeScript / type checking
export {};
