import type * as WifiPassword from "@/types/Data/Entities/WifiPassword";
import { entitySliceCreator } from "@/helpers/sliceCreator";

const { slice, extraActions } = entitySliceCreator<
    WifiPassword.WifiPasswordMeta,
    WifiPassword.WifiPasswordCreatePayload,
    WifiPassword.WifiPasswordUpdatePayload
>("wifiPasswords");

export const {
    set,
    create,
    update,
    remove,
    addToTrash,
    removeFromTrash,
    addToFavorites,
    removeFromFavorites
} = extraActions;

export const {
    "remove/soft": softRemove,
    "order/change": changeOrder,
    "sortBy/change": changeSortBy
} = slice.actions;

export default slice.reducer;