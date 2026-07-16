import { fetchInstance } from "@/app/config/axios";
import { queryClient } from "@/app/config/query";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

interface UpdateInfoRequestBody {
    introduce: string;
}

const updateInfo = async (data: UpdateInfoRequestBody) => {
    const response = await fetchInstance.put("/api/profile/update", data);
    return response.data;
};

export const useUpdateInfo = () => {
    const infoRef = useRef<HTMLTextAreaElement | null>(null);
    const { mutate } = useMutation({
        mutationFn: () => {
            const payload = {
                introduce: infoRef.current?.value ?? "",
            };
            console.log(payload);
            return updateInfo(payload);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myProfile"] });
            alert("성공적으로 수정되었습니다.");
        },

        onError: () => {
            alert("수정에 실패하였습니다.");
        },
    });

    const handleUpdateClick = useCallback(() => {
        mutate();
    }, [mutate]);

    return {
        infoRef,
        handleUpdateClick,
    };
};
