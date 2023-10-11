import type { FC, ReactElement } from "react";
import type { EntityStates } from "@/types/App/DataTypes";
import type { EntityItemWithType } from "@/types/Data/Entities/Entity";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { normalize } from "normalizr";
import { startCase } from "lodash";
import * as entitiesSlice from "@/app/slices/entities";
import { setLengths } from "@/app/slices/core/appData";
import { entity } from "@/app/schemas/entity";
import { convertTypeToStateName } from "@/utils/entity";
import { useAppDispatch } from "@/app/hooks";
import BackButton from "@/components/BackButton";
import NavButton from "@/pages/Detail/NavButton";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface Props {
    page: EntityStates;
    item: EntityItemWithType;
    title: string;
    setPrevItem: () => void;
}

const Navbar: FC<Props> = ({ page, item, title, setPrevItem }): ReactElement => {

    const [warningModalIsOpen, setWarningModalIsOpen] = useState<boolean>(false);
    const [confirmDeletion, setConfirmDeletion] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const formattedType = startCase(item.type).toLowerCase();

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

    const cancelClickHandler = (): void => setWarningModalIsOpen(false);

    const deleteClickHandler = (): void => {

        setConfirmDeletion(true);
        setWarningModalIsOpen(false);

    }

    return (
        <>
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
                        { item.trash ? "Restore" : "Trash" }
                    </NavButton>
                    {
                        page === "trash" && (
                            <NavButton className="hover:bg-trash" onClick={() => setWarningModalIsOpen(true)}>
                                <Icon src="/icons/xmark.svg" />
                                Delete
                            </NavButton>
                        )
                    }
                </div>
            </div>
            <Modal isOpen={warningModalIsOpen}
                   setIsOpen={() => setWarningModalIsOpen(false)}
                   onExitComplete={confirmDeletion ? deletePermanently : undefined}
                   title={`Are you sure you want to delete ${title} ${formattedType} item?`}>
                <p className="max-w-[45rem] mt-2">
                    By permanently deleting a {formattedType} item, it will be removed from our system without the
                    option of retrieval. This action cannot be undone.
                </p>
                <p className="max-w-[45rem] mt-2 mb-4">
                    Please make sure you no longer need the {formattedType} item or have a backup copy before
                    proceeding. Once deleted, all associated data will be lost permanently.
                </p>
                <div className="flex justify-between" onClick={cancelClickHandler}>
                    <Button variant="text" className="dark:text-primary">
                        Cancel
                    </Button>
                    <Button variant="filled" className="bg-red-600 hover:bg-red-700" onClick={deleteClickHandler}>
                        Delete
                    </Button>
                </div>
            </Modal>
        </>
    );

}

export default Navbar;