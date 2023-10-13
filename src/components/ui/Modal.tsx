import type { ReactNode, FC, ReactElement } from "react";
import { useRef, cloneElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";
import { useOnclickOutside } from "@/hooks/useOnclickOutside";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface Props {
    isOpen: boolean;
    setIsOpen: () => void;
    title: string;
    children: ReactNode;
    className?: string;
    onExitComplete?: () => void;
}

const Modal: FC<Props> = ({ isOpen, setIsOpen, title, children, className, onExitComplete }): ReactElement => {

    const wrapperEl = useRef(null);

    useOnclickOutside([wrapperEl], setIsOpen, isOpen);

    return cloneElement(
        <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
            {
                isOpen && (
                    <motion.div className={cn(
                        "w-full flex justify-center items-center",
                        "fixed top-0 right-0 bottom-0 left-0 sm:p-8 md:p-12 z-[100]"
                    )}
                                initial={{ opacity: 0, backgroundColor: "rgb(0 0 0 / 0)", backdropFilter: "blur(0)" }}
                                animate={{ opacity: 1, backgroundColor: "rgb(0 0 0 / 0.4)", backdropFilter: "blur(8px)" }}
                                exit={{ opacity: 0, backgroundColor: "rgb(0 0 0 / 0)", backdropFilter: "blur(0)" }}>
                        <div className={cn(
                            "sm:min-h-min max-h-full bg-secondary p-4",
                            "rounded-md shadow-2xl overflow-y-auto",
                            className
                        )}
                             ref={wrapperEl}>
                            <h3 className="flex justify-between items-center gap-x-4 text-xl">
                                { title }
                                <Button variant="icon"
                                        compact
                                        type="button"
                                        size="sm"
                                        onClick={setIsOpen}>
                                    <Icon src="/icons/xmark.svg" />
                                </Button>
                            </h3>
                            { children }
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>,
        document.body
    );
}

export default Modal;