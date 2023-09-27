import type { FC, ReactElement } from "react";
import Skeleton from "@/components/ui/Skeleton";

const Loader: FC = (): ReactElement => (
    <>
        <Skeleton h={3} w={24} />
        <div className="py-8">
            <div className="max-w-2xl flex flex-col gap-y-4 py-4">
                {
                    Array.from(Array(4)).map((_, index) => (
                        <div key={index} className="flex items-center gap-x-4">
                            <div className="w-1/2">
                                <Skeleton h={1.5} w={8} />
                            </div>
                            <div className="w-1/2">
                                <Skeleton h={1.5} w={8} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="py-8">
            <Skeleton h={2.5} w={16} className="mb-4" />
            <Skeleton h={1} w="60%" className="mb-2" />
            <Skeleton h={1} w="60%" className="mb-4" />
            <Skeleton h={2} w={8} />
        </div>
    </>
);

export default Loader;