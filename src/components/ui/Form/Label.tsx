import type { ReactElement } from "react";
import type { Props as FieldProps } from "@/components/ui/Form/Field";
import { forwardRef } from "react";
import { useField } from "formik";
import cn from "classnames";

interface Props extends Pick<FieldProps, "as" | "name" | "label"> {}

const Label = forwardRef<HTMLLabelElement, Props>((
    { as = "input", name, label }
    ,ref
): ReactElement => {

    const [_, meta] = useField(name);
    const error: boolean = Boolean(meta.touched && meta.error);

    return (
        <label htmlFor={name}
               ref={ref}
               className={cn(
                   "absolute left-6 right-6 ml-0.5 transition-all duration-300 cursor-text",
                   "peer-placeholder-shown:text-base text-xs peer-placeholder-shown:peer-focus:text-xs",
                   as === "input" && [
                       "peer-placeholder-shown:top-1/2 -translate-y-1/2 top-[26%]",
                       "peer-placeholder-shown:peer-focus:top-[26%]"
                   ],
                   as === "textarea" && [
                       "peer-[:not(:empty)]:bg-tertiary peer-hover:peer-[:not(:empty)]:bg-fourth",
                       "peer-focus:peer-[:not(:empty)]:bg-fourth peer-placeholder-shown:bg-transparent",
                       "peer-placeholder-shown:top-2 peer-placeholder-shown:peer-focus:top-[0.125rem]",
                       "top-[0.125rem] pt-2"
                   ],
                   error ? "text-red-500" : "text-secondary"
               )}>
            { label }
        </label>
    );

});

export default Label;