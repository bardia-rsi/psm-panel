import type { FC, ReactElement } from "react";
import type { Props as LogoProps } from "@/components/Logo";
import type { EntityItemWithType } from "@/types/Data/Entities/Entity";
import type { EntityStates, EntityTypes } from "@/types/App/DataTypes";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetEntityItem } from "@/hooks/data/entities";
import Loader from "@/pages/Detail/Loader";
import Navbar from "@/pages/Detail/Navbar";
import Header from "@/pages/Detail/Header";
import Records from "@/pages/Detail/Records";
import Footer from "@/pages/Detail/Footer";
import Container from "@/pages/Detail/Container";

interface ItemMeta {
    logo: LogoProps;
    title: string;
    link?: string | undefined | null;
    records: string[];
    footer?: string;
}

interface Props {
    page: EntityStates;
}

let prevItem: EntityItemWithType | undefined = undefined;

const Detail: FC<Props> = ({ page }): ReactElement => {

    const params = useParams();

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
                itemMeta.records = ["email", "password", "username", "phoneNumber", "note", "lastUsed"];
                itemMeta.footer = "company.about";

                item.lastUsed = item.lastUsed ? new Date(item.lastUsed).toLocaleString() : "Never";

                break;

            case "paymentCard":
                itemMeta.logo.src = item.bank?.logo;
                itemMeta.logo.colors = item.bank?.colors;
                itemMeta.logo.name = item.bank?.logo ? item.bank.name : item.owner
                itemMeta.title = item.bank?.name ?? "Not Recognized Bank";
                itemMeta.link = item.bank?.website;
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



    const setPrevItem = (): void => {
        prevItem = item;
    }

    useEffect(() => {
        return () => {
            prevItem = undefined;
        }
    }, []);

    return (
        <Container>
            { status === "idle" || status === "loading" && <Loader /> }
            {
                status === "succeeded" && (
                    <>
                        <Navbar page={page}
                                item={item}
                                title={itemMeta.title}
                                setPrevItem={setPrevItem} />
                        <Header page={page}
                                item={item}
                                logo={itemMeta.logo}
                                title={itemMeta.title}
                                link={itemMeta.link}
                                setPrevItem={setPrevItem} />
                        <hr />
                        <Records item={item} records={itemMeta.records} />
                        {
                            itemMeta.footer && (
                                <>
                                    <hr />
                                    <Footer item={item} recordKey={itemMeta.footer} />
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