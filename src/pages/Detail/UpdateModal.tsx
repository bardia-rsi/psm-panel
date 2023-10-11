import type { Dispatch, SetStateAction, FC, ReactElement } from "react";
import type { FormikHelpers } from "formik";
import type { EntityStates } from "@/types/App/DataTypes";
import type { EntityItemCreatePayload } from "@/types/Data/Entities/Entity";
import type { FullFilledAction, RejectedAction } from "@/types/App/ThunkActions";
import type { Error } from "@/types/App/Error";
import type { Dictionary } from "@/types/Types";
import { useParams } from "react-router-dom";
import { omitBy, pickBy, isEqual } from "lodash";
import * as entitySlices from "@/app/slices/entities";
import { getEntityFields } from "@/helpers/entityItem";
import { useGetEntityItem } from "@/hooks/data/entities";
import { useAppDispatch } from "@/app/hooks";
import { useToast } from "@/hooks/useToast";
import EntityForm from "@/components/EntityForm";

interface Props {
    page: Exclude<EntityStates, "allItems" | "trash" | "favorites">;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const UpdateModal: FC<Props> = ({ page, isOpen, setIsOpen }): ReactElement => {

    const { pid } = useParams<"pid">();
    const { item } = useGetEntityItem(page, pid!);
    const dispatch = useAppDispatch();
    const { addToast } = useToast();

    const onSubmit = async (
        values: EntityItemCreatePayload,
        formikValues: FormikHelpers<EntityItemCreatePayload>
    ): Promise<void> => {

        formikValues.setSubmitting(true);

        if (isEqual(pickBy(getEntityFields(item), v => v !== null), values)) {

            addToast({
                type: "success",
                content: `The ${page.slice(0, -1)} updated successfully`,
                duration: 1000,
                onRemoveComplete: () => setIsOpen(false)
            });

            return;

        }

        const res: RejectedAction | FullFilledAction = await dispatch(entitySlices[page].update({
            ...omitBy(values, v => v === ""),
            pid: pid!
        }));

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
                content: `The ${page.slice(0, -1)} updated successfully`,
                duration: 1000,
                onRemoveComplete: () => setIsOpen(false)
            });

        }

    }

    return (
        <EntityForm page={page}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    onSubmit={onSubmit}
                    submitBtnText="Update"
                    initialValues={pickBy(getEntityFields(item), v => v !== null) as Dictionary<string>}
        />
    );

}

export default UpdateModal;