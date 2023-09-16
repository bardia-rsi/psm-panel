import type { ContactMeta, ContactCreatePayload, ContactUpdatePayload } from "@/types/Data/Entities/Contact";
import { entitySliceCreator } from "@/helpers/sliceCreator";

const { slice, extraActions } = entitySliceCreator<
    ContactMeta,
    ContactCreatePayload,
    ContactUpdatePayload
>("contacts");

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