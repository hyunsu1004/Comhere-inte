import { fetchInstance } from "@/app/config/axios";
import { queryClient } from "@/app/config/query";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterTransactionResponseBody {
    privateKey: string;
    userName: string;
    transactionPeriod: number;
    amount: number;
    info: string;
}

const registerTransaction = async (data: RegisterTransactionResponseBody, privateKey: string) => {
    const response = await fetchInstance.post("/api/transaction", data, {
        headers: {
            "X-PRIVATE-KEY": privateKey,
        },
    });
    return response.data;
};

export const useReigsterTransaction = () => {
    const userNameRef = useRef<HTMLInputElement | null>(null);
    const transactionPeriodRef = useRef<HTMLInputElement | null>(null);
    const amountRef = useRef<HTMLInputElement | null>(null);
    const infoRef = useRef<HTMLTextAreaElement | null>(null);

    const { privateKey } = useAuthStore();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: () => {
            if (privateKey === null) {
                console.log("useRegisterTranscation");
                throw new Error("private key 정보가 없습니다. 먼저 등록해주세요.");
            }
            const payload = {
                privateKey,
                userName: userNameRef.current?.value ?? "",
                transactionPeriod: Number(transactionPeriodRef.current?.value ?? 0),
                amount: Number(amountRef.current?.value ?? 0),
                info: infoRef.current?.value ?? "",
            };

            console.log(payload);
            return registerTransaction(payload, privateKey);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transaction"] });
            queryClient.invalidateQueries({ queryKey: ["main"] });
            alert("성공적으로 등록되었습니다!");
            navigate("/");
        },
        onError: (error) => {
            console.error("Error response:", error.message);
            alert(error.message);
            navigate("/profile/my");
        },
    });

    const handleRegisterClick = useCallback(() => {
        mutate();
    }, [mutate]);

    return {
        userNameRef,
        transactionPeriodRef,
        amountRef,
        infoRef,
        handleRegisterClick,
    };
};
