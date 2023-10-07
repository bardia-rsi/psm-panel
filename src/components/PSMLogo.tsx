import type { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import cn from "classnames";
import { useGetAppData } from "@/hooks/data/core";
import Skeleton from "@/components/ui/Skeleton";

interface Props {
    type: "logo" | "logoTypography" | "logoTypographyFull";
    className?: string;
}

const PSMLogo: FC<Props> = ({ type, className }): ReactElement => {

    const { data } = useGetAppData();

    return (
        <Link to="/all-items" className="py-2">
            <SVG src={data[type]}
                 loader={<Skeleton h={2} w="100%" />}
                 className={cn("w-full h-auto [&>*]:fill-primary", className)} />
        </Link>
    );

}

export default PSMLogo;