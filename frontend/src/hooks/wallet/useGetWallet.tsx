import { fetchInstance } from "@/app/config/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface GetWallet {
    privateKey: string;
    address: string;
}

const getWallet = async () => {
    const response = await fetchInstance.post<GetWallet>("/api/wallet/create");
    return response.data;
};

export const useGetWallet = () => {
    const { setPrivateKey, setWalletAddress, setWalletRegistered } = useAuthStore();

    const query = useQuery({
        queryKey: ["walletAddress"],
        queryFn: () => getWallet(),
    });

    useEffect(() => {
        if (query.data?.privateKey && query.data?.address) {
            setPrivateKey(query.data.privateKey);
            setWalletAddress(query.data.address);
            setWalletRegistered(true);
        }
    }, [query.data?.privateKey, setPrivateKey, query.data?.address, setWalletAddress]);

    return { ...query };
};
