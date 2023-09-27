import type { FC, ReactElement } from "react";
import type { SwiperOptions } from "swiper";
import type { Plan as PlanDataStructure } from "@/types/Data/Core/Plan";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Plan from "@/components/Plan";
import "swiper/css";
import "swiper/css/pagination";
import "@/components/Plans/style.css";

interface Props {
    slides: PlanDataStructure[];
}

const Plans: FC<Props> = ({ slides }): ReactElement => {

    const breakpoints: SwiperOptions["breakpoints"] = {
        640: { slidesPerView: 1 },
        1024: { slidesPerView: 2 }
    }

    return (
        <Swiper modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={24}
                pagination={{ clickable: true }}
                breakpoints={breakpoints}>
            {
                slides.map(plan => (
                    <SwiperSlide key={plan.id}>
                        <Plan data={plan} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
}

export default Plans;