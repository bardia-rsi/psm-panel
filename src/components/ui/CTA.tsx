import type { FC, ReactElement } from "react";
import type { CTA as BasicProps } from "@/types/Elements/CTA";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Link from "@/components/ui/Link";

interface Props extends BasicProps {
    className?: string;
}

const CTA: FC<Props> = ({ icon, title, description, submitBtn, cancelBtnText, className }): ReactElement => {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const close = (): void => setIsOpen(false);

    return (
        <AnimatePresence>
            {
                isOpen && (
                    <motion.div initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={cn("w-full bg-tertiary p-4 rounded-md relative", className)}>
                        <Button variant="icon"
                                size="sm"
                                compact
                                className="absolute top-2 right-2"
                                onClick={close}>
                            <Icon src="/icons/xmark.svg" />
                        </Button>
                        { icon && <Icon src={icon} w={4} className="mb-4 [&>*]:fill-primary" /> }
                        <h6 className="mb-2">{ title }</h6>
                        <p className="text-sm mb-2">{ description }</p>
                        <div className="flex flex-wrap gap-x-4">
                            <Link to={submitBtn.href} variant="filled" size="sm" className="flex-1">
                                { submitBtn.text }
                            </Link>
                            {
                                cancelBtnText && (
                                    <Button variant="text" size="sm" className="flex-1" onClick={close}>
                                        { cancelBtnText }
                                    </Button>
                                )
                            }
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    );

}

export default CTA;