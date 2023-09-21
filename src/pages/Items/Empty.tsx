import type { FC, ReactElement } from "react";
import type { EntityStates } from "@/types/App/DataTypes";
import { motion } from "framer-motion";
import { startCase } from "lodash";
import SVG from "react-inlinesvg";
import Skeleton from "@/components/ui/Skeleton";

interface Props {
    page: EntityStates;
}

const Empty: FC<Props> = ({ page }): ReactElement => {

    const pageTitleCase = startCase(page).toLowerCase();

    return (
        <motion.div className="flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
            <SVG src={
                page === "trash"
                    ? "/images/happy-news.svg"
                    : "/images/no-data.svg"
            }
                 loader={<Skeleton h={20} />}
                 className="w-3/4 xs:w-1/2 lg:w-3/4 mb-4"/>
            <h5 className="text-center">
                { page === "trash" ? "Trash is empty" : `No ${pageTitleCase}` }
            </h5>
            <p className="text-semibold text-center">
                {
                    page === "trash"
                        ? "Your trash is empty and ready for a fresh start!"
                        : page === "favorites"
                            ? "Try adding your first favorite item."
                            : `Try adding your first ${pageTitleCase.slice(0, -1)}.`
                }
            </p>
        </motion.div>
    );

}

export default Empty;