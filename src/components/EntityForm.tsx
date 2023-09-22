import type { Dispatch, SetStateAction, FC, ReactElement } from "react";
import type { FormikHelpers } from "formik";
import type { EntityStateTypes } from "@/types/App/DataTypes";
import type { Dictionary } from "@/types/Types";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { random, startCase } from "lodash";
import cn from "classnames";
import SVG from "react-inlinesvg";
import * as schemas from "@/schemas/entities";
import { useGetAppData } from "@/hooks/data/core";
import { convertStateNameToType } from "@/utils/entity";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Form from "@/components/ui/Form/Form";
import Row from "@/components/ui/Form/Row";
import Group from "@/components/ui/Form/Group";

interface Props {
    page: EntityStateTypes;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onSubmit: (values: Dictionary<string>, formikHelpers: FormikHelpers<Dictionary<string>>) => (void | Promise<void>);
}

const EntityForm: FC<Props> = ({ page, setIsOpen, onSubmit }): ReactElement => {

    const type = convertStateNameToType(page);

    const { data, status } = useGetAppData();

    const formData = data.entityForms[type];
    const tip = formData.tips[random(0, formData.tips.length - 1)];

    let initialValues: null | Dictionary<string> = null;

    if (status === "succeeded") {
        initialValues = Object.fromEntries(
            Object.entries(formData.fields)
                .map(k => k[1].map(r => r.name))
                .flat()
                .map(k => ([k, ""]))
        );
    }

    return createPortal(
        <motion.div initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className={cn(
                        "w-full h-screen bg-secondary",
                        "absolute top-0 right-0 bottom-0 left-0 z-50"
                    )}>
            <div className="h-full flex flex-wrap py-8 px-4 lg:px-8 overflow-y-hidden">
                {
                    initialValues && status !== "succeeded"
                        ? <h3>Loading...</h3>
                        : (
                            <>
                                <h3 className="w-full text-xl xs:text-2xl sm:text-3xl text-center relative">
                                    { `New ${startCase(page.slice(0, -1))}` }
                                    <Button variant="icon"
                                            compact
                                            className="absolute top-1/2 -translate-y-1/2 right-0"
                                            type="button"
                                            onClick={() => setIsOpen(false)}>
                                        <Icon src="/icons/xmark.svg" />
                                    </Button>
                                </h3>
                                <div className="h-full w-full lg:w-1/2 flex flex-col justify-center gap-y-4 py-4">
                                    <Form initialValues={initialValues!}
                                          validationSchema={schemas[type].create}
                                          onSubmit={onSubmit}
                                          form={{ className: "w-full flex-nowrap gap-y-6 px-4 overflow-y-auto" }}
                                          button={{ full: true }}>
                                        {
                                            Object.keys(formData.fields).map((key) => (
                                                <div key={key}>
                                                    <h6 className="mb-1">
                                                        {`${ startCase(key) } Info (${ key === "basic" ?
                                                            "Required" : 
                                                            "Optional" 
                                                        })`}
                                                    </h6>
                                                    <div className={cn(
                                                        "flex flex-col gap-4", key === "base" && "mb-8"
                                                    )}>
                                                        {
                                                            formData.fields[key as keyof typeof formData.fields]
                                                                ?.map(({ name, label, as, ...rest }) => (
                                                                    <Row key={name}>
                                                                        <Group name={name}
                                                                               label={label ?? startCase(name)}
                                                                               autoComplete={
                                                                                    as === "input" || as === undefined
                                                                                        ? "off"
                                                                                        : undefined
                                                                               }
                                                                               as={as}
                                                                               {...rest} />
                                                                    </Row>
                                                                ))
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </Form>
                                </div>
                                <div className="hidden lg:flex h-full w-1/2 flex-col justify-center items-center p-4">
                                    <SVG src={formData.image} className="max-w-4xl w-3/4 mb-8" />
                                    <h3 className="text-2xl">{ tip.title }</h3>
                                    <p className="text-center">{ tip.description }</p>
                                </div>
                            </>
                        )
                }
            </div>
        </motion.div>,
        document.body
    );

}

export default EntityForm;