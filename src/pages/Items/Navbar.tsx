import type { Dispatch, SetStateAction, ChangeEventHandler, FC, ReactElement } from "react";
import type { SortBy, Order } from "@/types/App/States";
import type { EntityStates } from "@/types/App/DataTypes";
import { useRef } from "react";
import { startCase } from "lodash";
import { useSticky } from "@/hooks/useSticky";
import HamburgerMenuButton from "@/components/HamburgerMenuButton";
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

    const nav = useRef<HTMLDivElement>(null);

    useSticky(
        nav,
        (isSticky) => {
            if (nav.current) {
                nav.current.classList.toggle("shadow-[rgb(var(--bg-primary))]", isSticky);
                nav.current.classList.toggle("shadow-xl", isSticky);
            }
        }
    );

    return (
        <nav className="bg-primary flex gap-x-2 p-4 sticky -top-[0.0025rem] transition duration-300 z-10" ref={nav}>
            <HamburgerMenuButton />
            <SearchInput placeholder={
                itemsLength === 0
                    ? "There is nothing to be searched"
                    : page === "home"
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
                page !== "trash" && page !== "favorites" && page !== "home" && (
                    <Button variant="filled" onClick={() => setModelIsOpen(true)}>
                        <Icon src="/icons/plus.svg" />
                    </Button>
                )
            }
        </nav>
    );

}

export default Navbar;