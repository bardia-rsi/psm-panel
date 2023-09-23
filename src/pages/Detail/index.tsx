import type { FC, ReactElement } from "react";
import type { AppDispatch } from "@/app/store";
import type { EntityStates } from "@/types/App/DataTypes";
import type { EntityItemWithType } from "@/types/Data/Entities/Entity";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { camelCase } from "lodash";
import { normalize } from "normalizr";
import { entity } from "@/app/schemas/entity";
import * as entitiesSlice from "@/app/slices/entities";
import { convertTypeToStateName } from "@/utils/entity";
import { useGetEntityItem } from "@/hooks/data/entities";
import { setLengths } from "@/app/slices/core/appData";
import Loader from "@/pages/Detail/Loader";
import Container from "@/pages/Detail/Container";
import BackButton from "@/components/BackButton";
import HeaderButton from "@/pages/Detail/HeaderButton";
import Icon from "@/components/ui/Icon";

let prevItem: EntityItemWithType | undefined = undefined;

const Detail: FC = (): ReactElement => {

    const [changeLength, setChangeLength] = useState<number>(0);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const page = camelCase(params.type) as Exclude<EntityStates, "home">;

    const data = useGetEntityItem(page, params.pid as string);
    const status = data.status;
    let item = data.item;

    const trashClickHandler = (): void => {

        const stateName = convertTypeToStateName(item.type);

        prevItem = item;

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

            dispatch(entitiesSlice[stateName].softRemove(item.pid));

        }

        setChangeLength(prevState => ++prevState);

        navigate("../");

    }

    const deletePermanently = (): void => {

        prevItem = item;

        dispatch(entitiesSlice[convertTypeToStateName(item.type)].remove(item.pid));
        dispatch(entitiesSlice.trash.remove(item.pid));

        setChangeLength(prevState => ++prevState);

        navigate("../");

    }

    useEffect(() => {
        return () => {
            prevItem = undefined;
        }
    }, []);

    useEffect(() => {
        dispatch(setLengths());
    }, [changeLength]);

    return (
        <Container>
            {
                status !== "succeeded"
                    ? <Loader />
                    : (
                        <>
                            <div className="flex justify-between lg:justify-end gap-x-2 px-2">
                                <BackButton className="lg:hidden" />
                                <div className="flex gap-x-2">
                                    {
                                        page !== "trash" && (
                                            <HeaderButton className="hover:bg-ac-primary-500">
                                                <Icon src="/icons/pencil.svg" />
                                                Edit
                                            </HeaderButton>
                                        )
                                    }
                                    <HeaderButton className={item.trash ? "hover:bg-ac-primary-500" : "hover:bg-trash"}
                                                  onClick={trashClickHandler}>
                                        <Icon src={`/icons/${item.trash ? "restore" : "trash"}.svg`} />
                                        { item.trash ? "Restore" : "Trash" }
                                    </HeaderButton>
                                    {
                                        page === "trash" && (
                                            <HeaderButton className="hover:bg-trash" onClick={deletePermanently}>
                                                <Icon src="/icons/xmark.svg" />
                                                Delete
                                            </HeaderButton>
                                        )
                                    }
                                </div>
                            </div>
                        </>
                    )
            }
        </Container>
    )

}

export default Detail;