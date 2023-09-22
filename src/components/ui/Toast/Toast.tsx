import type { FC, ReactElement } from "react";
import type { Toast as Props } from "@/components/ui/Toast/Context";
import { useEffect, useState } from "react";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/hooks/useToast";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const Toast: FC<Props> = (
    { id, content, type, autoRemove = true, duration = 3000, className, onRemoveComplete }
): ReactElement => {

    const [ isRemoved, setIsRemoved ] = useState<boolean>(false);

    const { removeToast } = useToast();

    useEffect(() => {

        let timer: NodeJS.Timeout | null = null;

        if (autoRemove && duration) {

            timer = setTimeout(() => {

                setIsRemoved(true);

                if (onRemoveComplete) {
                    onRemoveComplete();
                }

            }, duration);

        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };

    }, [autoRemove, duration, id, removeToast]);

    return (
        <AnimatePresence onExitComplete={() => removeToast(id)}>
            { !isRemoved && (
                <motion.div initial={{ translateY: -40, opacity: 0 }}
                            animate={{ translateY: 0, opacity: 1 }}
                            exit={{ translateY: -40, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            layout
                            className={cn(
                                "max-w-full lg:max-w-100 flex justify-center items-center gap-x-4 relative",
                                "py-2 px-4 rounded-md shadow-xl",
                                type === "success" && "bg-green-700",
                                type === "danger" && "bg-red-700",
                                type === "warning" && "bg-orange-700",
                                type === "info" && "bg-blue-700",
                                className
                            )}>
                    <p className="text-white text-center font-semibold">{ content }</p>
                    { !autoRemove && (
                        <Button variant="icon"
                                size="sm"
                                compact
                                className="!p-0"
                                onClick={() => setIsRemoved(true)}>
                            <Icon src="/icons/xmark.svg" />
                        </Button>
                    ) }
                </motion.div>
            ) }
        </AnimatePresence>
    );

}

export default Toast;