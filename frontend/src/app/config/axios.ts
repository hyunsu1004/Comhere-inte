import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

import { BASE_URL } from "@/app/constants/URI";
import { useAuthStore } from "@/stores/useAuthStore";

const baseURL = BASE_URL;

export const createInstance = (config: AxiosRequestConfig): AxiosInstance => {
    const instance = axios.create({
        timeout: 100000,
        ...config,
        baseURL,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...config.headers,
        },
    });

    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const { accessToken } = useAuthStore.getState();
            if (accessToken) {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error: unknown) => Promise.reject(error),
    );

    // instance.interceptors.response.use(
    //     (response) => response,
    //     (error) => {
    //         if (error.response?.status === 403) {
    //             const { logout } = useAuthStore.getState();

    //             if (typeof window !== "undefined") {
    //                 alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    //             }

    //             logout();

    //             window.location.href = "/start";
    //         }

    //         return Promise.reject(error);
    //     },
    // );

    return instance;
};

export const fetchInstance = createInstance({});
