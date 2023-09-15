import type { BaseEntityMeta, Timestamps } from "@/types/Data/Base";

interface WifiPasswordBase {
    name: string;
    password: string;
    url: string | null;
    routerUsername: string | null;
    routerPassword: string | null;
}

export interface WifiPasswordMeta extends WifiPasswordBase, BaseEntityMeta, Timestamps {}

export interface WifiPasswordMetaWithType extends WifiPasswordMeta {
    type: "wifiPassword";
}