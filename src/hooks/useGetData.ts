import type { State } from "@/app/store";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

export const useGetData = <O>(action: any, selector: (state: State) => O) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(action());
    }, [dispatch, action]);

    return useAppSelector(selector);

}