import { Header } from "@/components/common/Header";
import { Post } from "@/components/common/Post";
import { Title } from "@/components/common/Title";

import { useNavigate, useParams } from "react-router-dom";
import { useViewCommunity } from "@/hooks/community/useViewCommunity";
import { useViewMyProfile } from "@/hooks/profile/useViewMyProfile";

export const CommunityPage = () => {
    const communityTypes = {
        SKINNY: "마른 체형",
        SKINNY_MUSCLE: "마른 근육형",
        STANDARD: "표준형",
        WEIGHT_LOSS: "감량형",
        MUSCLE: "근육형",
        OVERWEIGHT: "과체중형",
        OBESITY: "비만형",
        MUSCULAR_OBESITY: "근육 비만형",
        NONE: "-",
    };

    const navigate = useNavigate();
    const { type } = useParams<{ type: keyof typeof communityTypes }>();
    const community = type ? communityTypes[type] : "NONE";
    const { data } = useViewCommunity(type as keyof typeof communityTypes);
    const { data: user } = useViewMyProfile();

    const handleUserProfileClick = (id: number) => {
        navigate(`/profile/${id}`);
    };

    const hasMatchingBodyType = user?.inbody?.some((entry) => entry.bodyType === type);

    const handleGoToRegister = () => {
        if (user?.bodyType === type) navigate(`/post/register?communityType=${type}`);
        else {
            if (user?.bodyType === "NONE") {
                alert("인바디를 등록해야 글을 작성할 수 있습니다. 인바디를 먼저 등록해주세요.");
                navigate("/profile/my");
            } else if (!hasMatchingBodyType) {
                alert(`과거 체형이 ${community}이어야만 해당 커뮤니티에 글을 작성할 수 있습니다.`);
            }
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <Header></Header>
            <Title
                subTitle={`${community}이었던 사람들의 꿀팁 게시물을 살펴보아요`}
                title={`${community} 커뮤니티`}
            ></Title>

            <div className="flex flex-col gap-2">
                {data?.posts?.map((post) => (
                    <Post
                        key={post.postId}
                        userImgUrl={post.profileImg}
                        name={post.userName}
                        time={post.createdDate}
                        label={communityTypes[post.bodyType as keyof typeof communityTypes]}
                        text={post.content}
                        postImgUrl={post.fileUrl}
                        postImgType={post.fileType}
                        onClick={() => handleUserProfileClick(post.userId)}
                    />
                ))}
            </div>

            <button
                className="fixed bottom-5 rounded-full bg-point w-[60px] h-[60px] bg-[url('/src/assets/pencil.svg')] bg-no-repeat bg-center self-end cursor-pointer"
                onClick={handleGoToRegister}
            ></button>
        </div>
    );
};
