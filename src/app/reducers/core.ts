import { combineReducers } from "@reduxjs/toolkit";
import appData from "@/app/slices/core/appData";
import user from "@/app/slices/core/user";

const reducers = combineReducers({ appData, user });

export default reducers;