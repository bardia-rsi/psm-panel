import type { FC, ReactElement } from "react";
import type { EntityItemWithType } from "@/types/Data/Entities/Entity";
import type { EntityStates } from "@/types/App/DataTypes";
import type { Props as LogoProps } from "@/components/Logo";
import { useNavigate } from "react-router-dom";
import { normalize } from "normalizr";
import cn from "classnames";
import { entity } from "@/app/schemas/entity";
import * as entitiesSlice from "@/app/slices/entities";
import { setLengths } from "@/app/slices/core/appData";
import { convertTypeToStateName } from "@/utils/entity";
import { useAppDispatch } from "@/app/hooks";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface Props {
    page: EntityStates;
    item: EntityItemWithType;
    logo: LogoProps;
    title: string;
    link?: string | null;
    setPrevItem: () => void;
}

const Header: FC<Props> = ({ page, item, logo, title, link, setPrevItem }): ReactElement => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const favoriteClickHandler = (): void => {
        if (page !== "trash") {

            const stateName = convertTypeToStateName(item.type);

            if (page === "favorites") {

                setPrevItem();

                dispatch(entitiesSlice.favorites.remove(item.pid));
                // @ts-ignore
                dispatch(entitiesSlice[stateName].update({ pid: item.pid, favorite: null }));

                navigate("../");

            } else {
                // @ts-ignore
                dispatch(entitiesSlice[stateName].update({
                    pid: item.pid,
                    favorite: item.favorite ? null : Date.now()
                }));
                dispatch(
                    item.favorite
                        ? entitiesSlice.favorites.remove(item.pid)
                        : entitiesSlice.favorites.add(normalize(item, entity).entities.entities![item.pid])
                );
            }

            dispatch(setLengths());

        }
    }

    return (
        <div className="flex items-center gap-x-3 xs:gap-x-4 px-2 pt-4 pb-2">
            <Logo {...logo}
                  className={cn("transition shadow-xl shadow-black/15 dark:shadow-black/50", logo.className)}/>
            <div className="flex flex-col flex-1 justify-evenly overflow-hidden">
                <h3 className="text-xl xs:text-3xl whitespace-nowrap overflow-hidden text-ellipsis">{ title }</h3>
                {
                    link && (
                        <span className="text-link whitespace-nowrap overflow-hidden text-ellipsis">
                                                <a href={link}
                                                   target="_blank"
                                                   className="text-link border-b border-b-transparent hover:border-b-link">
                                                { link.replace(/^https?:\/\//, "") }
                                            </a>
                                            </span>
                    )
                }
            </div>
            <Button variant="custom"
                    className={cn(
                        "border-transparent [&>svg]:w-8 [&>svg]:h-8 xs:[&>svg]:w-10 xs:[&>svg]:h-10",
                        item.favorite ? "[&>svg>*]:fill-star" : "[&>svg>*]:fill-secondary"
                    )}
                    onClick={favoriteClickHandler}
                    disabled={page === "trash"}
                    compact>
                <Icon src="/icons/star.svg" />
            </Button>
        </div>
    );

}

export default Header;