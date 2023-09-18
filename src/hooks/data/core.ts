import { useAppSelector } from "@/app/hooks";
import { useGetData } from "@/hooks/useGetData";
import { set as setAppData, setLengths } from "@/app/slices/core/appData";
import { selectAppData } from "@/app/selectors/core";

export const useFetchAppData = () => {

    useGetData(setAppData, selectAppData);

    return useGetData(setLengths, selectAppData);

}

export const useGetAppData = () => useAppSelector(selectAppData);