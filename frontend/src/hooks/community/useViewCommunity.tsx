import { fetchInstance } from "@/app/config/axios";
import { useQuery } from "@tanstack/react-query";

interface ApiResponse<T> {
    code: number;
    message: string;
    value: T;
}

interface ViewCommunityReponseBody {
    communityType: Community;
    posts: {
        postId: number;
        userId: number;
        userName: string;
        profileImg: string;
        createdDate: string;
        bodyType: Community;
        content: string;
        fileUrl: string;
        fileType: string;
    }[];
}

type Community =
    | "SKINNY"
    | "SKINNY_MUSCLE"
    | "STANDARD"
    | "WEIGHT_LOSS"
    | "MUSCLE"
    | "OVERWEIGHT"
    | "OBESITY"
    | "MUSCULAR_OBESITY"
    | "NONE";

const viewCommunity = async (community: Community) => {
    const response = await fetchInstance.get<ApiResponse<ViewCommunityReponseBody>>(
        `/api/posts/${community.toUpperCase()}`,
    );
    return response.data.value;
};

export const useViewCommunity = (community: Community) => {
    const query = useQuery({
        queryKey: ["posts", community],
        queryFn: () => viewCommunity(community),
    });

    return { ...query };
};
