import type { BaseEntityMeta, PIDR, Timestamps } from "@/types/Data/Base";
import type { Company } from "@/types/Data/Entities/Company";

interface PaymentCardBase {
    owner: string;
    cardNumber: string;
    password: string | null;
    cvv2: string | null;
    expiration: string | null;
}

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