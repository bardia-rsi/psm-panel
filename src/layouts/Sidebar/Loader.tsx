import type { FC, ReactElement } from "react";
import Skeleton from "@/components/ui/Skeleton";

const Loader: FC = (): ReactElement => (
    <>
        <Skeleton h={2} w="50%" />
        <div className="py-4 px-2">
            <Skeleton h={1.5} />
            <Skeleton h={1.5} className="mt-2" />
            <Skeleton h={1.5} className="mt-2" />
        </div>
        <Skeleton h={1} w="25%" className="mt-2" />
        <div className="py-4 px-2">
            <Skeleton h={1.5} />
            <Skeleton h={1.5} className="mt-2" />
            <Skeleton h={1.5} className="mt-2" />
            <Skeleton h={1.5} className="mt-2" />
        </div>
        <Skeleton h={1} w="25%" className="mt-2" />
        <div className="py-4 px-2">
            <Skeleton h={1.5} />
        </div>
        <div className="py-4 px-2 flex-1 flex flex-col justify-end">
            <Skeleton h={1.5} />
            <Skeleton h={1.5} className="mt-2" />
        </div>
    </>
);

export default Loader;