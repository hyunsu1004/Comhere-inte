import { fetchInstance } from "@/app/config/axios";
import { useQuery } from "@tanstack/react-query";

interface ApiResponse<T> {
    code: number;
    message: string;
    value: T;
}

type BodyLevel = "BELOW_STANDARD" | "STANDARD" | "ABOVE_STANDARD";
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

type Gender = "MALE" | "FEMALE";
type PostType = "SUBSCRIBE" | "NORMAL";

interface ViewUserProfileResponseBody {
    userId: number;
    userName: string;
    bodyType: BodyType;
    profileImg: string;
    telegram: string;
    eth: string;
    info: string;
    walletRegistered: boolean;
    goal: {
        bodyType: BodyType;
        weight: number;
        muscle: number;
        fat: number;
    };
    inbody: {
        createdAt: string;
        gender: Gender;
        bodyType: BodyType;
        height: number;
        weight: number;
        muscle: number;
        fat: number;
        bmi: number;
        armGrade: BodyLevel;
        bodyGrade: BodyLevel;
        userCase: BodyType;
        legGrade: BodyLevel;
    }[];

    posts: {
        postId: number;
        profileImg: string;
        userName: string;
        date: string;
        postType: PostType;
        communityType: BodyType;
        content: string;
        fileUrl: string;
        fileType: string;
    }[];
}

const viewMyProfile = async () => {
    const response = await fetchInstance.get<ApiResponse<ViewUserProfileResponseBody>>("/api/profile/my");
    return response.data.value;
};

export const useViewMyProfile = () => {
    const query = useQuery({
        queryKey: ["myProfile"],
        queryFn: () => viewMyProfile(),
    });

    return { ...query };
};
