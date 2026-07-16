import { fetchInstance } from "@/app/config/axios";
import { queryClient } from "@/app/config/query";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

interface TransferRequestBody {
    transactionId: number;
    amount: number;
}

const transfer = async (data: TransferRequestBody, privateKey: string) => {
    const response = await fetchInstance.post(
        `/api/transaction/pay/${data.transactionId}?amount=${data.amount}`,
        {}, 
        {
            headers: {
                "X-PRIVATE-KEY": privateKey,
            },
        },
    );
    return response.data;
};

export const useTransfer = () => {
    const { privateKey } = useAuthStore();

    const { mutate } = useMutation({
        mutationFn: (payload: TransferRequestBody) => {
            console.log("useTransfer");

            if (!privateKey) throw new Error("Private key가 등록되지 않았습니다.");
            return transfer(payload, privateKey);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transaction"] });
            queryClient.invalidateQueries({ queryKey: ["myProfile"] });
            alert("성공적으로 송금되었습니다!");
        },
        onError: (error) => {
            console.error("Error response:", error.message);
            alert("송금에 실패하였습니다.");
        },
    });

    const handleTransferClick = useCallback(
        (payload: TransferRequestBody) => {
            mutate(payload);
        },
        [mutate],
    );

    return {
        handleTransferClick,
    };
};
