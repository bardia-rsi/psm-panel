import type { FC, ReactElement } from "react";
import { useSmScreen } from "@/hooks/useScreen";
import Skeleton from "@/components/ui/Skeleton";

const Loader: FC = (): ReactElement => {

    const isSmScreen: boolean = useSmScreen();

    return (
        <>
            <div className="bg-primary flex gap-x-2 p-4 sticky -top-[0.0025rem] z-10">
                { isSmScreen && <Skeleton h={2.25} w={3.25} /> }
                <Skeleton h={2.25} />
                <Skeleton h={2.25} w={4.25} />
            </div>
        </>
    );

}

export default Loader;