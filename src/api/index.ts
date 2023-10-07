import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import Cookie from "js-cookie";
import axiosRetry from "axios-retry";
import { logout, isExpiredAccessTokenError, setNewAccessToken } from "@/helpers/token";

axios.defaults.headers.common = {};
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

export const dataApi = axios.create({
    baseURL: import.meta.env.VITE_API_API_URL
});

dataApi.defaults.headers.get["Accept"] = "application/json";
dataApi.defaults.headers.put["Content-Type"] = "application/json";
dataApi.defaults.headers.put["Accept"] = "application/json";

dataApi.interceptors.request.use(async (config) => {

    const token: string | undefined = Cookie.get("psm_access_token");

    if (token) {
        config.headers.set("authorization", token);
    } else {
        await setNewAccessToken(config);
    }

    return config;

});

axiosRetry(dataApi, {
    retries: 2,
    retryDelay: () => 1000,
    retryCondition: (error: AxiosError<any>) => isExpiredAccessTokenError(error),
    onRetry: async (_, error, requestConfig): Promise<void> => {

        if (isExpiredAccessTokenError(error)) {
            await setNewAccessToken(requestConfig as InternalAxiosRequestConfig);
        }

        return;

    }
});

export const authApi = axios.create({
    baseURL: import.meta.env.VITE_API_AUTH_URL
});

authApi.interceptors.request.use(config => {

    const token: string | undefined = Cookie.get("psm_refresh_token");

    if (token) {
        config.headers.set("authorization", token);
    } else {
        logout();
    }

    return config;

});