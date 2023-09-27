import { useAppSelector } from "@/app/hooks";
import { useGetData } from "@/hooks/useGetData";
import { set as setAppData, setLengths } from "@/app/slices/core/appData";
import { set as setUser } from "@/app/slices/core/user";
import { selectAppData, selectUser } from "@/app/selectors/core";

export const useFetchAppData = () => {

    useGetData(setAppData, selectAppData);

    return useGetData(setLengths, selectAppData);

}

export const useGetAppData = () => useAppSelector(selectAppData);

export const useFetchUser = () => useGetData(setUser, selectUser);

export const useGetUser = () => useAppSelector(selectUser);