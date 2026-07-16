import { fetchInstance } from "@/app/config/axios";
import { useQuery } from "@tanstack/react-query";

interface ApiResponse<T> {
    code: number;
    message: string;
    value: T;
}

type BodyLevel = "BELOW_STANDARD" | "STANDARD" | "ABOVE_STANDARD";
type CommunityType =
    | "SKINNY"
    | "SKINNY_MUSCLE"
    | "STANDARD"
    | "WEIGHT_LOSS"
    | "MUSCLE"
    | "OVERWEIGHT"
    | "OBESITY"
    | "MUSCULAR_OBESITY";
type Gender = "MALE" | "FEMALE";
type PostType = "SUBSCRIBE" | "NORMAL";

interface ViewUserProfileResponseBody {
    userId: number;
    userName: string;
    bodyType: CommunityType;
    liked: boolean;
    telegram: string;
    profileImg: string;
    info: string;
    inbody: {
        createdAt: string;
        gender: Gender;
        bodyType: CommunityType;
        height: number;
        weight: number;
        muscle: number;
        fat: number;
        bmi: number;
        userCase: CommunityType;
        armGrade: BodyLevel;
        bodyGrade: BodyLevel;
        legGrade: BodyLevel;
    }[];
    posts: {
        postId: number;
        profileImg: string;
        userName: string;
        date: string;
        postType: PostType;
        communityType: CommunityType;
        content: string;
        fileUrl: string;
        fileType: string;
    }[];
}

const viewUserProfile = async (userId: number) => {
    const response = await fetchInstance.get<ApiResponse<ViewUserProfileResponseBody>>(`/api/profile/${userId}`);
    return response.data.value;
};

export const useViewUserProfile = (userId: number) => {
    const query = useQuery({
        queryKey: ["profile", userId],
        queryFn: () => viewUserProfile(userId),
    });

    return { ...query };
};
