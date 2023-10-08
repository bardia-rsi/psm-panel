import type { PIDR, BaseEntityMeta, Timestamps } from "@/types/Data/Base";
import type { Company } from "@/types/Data/Entities/Company";

interface LoginBase {
    url: string;
    email: string | null;
    username: string | null;
    phoneNumber: string | null;
    password: string | null
}

export interface LoginCreatePayload extends RequiredKeys<Partial<LoginBase & BaseEntityMeta>, "url"> {
    company: PIDR | Company;
}

export interface LoginUpdatePayload extends RequiredKeys<RecursivePartial<LoginCreatePayload>, "pid"> {}

export interface LoginMeta extends LoginBase, Timestamps, BaseEntityMeta {
    company: Company;
    lastUsed: string | null;
}

export interface LoginMetaWithType extends LoginMeta {
    type: "login";
}

export interface LoginStored extends Omit<LoginMeta, "company"> {
    company: PIDR;
}

export interface LoginStoredWithType extends LoginStored {}