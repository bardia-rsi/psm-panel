import { combineReducers } from "@reduxjs/toolkit";
import home from "@/app/slices/entities/home";
import companies from "@/app/slices/entities/companies";
import contacts from "@/app/slices/entities/contacts";
import favorites from "@/app/slices/entities/favorites";
import logins from "@/app/slices/entities/logins";
import paymentCards from "@/app/slices/entities/paymentCards";
import trash from "@/app/slices/entities/trash";
import wifiPasswords from "@/app/slices/entities/wifiPasswords";

const reducers = combineReducers({
    home, favorites, trash, companies, contacts, logins, paymentCards, wifiPasswords
});

export default reducers;