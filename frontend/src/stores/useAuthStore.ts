import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    isLoggedIn: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    privateKey: string | null;
    walletRegistered: boolean;
    walletAddress: string | null;
    setAccessToken: (token: string) => void;
    setRefreshToken: (token: string) => void;
    setPrivateKey: (key: string) => void;
    login: () => void;
    logout: () => void;
    setWalletRegistered: (flag: boolean) => void;
    setWalletAddress: (adress: string) => void;
}

export const useAuthStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            accessToken: null,
            refreshToken: null,
            privateKey: null,
            walletRegistered: false,
            walletAddress: null,

            setAccessToken: (token: string) => {
                set({ isLoggedIn: true, accessToken: token });
            },
            setRefreshToken: (token: string) => {
                set({ refreshToken: token });
            },
            setPrivateKey: (key: string) => {
                set({ privateKey: key });
            },
            login: () => {
                set({ isLoggedIn: true });
            },
            logout: () => {
                set({ isLoggedIn: false, accessToken: null, refreshToken: null, privateKey: null });
            },
            setWalletRegistered: (flag: boolean) => {
                set({ walletRegistered: flag });
            },
            setWalletAddress: (address: string) => {
                set({ walletAddress: address });
            },
        }),
        {
            name: "auth-storage",
            partialize: (state: AuthState) => ({
                isLoggedIn: state.isLoggedIn,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                privateKey: state.privateKey,
                walletRegistered: state.walletRegistered,
            }),
        },
    ),
);
