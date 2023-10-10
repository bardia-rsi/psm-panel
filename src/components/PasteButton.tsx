import type { FC, ReactElement } from "react";
import type { Props as IconButtonProps } from "@/components/IconButton";
import type { Props as TooltipProps } from "@/components/ui/Tooltip";
import { useToast } from "@/hooks/useToast";
import Tooltip from "@/components/ui/Tooltip";
import IconButton from "@/components/IconButton";

interface Props {
    title: string;
    onTextPasted: (text: string) => void;
    button?: Omit<IconButtonProps, "icon" | "onClick">;
    tooltip?: Omit<TooltipProps, "content" | "children">
}

const PasteButton: FC<Props> = ({ onTextPasted, title, button, tooltip }): ReactElement => {

    const { addToast } = useToast();

    const clickHandler = (): void => {
        navigator.clipboard.readText()
            .then((text) => {

                if (text === "") {
                    addToast({
                        type: "danger",
                        content: "There is nothing to paste!"
                    });
                } else {
                    onTextPasted(text);
                }

            })
            .catch(() => {
                addToast({
                    type: "danger",
                    content: `Something went wrong! Can't get your ${title.toLowerCase()} from your clipboard.`
                });
            });
    }

    return (
        <Tooltip content="Paste" {...tooltip}>
            <IconButton icon={{ src: "/icons/clipboard.svg" }} onClick={clickHandler} {...button} />
        </Tooltip>
    );

}

export default PasteButton;