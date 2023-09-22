import type { FC, ReactElement, ChangeEvent } from "react";
import type { EntityStates, EntityStateTypes } from "@/types/App/DataTypes";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { camelCase } from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";
import { useGetEntity } from "@/hooks/data/entities";
import Loader from "@/pages/Items/Loader";
import Navbar from "@/pages/Items/Navbar";
import Empty from "@/pages/Items/Empty";
import Items from "@/pages/Items/Items";
import Form from "@/pages/Items/Form";

const ItemsPage: FC = (): ReactElement => {

    const [modelIsOpen, setModelIsOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const params = useParams<"type">();

    const page = camelCase(params.type) as EntityStates;
    const entityPage: EntityStateTypes | undefined = page !== "home" && page !== "trash" && page !== "favorites"
        ? page
        : undefined;

    const { status, items, sortBy, order } = useGetEntity(page);

    const searchBarChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

    return (
        <>
            <motion.div className={cn(
                "w-full lg:w-1/3 min-h-screen max-h-screen bg-primary flex flex-col",
                "sm:border-l-2 sm:border-l-primary overflow-y-auto"
            )}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "tween" }}>
                {
                    status !== "succeeded"
                        ? <Loader />
                        : (
                            <>
                                <Navbar page={page}
                                        sortBy={sortBy}
                                        order={order}
                                        itemsLength={Object.keys(items).length}
                                        setModelIsOpen={setModelIsOpen}
                                        onChange={searchBarChangeHandler}
                                        value={query}
                                />
                                <div className="flex flex-col flex-nowrap px-4 pb-4">
                                    <AnimatePresence mode="wait">
                                        {
                                            Object.keys(items).length === 0
                                                ? <Empty key="e" page={page} />
                                                : <Items key="i" page={entityPage} items={items} query={query} />
                                        }
                                    </AnimatePresence>
                                </div>
                            </>
                        )
                }
            </motion.div>
            { entityPage && <Form setModelIsOpen={setModelIsOpen} modelIsOpen={modelIsOpen} page={entityPage} /> }
        </>
    )

}

export default ItemsPage;