import { DictionaryUnion } from "@/types/Types";
import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactElement, FocusEvent, ChangeEvent } from "react";
import type { FieldInputProps } from "formik";
import { forwardRef, createElement } from "react";
import { useField } from "formik";
import { camelCase, omit } from "lodash";
import cn from "classnames";

type ElementProps =  Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement> & InputHTMLAttributes<HTMLInputElement>,
    keyof Omit<FieldInputProps<any>, "onChange" | "onBlur"> | "id" | "children"
>;

interface Props extends ElementProps, DictionaryUnion<`data${string}`> {
    name: string;
    label: string;
    as?: "input" | "textarea";
}

const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>((
    { name, label, as = "input", type = "text", onChange, onBlur, className, ...rest },
    ref
): ReactElement => {

    const [field, meta] = useField(name);
    const error: boolean = Boolean(meta.touched && meta.error);

    const changeHandler = (e: ChangeEvent<any>): void => {

        if (onChange) {
            onChange(e);
        }

        field.onChange(e);

    }

    const blurHandler = (e: FocusEvent<any>): void => {

        if (onBlur) {
            onBlur(e);
        }

        field.onBlur(e);

    }

    return createElement(as, {
        id: type === "radio" ? camelCase(label) : name,
        type: as === "input" ? type : undefined,
        className: cn(
            as === "input" && "pt-4 px-6 pb-1.5",
            as === "textarea" && "pt-6 px-6 pb-2",
            "bg-tertiary text-primary border-2 hover:bg-fourth focus:bg-fourth",
            error && !["radio", "checkbox"].includes(type) ? "border-red-500" : "border-transparent",
            className
        ),
        value: type === "radio" ? label : undefined,
        onChange: changeHandler,
        onBlur: blurHandler,
        ref,
        ...rest,
        ...omit(field, "onChange", "onBlur", type === "radio" ? "value" : "")
    });

})

export type { ElementProps, Props };

export default Field;