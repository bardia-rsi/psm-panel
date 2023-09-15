import type { BaseEntityMeta, Timestamps } from "@/types/Data/Base";

interface ContactBase {
    name: string;
    phoneNumber: string;
    work: string | null;
    email: string | null;
    address: string | null;
    website: string | null;
}

export interface ContactMeta extends ContactBase, BaseEntityMeta, Timestamps {}

export interface ContactMetaWithType extends ContactMeta {
    type: "contact";
}