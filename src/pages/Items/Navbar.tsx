import type { Dispatch, SetStateAction, ChangeEventHandler, FC, ReactElement } from "react";
import type { SortBy, Order } from "@/types/App/States";
import type { EntityStates } from "@/types/App/DataTypes";
import { startCase } from "lodash";
import NavbarLayout from "@/layouts/Navbar";
import SearchInput from "@/components/ui/Form/search";
import Filter from "@/components/Filter";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface Props {
    page: EntityStates;
    itemsLength: number;
    sortBy: SortBy | string;
    order: Order;
    setModelIsOpen: Dispatch<SetStateAction<boolean>>;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    value?: string;
}

const Navbar: FC<Props> = ({ itemsLength, page, sortBy, order, setModelIsOpen, onChange, value }): ReactElement => {

    return (
        <NavbarLayout>
            <SearchInput placeholder={
                itemsLength === 0
                    ? "There is nothing to be searched"
                    : page === "allItems"
                        ? "Search through your all items"
                        : `Search through your ${startCase(page).toLowerCase()}`
            }
                         onChange={onChange}
                         value={value} />
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
                    <Button variant="filled" onClick={() => setModelIsOpen(true)}>
                        <Icon src="/icons/plus.svg" />
                    </Button>
                )
            }
        </NavbarLayout>
    );

}

export default Navbar;