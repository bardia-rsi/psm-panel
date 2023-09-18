import type { FC, ReactElement } from "react";
import styled from "styled-components";
import { isNumber } from "lodash";
import cn from "classnames";

interface DynamicSizeProps {
    $w: number | `${number}%`;
    $h: number | `${number}%`;
}

interface Props {
    h: number | `${number}%`;
    w?: number | `${number}%`;
    className?: string;
}

const DynamicSize = styled.div<DynamicSizeProps>`
    width: ${({ $w }) => isNumber($w) ? `${$w}rem` : $w };
    height: ${({ $h }) => isNumber($h) ? `${$h}rem` : $h };
`;

const Skeleton: FC<Props> = ({ w = "100%", h, className }): ReactElement => (
    <DynamicSize $w={w} $h={h} className={cn("bg-fourth rounded-md animate-pulse", className)} />
);

export default Skeleton;