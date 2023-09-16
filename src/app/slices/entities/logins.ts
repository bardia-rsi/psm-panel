import type { LoginMeta, LoginCreatePayload, LoginUpdatePayload, LoginStored } from "@/types/Data/Entities/Login";
import { entitySliceCreator } from "@/helpers/sliceCreator";

const { slice, extraActions } = entitySliceCreator<
    LoginStored,
    LoginCreatePayload,
    LoginUpdatePayload,
    LoginMeta
>("logins");

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