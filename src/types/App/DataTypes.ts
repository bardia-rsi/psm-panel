export type EntityStates = "allItems" | "contacts" | "logins" | "paymentCards" | "wifiPasswords" | "trash" | "favorites";

export type EntityStateTypes = Exclude<EntityStates, "allItems" | "trash" | "favorites">;

export type EntityTypes = "contact" | "login" | "paymentCard" | "wifiPassword";