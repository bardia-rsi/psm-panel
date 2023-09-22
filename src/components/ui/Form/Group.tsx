import type { ReactNode, FC, ReactElement } from "react";
import type { PartialBy } from "@/types/Types";
import type { Props as ControlProps } from "@/components/ui/Form/Control";
import cn from "classnames";
import Control from "@/components/ui/Form/Control";
import ErrorMessage from "@/components/ui/Form/ErrorMessage";

interface Props extends PartialBy<ControlProps, "label" > {
    groupClass?: string;
    children?: ReactNode;
}

const Group: FC<Props> = ({ groupClass, name, label = name, children, ...rest }): ReactElement => (
    <div className={cn("flex flex-1 flex-col gap-y-1", groupClass)}>
        <Control name={name} label={label} {...rest} />
        { children }
        <ErrorMessage name={name} />
    </div>
)

export default Group;