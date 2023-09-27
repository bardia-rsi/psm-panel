import type { FC, ReactElement } from "react";
import type { Plan as PlanDataStructure } from "@/types/Data/Core/Plan";
import cn from "classnames";
import Link from "@/components/ui/Link";
import Icon from "@/components/ui/Icon";

interface Props {
    data: PlanDataStructure;
}

const Plan: FC<Props> = ({ data }): ReactElement => {

    const discountedPrice: number = data.price?.discount
        ? Number((data.price.regular * (100 - data.price.discount) / 100).toFixed(2))
        : 0;

    return (
        <div className="w-full bg-secondary flex flex-col justify-between py-12 px-6 rounded-2xl relative">
            {
                data.price?.discount && (
                    <span className={cn(
                        "bg-ac-primary-500 text-white py-3 px-4 rounded-3xl absolute top-0 left-1/2 z-20",
                        "-translate-x-1/2 -translate-y-1/2 text-sm font-bold uppercase",
                        "before:content-[''] before:h-3 before:w-3 before:bg-ac-primary-500 before:rounded",
                        "before:absolute before:bottom-[1px] before:left-1/2",
                        "before:-translate-x-1/2 before:translate-y-1/2 before:rotate-45"
                    )}>
                            save {data.price.discount}%
                        </span>
                )
            }
            <div className="text-center">
                <h3 className="mb-4 text-xl uppercase group-secondary:text-white">{ data.name }</h3>
                <h2 className="mb-2">
                    <span className="inline-block mr-1 text-primary font-bold text-2xl -translate-y-3 group-secondary">
                        $
                    </span>
                    <span className="text-primary font-bold group-secondary:text-white">
                        {
                            data.price?.regular
                                ? data.price.discount ? discountedPrice : data.price.regular
                                : "0.00"
                        }
                    </span>
                </h2>
                { data.description && <p className="text-secondary text-sm font-bold uppercase">{ data.description }</p> }
                { data.price && (
                    <>
                        <p className="text-sm font-bold uppercase mb-2">per { data.price.per }</p>
                        <p>
                            <span className="text-secondary line-through">{ data.price.regular * data.price.period }</span>
                            { data.price.discount && (
                                <span className="text-primary mx-1 font-bold">
                                    { discountedPrice * data.price.period }
                                </span>
                            )}
                            <span className="text-secondary">{ data.price.description }</span>
                        </p>
                    </>
                )}
            </div>
            <div>
                <Link to=""
                      variant="filled"
                      className="my-8 text-lg font-bold whitespace-nowrap capitalize">
                    { data.link.text }
                </Link>
                { data.features.map(feature => (
                    <p key={feature.id} className={cn(
                        "text-primary flex items-center gap-x-1 text-sm font-medium my-1 [&:nth-of-type(2)]:mb-6",
                        feature.disabled && "opacity-50"
                    )}>
                        {
                            feature.icon
                                ? <Icon src={feature.icon} w={0.75} h={0.75} className="inline-block [&>*]:fill-primary" />
                                : !feature.disabled
                                    ? <Icon src="/icons/checkmark.svg" w={0.75} h={0.75} className="inline-block [&>*]:fill-green-500" />
                                    : <Icon src="/icons/xmark.svg" w={0.75} h={0.75} className="inline-block [&>*]:fill-primary" />
                        }
                        <span className="text-primary flex-1">{ feature.content }</span>
                    </p>
                )) }
            </div>
        </div>
    );

}

export default Plan;