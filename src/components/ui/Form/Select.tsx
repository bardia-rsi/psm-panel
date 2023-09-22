import type { FC, ReactElement } from "react";
import type { FormikContextType, FieldInputProps, FieldMetaProps } from "formik";
import { useState, useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { omit } from "lodash";
import cn from "classnames";
import { useOnclickOutside } from "@/hooks/useOnclickOutside";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface Props {
    label: string;
    name: string;
    labels: string[];
    defaultLabel?: number;
}

const Select: FC<Props> = ({ name, label, labels, defaultLabel = 0 }): ReactElement => {

    const [selectedItem, setSelectedItem] = useState<string>(labels[defaultLabel]);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const selectElement = useRef<HTMLDivElement>(null);

    const { getFieldProps, getFieldMeta, setFieldValue }: FormikContextType<any> = useFormikContext();
    const field: FieldInputProps<any> = getFieldProps(name);
    const meta: FieldMetaProps<any> = getFieldMeta(name);
    const error: boolean = Boolean(meta.touched && meta.error);

    const openToggle = (): void => setIsOpen(prevState => !prevState);

    const selectItemHandler = (value: string): void => {
        setIsOpen(false);
        setSelectedItem(value);
    }

    useEffect(() => {

        setFieldValue(name, selectedItem);

    }, [setFieldValue, name, selectedItem]);

    useOnclickOutside([selectElement], () => setIsOpen(false), isOpen);

    return (
        <div className="relative" ref={selectElement}>
            <Button variant="custom"
                    value={selectedItem}
                    type="button"
                    full
                    className={cn(
                        "h-[3.25rem] text-primary pt-4 px-6 pb-1.5 text-left font-medium",
                        "border-transparent hover:bg-fourth",
                        isOpen ? "bg-fourth rounded-b-none" : "bg-tertiary",
                        error && "border-red-500"
                    )}
                    onClick={openToggle}
                    {...omit(field, "onChange", "value")}>
                <span className="flex-1 text-primary">{ selectedItem }</span>
                <motion.span className="flex justify-center absolute top-1/2 right-[1.625rem] -translate-y-1/2"
                             animate={{ transform: isOpen ? "translate(0,-50%) rotate(180deg)" : "translate(0,-50%)" }}
                             transition={{ type: "tween", duration: 0.3 }}>
                    <Icon src="/icons/collapse-arrow.svg" w={0.75} h={0.75} className="[&>*]:fill-primary" />
                </motion.span>
            </Button>
            <span className={cn(
                "text-primary text-xs absolute top-[26%] left-[1.625rem] capitalize -translate-y-1/2",
                "transition-all duration-300",
                error && "text-red-500"
            )}>
                { label }
            </span>
            <AnimatePresence>
                {
                    isOpen && (
                        <motion.div initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className={cn(
                                        "max-h-80 bg-tertiary flex flex-col absolute top-full left-0 right-0 z-10",
                                        "rounded-b-lg overflow-y-auto transition-all duration-300",
                                        "shadow-black/40 dark:shadow-black shadow-2xl"
                                    )}>
                            {
                                labels.map(label => (
                                    <Button key={label}
                                            variant="custom"
                                            type="button"
                                            value={label}
                                            className={cn(
                                                "!justify-start",
                                                "bg-tertiary text-primary py-2 px-6",
                                                "text-left font-medium border-transparent",
                                                "hover:bg-ac-primary-500 hover:text-white"
                                            )}
                                            onClick={() => selectItemHandler(label)}>
                                        { label }
                                    </Button>
                                ))
                            }
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    );

}

export default Select;