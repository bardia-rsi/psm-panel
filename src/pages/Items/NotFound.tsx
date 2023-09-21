import type { FC, ReactElement } from "react";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import Skeleton from "@/components/ui/Skeleton";

const Empty: FC = (): ReactElement => (
    <motion.div className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
        <SVG src="/images/empty.svg" loader={<Skeleton h={20} />} className="w-3/4 xs:w-1/2 lg:w-3/4 mb-4" />
        <h5 className="text-center">Not Found</h5>
        <p className="max-w-[75%] mx-auto text-semibold text-center">
            The item you are looking for was deleted or might never existed!
        </p>
    </motion.div>
);

export default Empty;