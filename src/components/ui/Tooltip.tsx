import type { ReactNode, ReactElement, FC } from "react";
import { cloneElement, useState } from "react";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";

type Position = "top" | "right" | "bottom" | "left";

interface Props {
    content: ReactNode;
    position?: Position;
    className?: string;
    wrapperClassName?: string;
    children: ReactElement;
}

const Tooltip: FC<Props> = ({ content, position = "top", className, wrapperClassName, children }): ReactElement => {

    const [show, setShow] = useState<boolean>(false);

    return (
        <div className={cn("relative", wrapperClassName)}>
            <AnimatePresence mode="wait">
                {
                    show && (
                        <motion.div initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ type: "tween", duration: 0.3 }}
                                    className={cn("bg-full text-primary absolute py-2 px-3 z-50 rounded-md",
                                        "text-sm font-semibold shadow-lg",
                                        "before:content-[''] before:w-2 before:h-2 before:bg-full before:absolute",
                                        "before:rounded-sm before:-translate-y-1/2 before:-translate-x-1/2",
                                        "before:rotate-45 before:shadow-lg",
                                        (position === "top" || position === "bottom") && (
                                            "left-1/2 -translate-x-1/2 before:left-1/2"
                                        ),
                                        (position === "left" || position === "right") && (
                                            "top-1/2 -translate-y-1/2 before:top-1/2"
                                        ),
                                        position === "top" && "bottom-full before:top-full",
                                        position === "bottom" && "top-full before:bottom-full",
                                        position === "left" && "right-full left:top-full",
                                        position === "right" && "left-full right:top-full",
                                        className
                                    )}>
                            { content }
                        </motion.div>
                    )
                }
            </AnimatePresence>
            {
                cloneElement(children, {
                    onMouseOver: () => {

                        setShow(true);

                        if (children.props.onMouseOver) {
                            children.props.onMouseOver();
                        }

                    },
                    onMouseLeave: () => {

                        setShow(false);

                        if (children.props.onMouseLeave) {
                            children.props.onMouseLeave();
                        }

                    }
                })
            }
        </div>
    );

}

export type { Props };

export default Tooltip;