import { selectBanks, selectCompanies } from "@/app/selectors/entity";
import type { Dispatch, SetStateAction, FC, ReactElement } from "react";
import type { EntityStates } from "@/types/App/DataTypes";
import type { EntityItemCreatePayload } from "@/types/Data/Entities/Entity";
import type { FullFilledAction, RejectedAction } from "@/types/App/ThunkActions";
import type { Error } from "@/types/App/Error";
import { useState, useEffect } from "react";
import { omitBy } from "lodash";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useToast } from "@/hooks/useToast";
import { AnimatePresence } from "framer-motion";
import * as entitySlices from "@/app/slices/entities";
import { setLengths } from "@/app/slices/core/appData";
import EntityForm from "@/components/EntityForm";

interface Props {
    modelIsOpen: boolean;
    setModelIsOpen: Dispatch<SetStateAction<boolean>>;
    page: Exclude<EntityStates, "allItems" | "trash" | "favorites">;
}

let isSubmitted: boolean = false;

const Form: FC<Props> = ({ setModelIsOpen, modelIsOpen, page }): ReactElement => {

    const [changeLength, setChangeLength] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { addToast } = useToast();

    const companies = useAppSelector(selectCompanies);
    const banks = useAppSelector(selectBanks);

    const submitHandler = async (values: EntityItemCreatePayload): Promise<void> => {
        if (!isSubmitted) {

            isSubmitted = true;

            if ("company" in values && typeof values.company !== "string") {
                const keys = Object.keys(companies);

                for (let i = 0; i < keys.length; i++) {
                    if (companies[keys[i]].name === values.company.name) {
                        values.company = companies[keys[i]].pid;
                        break;
                    }
                }

                if (typeof values.company !== "string") {
                    values.company.website = "https://www.notRequired.org";
                }

            }

            if ("bank" in values && typeof values.bank !== "string") {

                const keys = Object.keys(banks);

                for (let i = 0; i < keys.length; i++) {
                    if (banks[keys[i]].name === values.bank.name) {
                        values.bank = banks[keys[i]].pid;
                        break;
                    }
                }

            }

            const res: RejectedAction | FullFilledAction = await dispatch(entitySlices[page].create(
                omitBy(values, v => v === "")
            ));

            if (res.meta.requestStatus === "rejected") {

                isSubmitted = false;

                addToast({
                    type: "danger",
                    content: (res.payload as Error).code === 409
                        ? `The ${page.slice(0, -1)} already exists!`
                        : "Something went wrong, Try again later"
                });

            }

            if (res.meta.requestStatus === "fulfilled") {

                addToast({
                    type: "success",
                    content: `The new ${page.slice(0, -1)} created successfully`,
                    duration: 1000,
                    onRemoveComplete: () => {
                        setModelIsOpen(false);
                        isSubmitted = false;
                    }
                });

                setChangeLength(true);

            }

        }
    }

    useEffect(() => {
        dispatch(setLengths());
    }, [changeLength])

    return (
        <AnimatePresence mode="wait">
            { modelIsOpen && (<EntityForm setIsOpen={setModelIsOpen} page={page} onSubmit={submitHandler} />) }
        </AnimatePresence>
    );

}

export default Form;