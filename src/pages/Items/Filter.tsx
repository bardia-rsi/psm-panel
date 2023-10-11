import type { FC, ReactElement } from "react";
import type { EntityStates } from "@/types/App/DataTypes";
import type { SortBy, Order } from "@/types/App/States";
import { useState, useRef } from "react";
import cn from "classnames";
import { useAppDispatch } from "@/app/hooks";
import * as entitiesSlice from "@/app/slices/entities";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";

interface Record<T> {
    id: number;
    label: string;
    value: T;
}

interface Props {
    stateName: EntityStates;
    sortByDefaultValue: string;
    orderDefaultValue: string;
    extraSortByValues?: Omit<Record<string>, "id">;
}

interface FilterValues {
    sortByValues: Record<SortBy | string>[];
    orderValues: Record<Order | string>[];
}

const values: FilterValues = {
    sortByValues: [
        { id: 1, label: "Alphabet", value: "alphabet" },
        { id: 2, label: "Recently created", value: "createdAt" },
        { id: 3, label: "Recently updated", value: "updatedAt" },
        { id: 4, label: "Recently used", value: "lastUsed" }
    ],
    orderValues: [
        { id: 1, label: "Ascending", value: "asc" },
        { id: 2, label: "Descending", value: "desc" }
    ]
}

const Filter: FC<Props> = ({ stateName, sortByDefaultValue, orderDefaultValue, extraSortByValues }): ReactElement => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const btn = useRef<HTMLButtonElement>(null);
    const dispatch = useAppDispatch();

    const data: FilterValues = { ...values };

    const sortByChangeHandler = (value: SortBy): void => {

        dispatch(entitiesSlice[stateName].changeSortBy(value));

        setIsOpen(false);

    }

    const orderChangeHandler = (value: Order): void => {

        dispatch(entitiesSlice[stateName].changeOrder(value));

        setIsOpen(false);

    }

    if (extraSortByValues) {
        data.sortByValues = [
            ...data.sortByValues,
            {
                ...extraSortByValues,
                id:  data.sortByValues[data.sortByValues.length - 1].id + 1
            }
        ]
    }

    return (
        <div className="flex relative">
            <Button variant="custom"
                    className={cn(
                        "border-transparent p-2",
                        "hover:bg-fourth [&>svg>*]:hover:fill-primary",
                        isOpen ? "bg-fourth [&>svg>*]:fill-primary" : "bg-tertiary [&>svg>*]:fill-secondary"
                    )}
                    ref={btn}
                    onClick={() => setIsOpen(prevState => !prevState)}>
                <Icon src="/icons/filter.svg" />
            </Button>
            <Dropdown isOpen={isOpen}
                      btnRef={btn}
                      onClickOutside={() => setIsOpen(false)}
                      className="flex flex-col gap-y-2">
                <h6>Sort by</h6>
                {
                    data.sortByValues.map(record => (
                        <div key={record.id} className="flex items-center">
                            <input id={record.value}
                                   type="radio"
                                   name="sortBy"
                                   value={record.value}
                                   checked={record.value === sortByDefaultValue}
                                   onChange={() => sortByChangeHandler(record.value as SortBy)} />
                            <label htmlFor={record.value}
                                   className="text-primary pl-2 text-sm font-medium whitespace-nowrap cursor-pointer">
                                { record.label }
                            </label>
                        </div>
                    ))
                }
                <hr/>
                <h6>Order</h6>
                {
                    data.orderValues.map(record => (
                        <div key={record.id} className="flex items-center">
                            <input id={record.value}
                                   type="radio"
                                   name="order"
                                   value={record.value}
                                   checked={record.value === orderDefaultValue}
                                   onChange={() => orderChangeHandler(record.value as Order)} />
                            <label htmlFor={record.value}
                                   className="text-primary pl-2 text-sm font-medium whitespace-nowrap cursor-pointer">
                                { record.label }
                            </label>
                        </div>
                    ))
                }
            </Dropdown>
        </div>
    );

}

export type { Props };

export default Filter;