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
}

const Record: FC<Props> = ({ title, text, copy, hide, hover }): ReactElement => {

    const [visibility, setVisibility] = useState<boolean>(false);
    const isTouchDevice = useDetectTouchDevice();

    return (
        <div className={cn(
            "flex items-center p-4",
            hover && "rounded-lg hover:bg-secondary",
            (copy || hide) && "group"
        )}>
            <div className="flex flex-col flex-1 justify-evenly">
                <h6 className="text-tertiary mb-1">{ title }</h6>
                <p className="text-primary">
                    { hide && visibility ? Array.from(Array(16)).map(() => "•").join("") : text }
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