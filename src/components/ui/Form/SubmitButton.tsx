import type { FC, ReactElement, MouseEvent } from "react";
import type { Props as ButtonProps } from "@/components/ui/Button";
import { useFormikContext } from "formik";
import cn from "classnames";
import { AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

interface Props extends Omit<ButtonProps, "disabled" | "type" | "variant" | "children"> {
    text?: string;
}

const SubmitButton: FC<Props> = ({ full, text, onClick, className, ...rest }): ReactElement => {

    const { isSubmitting } = useFormikContext();

    const clickHandler = (e: MouseEvent): void => e.preventDefault();

    return (
        <Button variant="filled"
                type="submit"
                className={cn(
                    "w-full py-2 px-16 relative",
                    "[&>svg>*]:!fill-none [&>svg]:w-6 [&>svg]:h-6",
                    !full && "md:w-auto md:mx-auto",
                    className
                )}
                disabled={isSubmitting}
                onClick={isSubmitting ? clickHandler : onClick}
                {...rest}>
            { text || "submit" }
            <AnimatePresence mode="wait">
                { isSubmitting && <Spinner className="absolute top-1/2 right-4 -translate-y-1/2" /> }
            </AnimatePresence>
        </Button>
    );

}

export type { Props };

export default SubmitButton;