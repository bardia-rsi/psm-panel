import { FC, ReactElement } from "react";
import { motion } from "framer-motion";

interface Props {
    className?: string;
    color?: string;
}

const Spinner: FC<Props> = ({ className, color }): ReactElement => {

    const size: number = 40;

    return (
        <motion.svg xmlns="http://www.w3.org/2000/svg"
                    viewBox={`0 0 ${size} ${size}`}
                    width={`${size * 2 / 16}rem`}
                    height={`${size * 2 / 16}rem`}
                    className={className}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
            <motion.circle cx={size / 2}
                           cy={size / 2}
                           r={size / 2 - 2}
                           fill="none"
                           stroke={color ?? "rgba(var(--ic-primary))"}
                           strokeWidth="3"
                           strokeLinecap="round"
                           strokeDasharray={size * 3.14}
                           className="origin-center"
                           animate={{
                               strokeDashoffset:  [0.66 * size, 3.14 * size, 0.66 * size],
                               rotate: [0, 720, 1080]
                           }}
                           transition={{
                               type: "tween",
                               ease: "linear",
                               duration: 3.75,
                               repeatType: "loop",
                               repeat: Infinity,
                           }}
            />
        </motion.svg>
    );

}

export default Spinner;