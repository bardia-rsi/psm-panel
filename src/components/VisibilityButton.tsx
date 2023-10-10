import type { Dispatch, SetStateAction, FC, ReactElement } from "react";
import type { Props as IconButtonProps } from "@/components/IconButton";
import type { Props as TooltipProps } from "@/components/ui/Tooltip";
import cn from "classnames";
import Tooltip from "@/components/ui/Tooltip";
import IconButton from "@/components/IconButton";

interface Props {
    visibility: boolean;
    setVisibility: Dispatch<SetStateAction<boolean>>;
    button?: Omit<IconButtonProps, "icon" | "onClick">;
    tooltip?: Omit<TooltipProps, "content" | "children">;
}

const VisibilityButton: FC<Props> = ({ visibility, setVisibility, button, tooltip }): ReactElement => {

    const clickHandler = (): void => setVisibility(prevState => !prevState);

    return (
        <Tooltip content={visibility ? "Show" : "Hidden"} {...tooltip}>
            <IconButton {...button}
                        icon={{ src: `/icons/${visibility ? "eye" : "eye-hide"}.svg` }}
                        className={cn("[&>svg]:w-[1.125rem] [&>svg]:h-[1.125rem]", button?.className)}
                        onClick={clickHandler} />
        </Tooltip>
    );

}

export default VisibilityButton;