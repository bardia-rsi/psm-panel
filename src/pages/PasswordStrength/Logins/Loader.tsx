import type { FC, ReactElement } from "react";
import Skeleton from "@/components/ui/Skeleton";

const Loader: FC = (): ReactElement => (
    <>
        {
            Array.from(Array(4)).map((_, i) => (
                <div key={i}>
                    <Skeleton h={1.5} w="40%" className="mb-2" />
                    <div className="flex gap-x-4 overflow-x-scroll">
                        {
                            Array.from(Array(5)).map((_, j) => (
                                <Skeleton key={j} className="min-w-[18.75rem]" h={9.375} w={18.75} />
                            ))
                        }
                    </div>
                </div>
            ))
        }
    </>
)

export default Loader;