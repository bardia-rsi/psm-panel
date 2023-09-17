import type { Selector } from "@reduxjs/toolkit";
import type { State } from "@/app/store";

export type StateSelector = Selector<State, State>;

export const selectState: StateSelector = (state) => state;