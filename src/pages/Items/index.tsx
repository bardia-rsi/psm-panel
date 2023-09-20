import type { FC, ReactElement, ChangeEvent } from "react";
import type { EntityStates } from "@/types/App/DataTypes";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { camelCase } from "lodash";
import { motion } from "framer-motion";
import cn from "classnames";
import { useGetEntity } from "@/hooks/data/entities";
import Loader from "@/pages/Items/Loader";
import Navbar from "@/pages/Items/Navbar";

const ItemsPage: FC = (): ReactElement => {

    const [query, setQuery] = useState<string>("");
    const params = useParams<"type">();

    const page = camelCase(params.type) as EntityStates;

    const { status, items, sortBy, order } = useGetEntity(page);

    const searchBarChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

    return (
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
                        <Navbar page={page}
                                sortBy={sortBy}
                                order={order}
                                itemsLength={Object.keys(items).length}
                                setModelIsOpen={() => {}}
                                onChange={searchBarChangeHandler}
                                value={query}
                        />
                    )
            }
        </motion.div>
    )

}

export default ItemsPage;