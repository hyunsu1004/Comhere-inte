import { fetchInstance } from "@/app/config/axios";
import { useQuery } from "@tanstack/react-query";

interface ApiResponse<T> {
    code: number;
    message: string;
    value: T;
}

type BodyType =
    | "SKINNY"
    | "SKINNY_MUSCLE"
    | "STANDARD"
    | "WEIGHT_LOSS"
    | "MUSCLE"
    | "WEIGHT"
    | "OVERWEIGHT"
    | "OBESITY"
    | "MUSCULAR_OBESITY";

interface ViewMainResponseBody {
    interestUser: {
        userId: number;
        userName: string;
        profileImg: string;
        bodyType: BodyType;
    }[];
    subscribeUser: {
        userId: number;
        userName: string;
        profileImg: string;
        prevType: BodyType;
        bodyType: BodyType;
    }[];
    recommendUser: {
        userId: number;
        userName: string;
        profileImg: string;
        bodyType: BodyType;
        recommendReason: string;
        telegramUrl: string;
    }[];
    subscribePosts: {
        postId: number;
        userId: number;
        userName: string;
        profileImg: string;
        createdDate: string;
        bodyType: BodyType;
        content: string;
        fileUrl: string;
        fileType: string;
    }[];
}

const viewMain = async () => {
    const response = await fetchInstance.get<ApiResponse<ViewMainResponseBody>>("/api/main");
    return response.data.value;
};

export const useViewMain = () => {
    const query = useQuery({
        queryKey: ["main"],
        queryFn: () => viewMain(),
    });

    return { ...query };
};
