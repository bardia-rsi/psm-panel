import type { FC, ReactElement } from "react";
import cn from "classnames";
import { complexity as getComplexity, getColor } from "@/helpers/password";

interface Props {
    score: number;
    className?: string;
}

const Strength: FC<Props> = ({ score, className }): ReactElement => (
    <div className={cn("w-full h-2 bg-fourth rounded-md", className)}>
        <div className={cn("h-2 rounded-md transition-all duration-300", getColor(getComplexity(score)) )}
             style={{
                 width: `${score}%`
             }}
        />
    </div>
);

export default Strength;