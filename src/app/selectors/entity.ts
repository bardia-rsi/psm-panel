import type { StateSelector } from "@/app/selectors/state";
import type { Dictionary } from "@/types/Types";
import type { Company } from "@/types/Data/Entities/Company";
import type { ContactMeta } from "@/types/Data/Entities/Contact";
import type { LoginStored, LoginMeta } from "@/types/Data/Entities/Login";
import type { PaymentCardStored, PaymentCardMeta } from "@/types/Data/Entities/PaymentCard";
import type { WifiPasswordMeta } from "@/types/Data/Entities/WifiPassword";
import type { StoreEntityItemWithType, EntityItemWithType } from "@/types/Data/Entities/Entity";
import type { StoredFavoriteItem, FavoriteItem } from "@/types/Data/Entities/Favorite";
import type { EntityState } from "@/types/App/States";
import { createSelector } from "@reduxjs/toolkit";
import { pickBy } from "lodash";
import { selectState } from "@/app/selectors/state";
import { createEntitySelector } from "@/helpers/selector";
import { sort } from "@/utils/array";

export const selectCompanies = createSelector<[StateSelector], Dictionary<Company>>(
    selectState,
    state => state.entities.companies.items
);

export const selectBanks = createSelector<[StateSelector], Dictionary<Company>>(
    selectState,
    state => pickBy(state.entities.companies.items, item => item.isBank)
);

export const selectContacts = createEntitySelector<ContactMeta>("contacts");

export const selectLogins = createEntitySelector<LoginStored, LoginMeta>("logins", true);

export const selectPaymentCards = createEntitySelector<PaymentCardStored, PaymentCardMeta>("paymentCards", true);

export const selectWifiPasswords = createEntitySelector<WifiPasswordMeta>("wifiPasswords");

export const selectTrash = createEntitySelector<StoreEntityItemWithType, EntityItemWithType>("trash", true);

export const selectFavorites = createEntitySelector<StoredFavoriteItem, FavoriteItem>("favorites", true);

export const selectEntities = createSelector<[StateSelector], EntityState<EntityItemWithType>>(
    selectState,
    (state) => ({
        ...state.entities.home,
        items: Object.fromEntries(
            sort<EntityItemWithType>(
                [
                    ...Object.values(selectFavorites(state).items),
                    ...Object.values(selectContacts(state).items).map(item => ({ ...item, type: "contact" })),
                    ...Object.values(selectLogins(state).items).map(item => ({ ...item, type: "login" })),
                    ...Object.values(selectPaymentCards(state).items).map(item => ({ ...item, type: "paymentCard" })),
                    ...Object.values(selectWifiPasswords(state).items).map(item => ({ ...item, type: "wifiPassword" }))
                ] as EntityItemWithType[],
                state.entities.home.sortBy,
                state.entities.home.order
            ).map(item => [item.pid, item])
        )
    })
);