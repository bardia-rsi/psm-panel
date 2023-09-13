import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { AccessToken } from "@/types/Data/Response/Auth";
import Cookie from "js-cookie";
import { authApi } from "@/api";

export const isExpiredAccessTokenError = (error: AxiosError<any>): boolean => (
    error.response?.status === 401 && error.response?.data.code === "auth.002"
);

export const logout = (): void => {

    Cookie.remove("psm_access_token");
    Cookie.remove("psm_refresh_token");

    window.location.href = "http://www.localhost:8000/login";

}

export const setNewAccessToken = async (config: InternalAxiosRequestConfig<any>): Promise<void> => {
    try {

        const res = await authApi.post<AccessToken>("/token");

        Cookie.set("psm_access_token", res.data.accessToken, {
            domain: "localhost",
            expires: new Date(Date.now() + 3600000)
        });

        config.headers.set("authorization", res.data.accessToken);

    } catch (e) {
        throw e;
    }
}