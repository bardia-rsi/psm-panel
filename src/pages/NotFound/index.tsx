import type { FC, ReactElement } from "react";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";

const NotFound: FC = (): ReactElement => (
    <motion.div className="w-full max-h-full flex p-8 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween" }}>
        <div className="w-full flex flex-col items-center justify-center gap-y-8">
            <SVG src="/images/page-not-found.svg" className="w-full max-w-2xl" />
            <h3 className="text-center text-base md:text-lg">
                The page you are looking for was moved, removed, renamed or might never existed.
            </h3>
        </div>
    </motion.div>
);

export default NotFound;