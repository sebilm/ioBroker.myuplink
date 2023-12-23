// This file extends the AdapterConfig type from "@types/iobroker"

// Augment the globally declared type ioBroker.AdapterConfig
declare global {
    namespace ioBroker {
        interface AdapterConfig {
            AuthCode: string;
            CallbackURL: string;
            Configured: boolean;
            Identifier: string;
            Interval: number;
            Language: string;
            Secret: string;
            AddData: boolean;
            AddRawData: boolean;
            AddActiveNotifications: boolean;
            AddRawActiveNotifications: boolean;
        }
    }
}

// this is required so the above AdapterConfig is found by TypeScript / type checking
export {};
