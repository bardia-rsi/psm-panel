import type { Dispatch, SetStateAction, FC, ReactElement } from "react";
import type { FormikHelpers } from "formik";
import type { EntityStates } from "@/types/App/DataTypes";
import type { EntityItemCreatePayload } from "@/types/Data/Entities/Entity";
import type { FullFilledAction, RejectedAction } from "@/types/App/ThunkActions";
import type { Error } from "@/types/App/Error";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { omitBy } from "lodash";
import { useAppDispatch } from "@/app/hooks";
import { useToast } from "@/hooks/useToast";
import * as entitySlices from "@/app/slices/entities";
import { setLengths } from "@/app/slices/core/appData";
import EntityForm from "@/components/EntityForm";

interface Props {
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
    page: Exclude<EntityStates, "allItems" | "trash" | "favorites">;
}

const Form: FC<Props> = ({ setModalIsOpen, modalIsOpen, page }): ReactElement => {

    const [changeLength, setChangeLength] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { addToast } = useToast();

    const submitHandler = async (
        values: EntityItemCreatePayload,
        formikValues: FormikHelpers<EntityItemCreatePayload>
    ): Promise<void> => {

        formikValues.setSubmitting(true);

        const res: RejectedAction | FullFilledAction = await dispatch(entitySlices[page].create(
            omitBy(values, v => v === "")
        ));

        if (res.meta.requestStatus === "rejected") {

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
                onRemoveComplete: () => setModalIsOpen(false)
            });

            setChangeLength(true);

            if (location.pathname.split("/").length === 3) {
                navigate("../");
            }

        }

    }

    useEffect(() => {
        dispatch(setLengths());
    }, [changeLength])

    return <EntityForm isOpen={modalIsOpen}
                       setIsOpen={setModalIsOpen}
                       page={page}
                       onSubmit={submitHandler}
                       submitBtnText="Create"/>;

}

export default Form;