import type * as Contact from "@/types/Data/Entities/Contact";
import type * as Login from "@/types/Data/Entities/Login";
import type * as PaymentCard from "@/types/Data/Entities/PaymentCard";
import type * as WifiPassword from "@/types/Data/Entities/WifiPassword";

export type EntityItemWithType =
    Contact.ContactMetaWithType |
    Login.LoginMetaWithType |
    PaymentCard.PaymentCardMetaWithType |
    WifiPassword.WifiPasswordMetaWithType;

export type StoredEntityItem =
    Contact.ContactMeta |
    Login.LoginStored |
    PaymentCard.PaymentCardStored |
    WifiPassword.WifiPasswordMeta;

export type StoreEntityItemWithType =
    Contact.ContactMetaWithType |
    Login.LoginStoredWithType |
    PaymentCard.PaymentCardStoredWithType |
    WifiPassword.WifiPasswordMetaWithType;