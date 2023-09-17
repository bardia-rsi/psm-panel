import { combineReducers } from "@reduxjs/toolkit";
import core from "@/app/reducers/core"
import entities from "@/app/reducers/entities";

const reducers = combineReducers({ core, entities });

export default reducers;