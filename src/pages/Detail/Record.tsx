import type { FC, ReactElement } from "react";
import { useState } from "react";
import cn from "classnames";
import { useToast } from "@/hooks/useToast";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

interface Props {
    title: string;
    text: string;
    copy?: boolean;
    hide?: boolean;
    hover?: boolean;
}

const Record: FC<Props> = ({ title, text, copy, hide, hover }): ReactElement => {

    const [isHide, setIsHide] = useState<boolean>(true);
    const { addToast } = useToast();

    const copyText = (text: string): void => {
        navigator.clipboard.writeText(text)
            .then(() => addToast({
                content: `The ${title} successfully copied in your clipboard.`,
                type: "custom",
                className: "bg-ac-primary-500"
            }))
            .catch(() => addToast({
                content: "Something went wrong",
                type: "danger"
            }));
    }

    return (
        <div className={cn(
            "flex items-center p-4",
            hover && "rounded-lg hover:bg-secondary",
            (copy || hide) && "group"
        )}>
            <div className="flex flex-col flex-1 justify-evenly">
                <h6 className="text-tertiary mb-1">{ title }</h6>
                <p className="text-primary">
                    { hide && isHide ? Array.from(Array(text.length)).map(() => "•").join("") : text }
                </p>
            </div>
            { hide && (
                <Button variant="custom"
                        className={cn(
                            "!p-1 border-transparent opacity-0",
                            "group-hover:opacity-100 transition duration-300",
                            "[&>svg]:w-[1.125rem] [&>svg]:h-[1.125rem]",
                            "[&>svg>*]:fill-secondary [&>svg>*]:hover:fill-primary"
                        )}
                        onClick={() => setIsHide(prevState => !prevState)}>
                    <Icon src={`/icons/${isHide ? "eye-hide" : "eye"}.svg`} />
                </Button>
            )}
            { copy && (
                <Button variant="custom"
                        className={cn(
                            "!p-1 border-transparent opacity-0",
                            "group-hover:opacity-100 transition duration-300",
                            "[&>svg>*]:fill-secondary [&>svg>*]:hover:fill-primary"
                        )}
                        onClick={() => copyText(text)}>
                    <Icon src={`/icons/copy.svg`} />
                </Button>
            )}
        </div>
    );

}

export default Record;