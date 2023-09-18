import type { FC, ReactElement } from "react";
import type { Props as SVGProps } from "react-inlinesvg";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import Skeleton from "@/components/ui/Skeleton";

interface Props extends SVGProps {
    $h: number;
    $w: number;
}

interface IconProps extends Omit<Props, "uniquifyIDs" | "loader" | "height" | "width" | "$w" | "$h"> {
    w?: number;
    h?: number;
}

const DynamicSize = styled(SVG)<Props>`
    width: ${({ $w }) => $w + "rem" };
    height: ${({ $h }) => $h + "rem" };
`;

const Icon: FC<IconProps> = ({ w = 1, h = 1, ...rest }): ReactElement => (
    <DynamicSize $w={w} $h={h} loader={<Skeleton w={w} h={h} />} uniquifyIDs {...rest} />
);

export type { IconProps };

export default Icon;