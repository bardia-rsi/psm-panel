import type { FC, ReactElement } from "react";
import { useState } from "react";
import cn from "classnames";
import { useDetectTouchDevice } from "@/hooks/useDetectTouchDevice";
import VisibilityButton from "@/components/VisibilityButton";
import CopyButton from "@/components/CopyButton";

interface Props {
    title: string;
    text: string;
    copy?: boolean;
    hide?: boolean;
    hover?: boolean;
    responsiveText?: boolean;
}

const Record: FC<Props> = ({ title, text, copy, hide, hover, responsiveText = true }): ReactElement => {

    const [visibility, setVisibility] = useState<boolean>(false);
    const isTouchDevice = useDetectTouchDevice();

    return (
        <div className={cn(
            "flex items-center p-4",
            hover && !isTouchDevice && "rounded-lg hover:bg-secondary",
            (copy || hide) && "group"
        )}>
            <div className={cn("flex flex-col flex-1 justify-evenly", responsiveText && "overflow-hidden")}>
                <h6 className="text-tertiary mb-1">{ title }</h6>
                <p className={cn("text-primary", responsiveText && "whitespace-nowrap overflow-x-auto")}>
                    { hide && !visibility ? Array.from(Array(16)).map(() => "•").join("") : text }
                </p>
            </div>
            { hide && (
                <VisibilityButton visibility={visibility}
                                  setVisibility={setVisibility}
                                  button={{
                                      className: cn(
                                          "transition duration-300",
                                          !isTouchDevice && "opacity-0 group-hover:opacity-100"
                                      )
                                  }} />
            )}
            { copy && (
                <CopyButton title={title}
                            value={text}
                            button={{
                                className: cn(
                                    "transition duration-300",
                                    !isTouchDevice && "opacity-0 group-hover:opacity-100"
                                )
                            }} />
            )}
        </div>
    );

}

export default Record;