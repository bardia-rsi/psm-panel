import type { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface Props {
    className?: string;
}

const BackButton: FC<Props> = ({ className }): ReactElement => {

    const navigate = useNavigate();

    return (
        <Button variant="custom"
                className={cn(
                    "bg-tertiary [&>svg>*]:fill-secondary border-transparent p-2",
                    "hover:bg-fourth [&>svg>*]:hover:fill-primary",
                    className
                    )}
                onClick={() => navigate("../")}>
            <Icon src="/icons/back-arrow.svg" />
        </Button>
    );

}

export default BackButton;