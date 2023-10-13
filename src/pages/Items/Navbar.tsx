import type { ChangeEventHandler, Dispatch, SetStateAction, FC, ReactElement } from "react";
import type { SortBy, Order } from "@/types/App/States";
import type { EntityStates } from "@/types/App/DataTypes";
import { startCase } from "lodash";
import NavbarLayout from "@/layouts/Navbar";
import SearchInput from "@/components/ui/Form/search";
import Filter from "@/pages/Items/Filter";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface Props {
    page: EntityStates;
    itemsLength: number;
    sortBy: SortBy | string;
    order: Order;
    onQueryChange?: ChangeEventHandler<HTMLInputElement>;
    query?: string;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Navbar: FC<Props> = ({
    itemsLength, page, sortBy, order, onQueryChange, query, setModalIsOpen
}): ReactElement => {
    return (
        <NavbarLayout>
            <SearchInput placeholder={
                itemsLength === 0
                    ? "There is nothing to be searched"
                    : page === "allItems"
                        ? "Search through your all items"
                        : `Search through your ${startCase(page).toLowerCase()}`
            }
                         onChange={onQueryChange}
                         value={query} />
            { itemsLength !== 0 && (
                <Filter stateName={page}
                        sortByDefaultValue={sortBy}
                        orderDefaultValue={order}
                        extraSortByValues={page === "favorites"
                            ? { value: "favorite", label: "Recently stared" }
                            : page === "trash"
                                ? { value: "trash", label :"Recently trashed" }
                                : undefined
                        } />
            )}
            {
                page !== "trash" && page !== "favorites" && page !== "allItems" && (
                    <Button variant="filled" onClick={() => setModalIsOpen(true)}>
                        <Icon src="/icons/plus.svg" />
                    </Button>
                )
            }
        </NavbarLayout>
    );
}

export default Navbar;