import type { FC, ReactElement } from "react";
import Skeleton from "@/components/ui/Skeleton";

const Loader: FC = (): ReactElement => (
    <>
        <div className="flex gap-x-2 items-center mb-4">
            <Skeleton h={4} w={4} className="rounded-full" />
            <div className="flex flex-1 flex-col justify-evenly gap-y-2">
                <Skeleton h={1.5} />
                <Skeleton h={0.75} />
            </div>
        </div>
        <Skeleton h={1} w={4} className="mb-2" />
        <div className="flex flex-col gap-y-2 p-2 pr-0">
            <Skeleton h={1.5} />
            <Skeleton h={1.5} />
            <Skeleton h={1.5} />
            <Skeleton h={1.5} />
            <Skeleton h={1.5} />
        </div>
    </>
);

export default Loader;