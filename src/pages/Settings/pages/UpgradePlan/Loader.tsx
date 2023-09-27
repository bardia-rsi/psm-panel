import type { FC, ReactElement } from "react";
import Skeleton from "@/components/ui/Skeleton";

const Loader: FC = (): ReactElement => (
    <>
        <Skeleton h={3} w="50%" className="mb-8 mx-auto" />
        <div className="flex flex-nowrap gap-x-4 overflow-x-auto">
            <Skeleton h={36} className="flex-1" />
            <Skeleton h={36} className="hidden lg:block flex-1" />
        </div>
    </>
);

export default Loader;