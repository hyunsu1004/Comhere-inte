import { fetchInstance } from "@/app/config/axios";
import { queryClient } from "@/app/config/query";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

interface RegisterTelegramProps {
    userName: string;
}

const registerTelegram = async (data: RegisterTelegramProps) => {
    const reponse = await fetchInstance.put("/api/user/telegram", data);
    return reponse.data;
};
export const useRegisterTelegram = () => {
    const telegramRef = useRef<HTMLInputElement | null>(null);

    const { mutate } = useMutation({
        mutationFn: () => {
            const payload = {
                userName: telegramRef.current?.value ?? "",
            };

            console.log(payload);
            return registerTelegram(payload);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myProfile"] });
            alert("성공적으로 저장되었습니다!");
        },
        onError: (error) => {
            console.error("Error response:", error.message);
            alert("텔레그램 등록에 실패하였습니다.");
        },
    });

    const handleRegisterTelegramClick = useCallback(() => {
        mutate();
    }, [mutate]);

    return {
        telegramRef,
        handleRegisterTelegramClick,
    };
};
