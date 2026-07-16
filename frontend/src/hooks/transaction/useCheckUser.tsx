import { fetchInstance } from "@/app/config/axios";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";

type BodyType =
    | "SKINNY"
    | "SKINNY_MUSCLE"
    | "STANDARD"
    | "WEIGHT_LOSS"
    | "MUSCLE"
    | "OVERWEIGHT"
    | "OBESITY"
    | "MUSCULAR_OBESITY"
    | "NONE";

interface CheckUserRequestBody {
    userName: string | undefined;
}

interface CheckUserResponseBody {
    userName: string;
    walletAddress: string;
    profileUrl: string;
    community: BodyType;
}

const checkUser = async (data: CheckUserRequestBody) => {
    const response = await fetchInstance.post<CheckUserResponseBody>("/api/transaction/checkUser", data);
    return response.data;
};

export const useCheckUser = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [userData, setUserData] = useState<CheckUserResponseBody | null>(null);

    const { mutate } = useMutation({
        mutationFn: (userName: string | undefined) => {
            const payload = {
                userName,
            };
            console.log(payload);
            return checkUser(payload);
        },

        onSuccess: (data) => {
            console.log("test" + data);
            setUserData(data);
        },
        onError: (error) => {
            console.error("Error response:", error.message);
            setUserData(null);
            // alert(error.message);
        },
    });

    const handleCheckClick = useCallback(
        (userName: string | undefined) => {
            mutate(userName);
        },
        [mutate],
    );

    return {
        userData,
        isChecked,
        setIsChecked,
        handleCheckClick,
    };
};
