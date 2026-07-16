import { fetchInstance } from "@/app/config/axios";
import { queryClient } from "@/app/config/query";
import { useMutation } from "@tanstack/react-query";

const registerInterestingUser = async (userId: number): Promise<void> => {
    const response = await fetchInstance.post("api/user/interest", {
        toUser: userId,
    });
    return response.data;
};

const deleteInterestingUser = async (userId: number): Promise<void> => {
    const response = await fetchInstance.delete("api/user/interest", {
        data: { toUser: userId },
    });
    return response.data;
};

export const useInterestUser = (userId: number) => {
    const registerMutation = useMutation({
        mutationFn: (userId: number) => registerInterestingUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile", userId] });
            alert("관심 사용자 등록이 완료되었습니다");
        },
        onError: () => {
            alert("관심 사용자 등록에 실패했습니다.");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (userId: number) => deleteInterestingUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile", userId] });
            alert("관심 사용자 취소가 완료되었습니다");
        },
        onError: () => {
            alert("관심 사용자 취소에 실패했습니다.");
        },
    });

    return {
        registerInterest: registerMutation.mutate,
        deleteInterest: deleteMutation.mutate,
    };
};
