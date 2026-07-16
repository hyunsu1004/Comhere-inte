import { fetchInstance } from "@/app/config/axios";
import { queryClient } from "@/app/config/query";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

interface RegisterWalletRequestBody {
    walletAddress: string;
}

const registerWallet = async (data: RegisterWalletRequestBody) => {
    const response = await fetchInstance.post("/api/profile/wallet", data);
    return response.data;
};

export const useRegisterWallet = () => {
    const walletRef = useRef<HTMLInputElement | null>(null);

    const { mutate } = useMutation({
        mutationFn: () => {
            const payload = {
                walletAddress: walletRef.current?.value ?? "",
            };

            console.log(payload);
            return registerWallet(payload);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wallet"] });
            queryClient.invalidateQueries({ queryKey: ["myProfile"] });

            alert("성공적으로 저장되었습니다!");
        },
        onError: (error) => {
            console.error("Error response:", error.message);
            alert("지갑 등록에 실패하였습니다.");
        },
    });

    const handleRegisterClick = useCallback(() => {
        mutate();
    }, [mutate]);

    return {
        walletRef,
        handleRegisterClick,
    };
};
