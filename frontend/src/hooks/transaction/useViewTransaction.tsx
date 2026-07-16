import { fetchInstance } from "@/app/config/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

// interface ApiResponse<T> {
//     code: number;
//     message: string;
//     value: T;
// }

interface VieWTransactionResponseBody {
    following: {
        transactionId: number;
        userId: number;
        name: string;
        profileImg: string;
        walletAddress: string;
        transactionPeriod: number;
        amount: number;
        transfered: boolean;
        contractDate: string;
        expirationDate: string;
    }[];
    follower: {
        transactionId: number;
        userId: number;
        name: string;
        profileImg: string;
        walletAddress: string;
        transactionPeriod: number;
        amount: number;
        transfered: boolean;
        contractDate: string;
        expirationDate: string;
    }[];
}

const viewTransaction = async (privateKey: string | null) => {
    const response = await fetchInstance.get<VieWTransactionResponseBody>("/api/transaction", {
        headers: {
            "X-PRIVATE-KEY": privateKey,
        },
    });
    return response.data;
};

export const useViewTransaction = () => {
    const { privateKey } = useAuthStore();

    const query = useQuery<VieWTransactionResponseBody>({
        queryKey: ["transaction"],
        queryFn: () => viewTransaction(privateKey),
    });

    return { ...query };
};
