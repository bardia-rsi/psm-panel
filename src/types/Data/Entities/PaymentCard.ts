import type { BaseEntityMeta, PIDR, Timestamps } from "@/types/Data/Base";
import type { Company } from "@/types/Data/Entities/Company";

interface PaymentCardBase {
    owner: string;
    cardNumber: string;
    password: string | null;
    cvv2: string | null;
    expiration: string | null;
}

export interface PaymentCardCreatePayload extends RequiredKeys<Partial<PaymentCardBase & BaseEntityMeta>, "owner" | "cardNumber"> {
    bank: PIDR | Company;
}

export interface PaymentCardUpdatePayload extends RequiredKeys<Partial<PaymentCardCreatePayload>, "pid"> {}

export interface PaymentCardMeta extends PaymentCardBase, BaseEntityMeta, Timestamps {
    bank: Company;
}

export interface PaymentCardMetaWithType extends PaymentCardMeta {
    type: "paymentCard";
}

export interface PaymentCardStored extends Omit<PaymentCardMeta, "bank"> {
    bank: PIDR;
}

export interface PaymentCardStoredWithType extends PaymentCardStored {}