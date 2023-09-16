import type * as PaymentCard from "@/types/Data/Entities/PaymentCard";
import { entitySliceCreator } from "@/helpers/sliceCreator";

const { slice, extraActions } = entitySliceCreator<
    PaymentCard.PaymentCardStored,
    PaymentCard.PaymentCardCreatePayload,
    PaymentCard.PaymentCardUpdatePayload,
    PaymentCard.PaymentCardMeta
>("paymentCards");

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