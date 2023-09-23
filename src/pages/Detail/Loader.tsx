import type { FC, ReactElement } from "react";
import Skeleton from "@/components/ui/Skeleton";

const Loader: FC = (): ReactElement => (
    <>
        <div className="flex justify-end gap-x-2 px-2">
            <Skeleton h={2.5} w={4.25} />
            <Skeleton h={2.5} w={4.25} />
        </div>
    </>
);

export default Loader;