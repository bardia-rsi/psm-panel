import type { FC, ReactElement } from "react";
import Skeleton from "@/components/ui/Skeleton";

const Loader: FC = (): ReactElement => (
    <>
        <div className="flex justify-end gap-x-2 px-2">
            <Skeleton h={2.5} w={4.25} />
            <Skeleton h={2.5} w={4.25} />
        </div>
        <div className="flex items-center gap-x-4 px-2 pt-4 pb-2">
            <Skeleton h={5} w={5} />
            <div className="flex flex-col flex-1 gap-y-2 justify-evenly">
                <Skeleton h={1.5} w="25%" />
                <Skeleton h={1.5} w="75%" />
            </div>
            <Skeleton h={3} w={3} />
        </div>
        <hr />
        {
            Array.from(Array(5)).map((_, index) => (
                <div key={index} className="flex flex-col justify-evenly gap-y-2 py-4 px-2">
                    <Skeleton h={1.5} w="25%" />
                    <Skeleton h={1.5} w="75%" />
                </div>
            ))
        }
        <hr />
        <div className="flex flex-col justify-evenly gap-y-2 py-4 px-2">
            <Skeleton h={1.5} w="25%" />
            <Skeleton h={6} />
        </div>
    </>
);

export default Loader;