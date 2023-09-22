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
            {
                Array.from(Array(Math.floor((window.innerHeight - 68) / 96))).map((_, index) => (
                    <div key={index} className="flex gap-x-4 p-4">
                        <Skeleton h={3.5} w={3.5} />
                        <div className="flex flex-col flex-1 gap-y-2 py-2">
                            <Skeleton h={1.25} w="25%" />
                            <Skeleton h={1.25} w="65%" />
                        </div>
                    </div>
                ))
            }
        </>
    );

}

export default Loader;