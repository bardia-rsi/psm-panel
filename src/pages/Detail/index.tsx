import type { FC, ReactElement } from "react";
import type { Props as LogoProps } from "@/components/Logo";
import type { EntityItemWithType } from "@/types/Data/Entities/Entity";
import type { AppDispatch } from "@/app/store";
import type { EntityStates, EntityTypes } from "@/types/App/DataTypes";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { camelCase, startCase, last, get } from "lodash";
import { normalize } from "normalizr";
import cn from "classnames";
import { entity } from "@/app/schemas/entity";
import * as entitiesSlice from "@/app/slices/entities";
import { convertTypeToStateName } from "@/utils/entity";
import { useGetEntityItem } from "@/hooks/data/entities";
import { setLengths } from "@/app/slices/core/appData";
import Loader from "@/pages/Detail/Loader";
import Container from "@/pages/Detail/Container";
import BackButton from "@/components/BackButton";
import HeaderButton from "@/pages/Detail/HeaderButton";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/Logo";
import Record from "@/pages/Detail/Record";

interface ItemMeta {
    logo: LogoProps;
    title: string;
    link?: string | undefined | null;
    records: string[];
    footer?: string;
}

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

    const itemMeta: ItemMeta = {
        logo: {
            size: "lg"
        },
        title: "",
        records: [],
    }

    if (status === "succeeded") {

        item = Object.keys(item).length !== 0 ? item : prevItem!;

        item.type = item.type || page.slice(0, -1) as EntityTypes;

        switch (item.type) {
            case "contact":
                itemMeta.logo.name = item.name;
                itemMeta.logo.className = "!rounded-full";
                itemMeta.title = item.name;
                itemMeta.records = ["phoneNumber", "work", "email", "address", "website"];
                itemMeta.footer = "note";

                break;

            case "login":
                itemMeta.logo.src = item.company.logo;
                itemMeta.logo.colors = item.company.colors;
                itemMeta.logo.name = !item.company.logo ? item.company.name : undefined;
                itemMeta.title = item.company.name;
                itemMeta.link = item.company.website;
                itemMeta.records = [
                    "email", "password.current.content", "username", "phoneNumber", "name",
                    "dateOfBirth", "address", "note", "lastUsed"
                ];
                itemMeta.footer = "company.about";

                item.lastUsed = item.lastUsed ? new Date(item.lastUsed).toLocaleString() : "Never";

                break;

            case "paymentCard":
                itemMeta.logo.src = item.bank.logo;
                itemMeta.logo.colors = item.bank.colors;
                itemMeta.logo.name = item.bank.logo ? item.bank.name : undefined
                itemMeta.title = item.bank.name;
                itemMeta.link = item.bank.website;
                itemMeta.records = ["owner", "cardNumber", "password", "cvv2", "expiration", "note"];
                itemMeta.footer = "bank.about";

                item.expiration = item.expiration
                    ? new Date(item.expiration).getFullYear() + "/" + new Date(item.expiration).getMonth()
                    : null;

                break;

            case "wifiPassword":
                itemMeta.logo.local = "/icons/wifi.svg";
                itemMeta.title = item.name;
                itemMeta.records = ["password", "routerUsername", "routerPassword"];
                itemMeta.footer = "note";
        }

        itemMeta.records.push("updatedAt", "createdAt");

        item.updatedAt = item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "Never";
        item.createdAt = new Date(item.createdAt).toLocaleString();

    }

    const favoriteClickHandler = (): void => {
        if (page !== "trash") {

            const stateName = convertTypeToStateName(item.type);

            if (page === "favorites") {

                prevItem = item;

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

            setChangeLength(prevState => ++prevState);

        }
    }

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
                            <div className="flex items-center gap-x-3 xs:gap-x-4 px-2 pt-4 pb-2">
                                <Logo {...itemMeta.logo}
                                      className={cn(
                                          "transition shadow-xl shadow-black/15 dark:shadow-black/50",
                                          itemMeta.logo.className
                                      )} />
                                <div className="flex flex-col flex-1 justify-evenly overflow-hidden">
                                    <h3 className="text-xl xs:text-3xl whitespace-nowrap overflow-hidden text-ellipsis">{ itemMeta.title }</h3>
                                    {
                                        itemMeta.link && (
                                            <span className="text-link whitespace-nowrap overflow-hidden text-ellipsis">
                                                <a href={itemMeta.link}
                                                   target="_blank"
                                                   className="text-link border-b border-b-transparent hover:border-b-link">
                                                { itemMeta.link.replace(/^https?:\/\//, "") }
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
                            <hr />
                            {
                                itemMeta.records.map(key => {

                                    const value: string = get(item, key);
                                    const isDateFields: boolean = ["createdAt", "updatedAt", "lastUsed"].includes(key);

                                    return (
                                        <Record key={key}
                                                title={startCase(key.split(".")[0])}
                                                text={(value || "Not Set")}
                                                hover={!isDateFields}
                                                copy={value ? !isDateFields : false}
                                                hide={key.includes("password") || key.includes("cvv")} />
                                    )

                                })
                            }
                            {
                                itemMeta.footer && (
                                    <>
                                        <hr/>
                                        <Record title={startCase(last(itemMeta.footer.split(".")))}
                                                text={get(item, itemMeta.footer) || "Not Set"} />
                                    </>
                                )
                            }
                        </>
                    )
            }
        </Container>
    )

}

export default Detail;