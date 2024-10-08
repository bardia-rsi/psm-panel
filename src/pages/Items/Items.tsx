import type { FC, ReactElement } from "react";
import type { Dictionary } from "@/types/Types";
import type { EntityStates } from "@/types/App/DataTypes";
import type { EntityItemWithType } from "@/types/Data/Entities/Entity";
import type { Props as ItemProps } from "@/pages/Items/Item";
import { AnimatePresence, motion } from "framer-motion";
import { convertStateNameToType } from "@/utils/entity";
import Item from "@/pages/Items/Item";
import NotFound from "@/pages/Items/NotFound";

interface Props {
    page: EntityStates;
    items: Dictionary<EntityItemWithType>;
    query: string;
}

const Items: FC<Props> = ({ items, page, query }): ReactElement => {

    const filteredItems = Object.values(items).filter(item => {

        const searchField: string = "company" in item
            ? item.company.name
            : "bank" in item
                ? (item.bank?.name ?? item.owner)
                : item.name;

        return searchField.toLowerCase().indexOf(query.toLowerCase()) !== -1;

    });

    return filteredItems.length === 0
        ? <NotFound />
        : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AnimatePresence>
                    {
                        filteredItems.map(item => {

                            item = { ...item }

                            item.type = page !== "allItems" && page !== "trash" && page !== "favorites"
                                ? convertStateNameToType(page)
                                : item.type;

                            const itemProps:ItemProps = {
                                pid: item.pid,
                                logo: {
                                    size: "md"
                                },
                                title: ""
                            }

                            switch (item.type) {
                                case "contact":
                                    itemProps.logo.name = item.name;
                                    itemProps.logo.className = "!rounded-full";
                                    itemProps.title = item.name;

                                    break;
                                case "login":
                                    itemProps.logo.src = item.company.logo;
                                    itemProps.logo.colors = item.company.colors;
                                    itemProps.logo.name = !item.company.logo
                                        ? item.company.name
                                        : undefined;
                                    itemProps.title = item.company.name;
                                    itemProps.subtitle = item.email ||
                                        item.phoneNumber ||
                                        item.username;

                                    break;
                                case "paymentCard":
                                    itemProps.logo.src = item.bank?.logo;
                                    itemProps.logo.colors = item.bank?.colors;
                                    itemProps.logo.name = item.bank?.logo
                                        ? item.bank.name
                                        : item.owner
                                    itemProps.title = item.bank?.name ?? "Not Recognized Bank";
                                    itemProps.subtitle = item.owner;

                                    break;
                                case "wifiPassword":
                                    itemProps.logo.local = "/icons/wifi.svg";
                                    itemProps.title = item.name;
                            }

                            return <Item {...itemProps} key={item.pid} />;

                        })
                    }
                </AnimatePresence>
            </motion.div>
        )

}

export default Items;