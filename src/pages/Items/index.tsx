import type { FC, ReactElement, ChangeEvent } from "react";
import type { EntityStates } from "@/types/App/DataTypes";
import { Fragment, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";
import { useGetEntity } from "@/hooks/data/entities";
import Loader from "@/pages/Items/Loader";
import Navbar from "@/pages/Items/Navbar";
import Empty from "@/pages/Items/Empty";
import Items from "@/pages/Items/Items";
import Form from "@/pages/Items/Form";

interface Props {
    page: EntityStates;
}

const ItemsPage: FC<Props> = ({ page }): ReactElement => {

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const location = useLocation();
    const currentOutlet = useOutlet();

    const locationArr = location?.pathname.split("/") ?? [];

    const { status, items, sortBy, order } = useGetEntity(page);

    const searchBarChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

    return (
        <>
            <motion.div className={cn(
                "w-full lg:w-1/3 min-h-full max-h-full bg-primary flex flex-col",
                "sm:border-l-2 sm:border-l-primary overflow-y-auto"
            )}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "tween" }}>
                { status === "idle" || status === "loading" && <Loader /> }
                {
                    status === "succeeded" && (
                        <>
                            <Navbar page={page}
                                    sortBy={sortBy}
                                    order={order}
                                    itemsLength={Object.keys(items).length}
                                    setModalIsOpen={setModalIsOpen}
                                    onQueryChange={searchBarChangeHandler}
                                    query={query}
                            />
                            <div className="flex flex-col flex-nowrap px-4 pb-4">
                                <AnimatePresence mode="wait">
                                    {
                                        Object.keys(items).length === 0
                                            ? <Empty key="e" page={page} />
                                            : <Items key="i" page={page} items={items} query={query} />
                                    }
                                </AnimatePresence>
                            </div>
                        </>
                    )
                }
            </motion.div>
            {
                page !== "allItems" && page !== "trash" && page !== "favorites" && (
                    <Form setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} page={page} />
                )
            }
            <AnimatePresence mode="wait">
                <Fragment key={locationArr[2]}>
                    { currentOutlet }
                </Fragment>
            </AnimatePresence>
        </>
    )

}

export default ItemsPage;