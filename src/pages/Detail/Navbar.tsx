import type { FC, ReactElement } from "react";
import type { EntityStates } from "@/types/App/DataTypes";
import type { EntityItemWithType } from "@/types/Data/Entities/Entity";
import { useNavigate } from "react-router-dom";
import { normalize } from "normalizr";
import * as entitiesSlice from "@/app/slices/entities";
import { setLengths } from "@/app/slices/core/appData";
import { entity } from "@/app/schemas/entity";
import { convertTypeToStateName } from "@/utils/entity";
import { useAppDispatch } from "@/app/hooks";
import NavButton from "@/pages/Detail/NavButton";
import BackButton from "@/components/BackButton";
import Icon from "@/components/ui/Icon";

interface Props {
    page: EntityStates;
    item: EntityItemWithType;
    setPrevItem: () => void;
}

const Navbar: FC<Props> = ({ page, item, setPrevItem }): ReactElement => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const trashClickHandler = (): void => {

        const stateName = convertTypeToStateName(item.type);

        setPrevItem();

        if (page === "trash") {
            dispatch(entitiesSlice.trash.remove(item.pid));
            // @ts-ignore
            dispatch(entitiesSlice[stateName].update({ pid: item.pid, trash: null }));
        } else {

            // @ts-ignore
            dispatch(entitiesSlice[stateName].update({ pid: item.pid, trash: Date.now() }))
            dispatch(entitiesSlice.trash.add(normalize(item, entity).entities.entities![item.pid]));

            if (page === "favorites" || item.favorite) {
                dispatch(entitiesSlice.favorites.remove(item.pid));
            }

        }

        dispatch(setLengths());

        navigate("../");

    }

    const deletePermanently = (): void => {

        setPrevItem();

        dispatch(entitiesSlice[convertTypeToStateName(item.type)].remove(item.pid));
        dispatch(entitiesSlice.trash.remove(item.pid));
        dispatch(setLengths());

        navigate("../");

    }

    return (
        <div className="flex justify-between lg:justify-end gap-x-2 px-2">
            <BackButton className="lg:hidden" />
            <div className="flex gap-x-2">
                {
                    page !== "trash" && (
                        <NavButton className="hover:bg-ac-primary-500">
                            <Icon src="/icons/pencil.svg" />
                            Edit
                        </NavButton>
                    )
                }
                <NavButton className={item.trash ? "hover:bg-ac-primary-500" : "hover:bg-trash"}
                           onClick={trashClickHandler}>
                    <Icon src={`/icons/${item.trash ? "restore" : "trash"}.svg`} />
                    {item.trash ? "Restore" : "Trash"}
                </NavButton>
                {
                    page === "trash" && (
                        <NavButton className="hover:bg-trash" onClick={deletePermanently}>
                            <Icon src="/icons/xmark.svg" />
                            Delete
                        </NavButton>
                    )
                }
            </div>
        </div>
    );

}

export default Navbar;