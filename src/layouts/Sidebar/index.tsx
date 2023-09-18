import type { FC, ReactElement } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import SVG from "react-inlinesvg";
import { useFetchAppData } from "@/hooks/data/core";
import { useSidebarVisibility } from "@/hooks/useSidebarVisibility";
import Container from "@/layouts/Sidebar/Container";
import Loader from "@/layouts/Sidebar/Loader";
import Skeleton from "@/components/ui/Skeleton";
import Menu from "@/components/ui/Menu";
import MenuItem from "@/components/ui/Menu/Item";
import CTA from "@/components/ui/CTA";

const Index: FC = (): ReactElement => {

    const { status, data } = useFetchAppData();
    const { setVisibility } = useSidebarVisibility();

    return (
        <Container>
            {
                status !== "succeeded"
                 ? <Loader />
                 : (
                     <>
                         <Link to="/" className="py-2">
                             <SVG src={data.logoTypographyFull}
                                  loader={<Skeleton h={2} w="50%" />}
                                  className="w-full h-auto [&>*]:fill-primary" />
                         </Link>
                         {
                             data.sidebar.sections.map((section, index) => (
                                 <Fragment key={section.id}>
                                     { section.title && <h6 className="mt-4 mb-1">{ section.title }</h6> }
                                     <Menu className={ index + 1 === data.sidebar.sections.length
                                         ? "flex flex-col justify-end flex-1"
                                         : undefined
                                     }>
                                         {
                                             section.menu.map(item => (
                                                 <MenuItem key={item.id}
                                                           to={item.url}
                                                           text={item.text}
                                                           icon={{ src: item.icon }}
                                                           count={item.count}
                                                           onClick={() => setVisibility(false)}
                                                           className={cn(
                                                               item.text.toLowerCase() === "trash"
                                                                   ? "[&>svg>*]:!fill-trash"
                                                                   : item.text.toLowerCase() === "favorites"
                                                                       ? "[&>svg>*]:!fill-star"
                                                                       : undefined
                                                           )} />
                                             ))
                                         }
                                     </Menu>
                                 </Fragment>
                             ))
                         }
                         { data.sidebar.cta && <CTA {...data.sidebar.cta} /> }
                     </>
                 )
            }
        </Container>
    );

}

export default Index;