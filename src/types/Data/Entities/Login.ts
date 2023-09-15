import type { PIDR, BaseEntityMeta, Timestamps, Password } from "@/types/Data/Base";
import type { Company } from "@/types/Data/Entities/Company";

interface LoginBase {
    url: string;
    email: string | null;
    username: string | null;
    securityQuestions: {
        pid: PIDR;
        question: string;
        answer: string;
    }[];
    phoneNumber: string | null;
    name: string | null;
    dateOfBirth: string | null;
    gender: string | null;
    address: string | null;
}

export interface LoginMeta extends LoginBase, Timestamps, BaseEntityMeta {
    company: Company;
    password: {
        current: Password;
        history: Password[];
    }
    lastUsed: string | null;
}

export interface LoginMetaWithType extends LoginMeta {
    type: "login";
}

export interface LoginStored extends Omit<LoginMeta, "company"> {
    company: PIDR;
}

export interface LoginStoredWithType extends LoginStored {}