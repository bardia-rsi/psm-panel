export type EntityStates = "home" | "contacts" | "logins" | "paymentCards" | "wifiPasswords" | "trash" | "favorites";

export type EntityStateTypes = Exclude<EntityStates, "home" | "trash" | "favorites">;

export type EntityTypes = "contact" | "login" | "paymentCard" | "wifiPassword";