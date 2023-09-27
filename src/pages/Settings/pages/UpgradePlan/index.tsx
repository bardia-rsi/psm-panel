import type { FC, ReactElement } from "react";
import { useGetAppData } from "@/hooks/data/core";
import Container from "@/pages/Settings/Container";
import Loader from "@/pages/Settings/pages/UpgradePlan/Loader";
import Plans from "@/components/Plans";

const UpgradePlan: FC = (): ReactElement => {

    const { data, status } = useGetAppData();

    return (
        <Container>
            {
                status !== "succeeded"
                    ? <Loader />
                    : (
                        <>
                            <h2 className="mb-8 text-center capitalize">Unlock premium features by upgrading</h2>
                            <Plans slides={data.plans} />
                        </>
                    )
            }
        </Container>
    );

}

export default UpgradePlan;