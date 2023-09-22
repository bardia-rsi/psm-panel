import type { FC, ReactElement, FocusEvent, ChangeEvent } from "react";
import type { Props as FieldProps } from "@/components/ui/Form/Field";
import { useState, useRef } from "react";
import { startCase } from "lodash";
import { motion } from "framer-motion";
import { useFormikContext } from "formik";
import cn from "classnames";
import Dropdown from "@/components/ui/Dropdown";
import Field from "@/components/ui/Form/Field";
import Label from "@/components/ui/Form/Label";

interface Record {
    id: string | number;
    value: string;
    label?: string;
}

interface BaseProps {
    records: Record[];
}

interface Props extends FieldProps, BaseProps {}

const AutoCompleteField: FC<Props> = ({ records, as, name, label, onFocus, onChange, ...rest }): ReactElement => {

    const inputEl = useRef<HTMLInputElement>(null);
    const labelEl = useRef<HTMLLabelElement>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");

    const { setFieldValue } = useFormikContext();

    const focusHandler = (e: FocusEvent<HTMLInputElement> & FocusEvent<HTMLTextAreaElement>): void => {

        if (onFocus) {
            onFocus(e);
        }

        setIsOpen(true);

    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>): void => {

        if (onChange) {
            onChange(e);
        }

        setQuery(e.target.value);

    }

    const itemClickHandler = (value: string): void => {

        setFieldValue(name, value);

        setIsOpen(false);
        setQuery(value);

    }

    const filterRecords = (record: Record): boolean => {

        if (record.label) {
            return record.label.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        }

        return record.value.toLowerCase().indexOf(query.toString()) !== -1;

    }

    return (
        <>
            <Field ref={inputEl}
                   name={name}
                   label={label}
                   onFocus={focusHandler}
                   onChange={changeHandler}
                   {...rest} />
            <Label ref={labelEl} as={as} name={name} label={label} />
            <Dropdown isOpen={isOpen}
                      onClickOutside={() => setIsOpen(false)}
                      btnRef={inputEl}
                      ignoreList={[labelEl]}
                      full
                      className="!bg-transparent !p-0">
                <motion.div className={cn(
                    "w-full max-h-40 flex flex-col bg-primary rounded-md overflow-y-auto overflow-x-hidden"
                )}
                            layout>
                    {
                        records.filter(filterRecords).map(({ id, value, label }) => (
                            <motion.span key={id}
                                         className={cn(
                                             "w-full bg-primary text-primary py-1.5 px-4 rounded-md text-sm",
                                             "cursor-pointer hover:bg-ac-primary-500 hover:text-white"
                                         )}
                                         layout
                                         onClick={() => itemClickHandler(value)}>
                                { label ?? startCase(value) }
                            </motion.span>
                        ))
                    }
                </motion.div>
            </Dropdown>
        </>
    );

}

export type { Record, BaseProps };

export default AutoCompleteField;