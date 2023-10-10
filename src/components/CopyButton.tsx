import type { FC, ReactElement } from "react";
import type { Props as IconButtonProps } from "@/components/IconButton";
import type { Props as TooltipProps } from "@/components/ui/Tooltip";
import { useToast } from "@/hooks/useToast";
import Tooltip from "@/components/ui/Tooltip";
import IconButton from "@/components/IconButton";

interface Props {
    title: string;
    value: string;
    button?: Omit<IconButtonProps, "icon" | "onClick">;
    tooltip?: Omit<TooltipProps, "content" | "children">;
}

const CopyButton: FC<Props> = ({ title, value, button, tooltip }): ReactElement => {

    const { addToast } = useToast();

    const clickHandler = (): void => {
        navigator.clipboard.writeText(value)
            .then(() => addToast({
                content: `The ${title.toLowerCase()} successfully copied in your clipboard.`,
                type: "custom",
                className: "bg-ac-primary-500"
            }))
            .catch(() => addToast({
                content: "Something went wrong",
                type: "danger"
            }));
    }

    return (
        <Tooltip content="Copy" {...tooltip}>
            <IconButton icon={{ src: "/icons/copy.svg" }} onClick={clickHandler} {...button} />
        </Tooltip>
    );

}

export default CopyButton;