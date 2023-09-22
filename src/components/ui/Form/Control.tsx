import type { FC, ReactElement } from "react";
import type { ElementProps } from "@/components/ui/Form/Field";
import type { BaseProps as AutoCompleteProps } from "@/components/ui/Form/AutoCompleteField";
import { useState } from "react";
import cn from "classnames";
import { camelCase, omit } from "lodash";
import Select from "@/components/ui/Form/Select";
import AutoCompleteField from "@/components/ui/Form/AutoCompleteField";
import Label from "@/components/ui/Form/Label";
import Field from "@/components/ui/Form/Field";
import Tooltip from "@/components/ui/Tooltip";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export interface Props extends ElementProps {
    as?: "input" | "textarea" | "select";
    name: string;
    label: string | ReactElement;
    radio?: {
        labels: string[];
        default?: number;
    };
    select?: {
        labels: string[];
        default?: number;
    }
    options?: {
        autoComplete?: AutoCompleteProps;
    }
}

const Control: FC<Props> = (
    { as = "input", name, label, type = "text", radio, select, className, options, ...rest }
): ReactElement => {

    const [visibility, setVisibility] = useState<boolean>(false);

    if (as === "select" && select) {
        return <Select name={name} label={String(label)} {...select} />
    }

    if (as !== "select" && !select) {

        if (options?.autoComplete) {
            return (
                <div className="relative w-full">
                    <AutoCompleteField name={name}
                                       label={String(label)}
                                       placeholder={String(label)}
                                       className={cn("peer placeholder-transparent", className)}
                                       {...omit(rest, "className")}
                                       {...options.autoComplete} />
                </div>
            );
        }

        if (type !== "radio" && !radio) {

            return (
                <div className={type === "checkbox" ? "flex items-center gap-x-2" : "relative w-full"}>
                    <Field as={as}
                           name={name}
                           label={String(label)}
                           type={type === "password" ? (visibility ? "text" : type) : type}
                           placeholder={String(label)}
                           className={cn(
                               type === "password" && "pt-1 pr-10 pb-1.5 pl-6",
                               "peer placeholder-transparent",
                               className
                           )}
                           {...omit(rest, "className")} />
                    <Label as={as} name={name} label={String(label)} />
                    {
                        type === "password" && (
                            <Tooltip content={visibility ? "Show" : "Hidden"}
                                     wrapperClassName="!absolute top-1/2 right-2 -translate-y-1/2">
                                <Button variant="custom"
                                        type="button"
                                        className="border-transparent [&>svg>*]:fill-secondary [&>svg>*]:hover:fill-primary"
                                        onClick={() => setVisibility(prevState => !prevState)}>
                                    <Icon src={`/icons/${visibility ? "eye" : "eye-hide"}.svg`} h={1.25} w={1.25} />
                                </Button>
                            </Tooltip>
                        )
                    }
                </div>
            );

        }

        if (type === "radio" && radio) {
            return (
                <div className="flex justify-between">
                    {
                        radio.labels.map((radioLabel, index) => (
                            <div key={camelCase(radioLabel)} className="flex items-center gap-x-2">
                                <Field name={name}
                                       label={radioLabel}
                                       type="radio"
                                       defaultChecked={(radio.default || 0) === index}
                                       {...omit(rest, "defaultChecked")} />
                                <label htmlFor={camelCase(radioLabel)} className="cursor-pointer">{ radioLabel }</label>
                            </div>
                        ))
                    }
                </div>
            );
        }

    }

    return <></>;

};

export default Control;