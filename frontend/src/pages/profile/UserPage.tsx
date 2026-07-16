import { Button } from "@/components/common/Button";
import { Header } from "@/components/common/Header";
import { Post } from "@/components/common/Post";
import { Profile } from "@/components/profile/Profile";
import { useState } from "react";
import { History } from "@/components/profile/History";
import { Box } from "@/components/common/Box";
import { InbodyInfo } from "@/components/profile/InbodyInfo";
import { useParams } from "react-router-dom";
import { useInterestUser } from "@/hooks/profile/useInterestUser";
import { useViewUserProfile } from "@/hooks/profile/useViewUserProfile";
import { bodyTypeOptions } from "@/app/constants/bodyTypeOptions";
import { Badge } from "@/components/common/Badge";
import * as Dialog from "@radix-ui/react-dialog";

export const UserPage = () => {
    const [isPost, setIsPost] = useState(true);
    const { id } = useParams<{ id: string }>();
    const userId = parseInt(id ?? "");

    const { registerInterest, deleteInterest } = useInterestUser(userId);
    const { data, isLoading, isError } = useViewUserProfile(userId);

    const handlePostClick = () => setIsPost(true);
    const handleInbodyClick = () => setIsPost(false);

    const handleLikeClick = () => {
        if (data?.liked) deleteInterest(userId);
        else registerInterest(userId);
    };

    const handleChatClick = () => {
        if (data?.telegram) window.open(data.telegram);
    };

    const getCommunityTypeKorean = (key: string) => {
        const found = bodyTypeOptions.find((item) => item.key === key);
        return found ? found.value : key;
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError || !data) return <div>사용자 정보를 불러올 수 없습니다.</div>;

    const inbody = data.inbody ?? [];
    const posts = data.posts ?? [];
    const latestInbody = inbody.length > 0 ? inbody[inbody.length - 1] : null;

    // simplified inbodyHistory for transitions
    const inbodyHistory =
        inbody.length > 1
            ? inbody.slice(1).map((cur, idx) => ({
                  date: cur.createdAt,
                  prevInbody: inbody[idx],
                  curInbody: cur,
              }))
            : [];

    return (
        <div className="flex flex-col gap-6">
            <Header />

            <Profile
                userName={data.userName}
                profileImg={data.profileImg}
                label={latestInbody ? getCommunityTypeKorean(latestInbody.userCase) : "미지정"}
                info={data.info}
                type="other"
                isLiked={data.liked}
                onLikeClick={handleLikeClick}
                onChatClick={handleChatClick}
            />

            <div className="flex flex-row gap-4">
                <Button
                    onClick={handlePostClick}
                    type={isPost ? "primary" : "secondary"}
                    size="m"
                    label="게시물 보기"
                />
                <Button
                    onClick={handleInbodyClick}
                    type={!isPost ? "primary" : "secondary"}
                    size="m"
                    label="인바디 추이 보기"
                />
            </div>

            {isPost ? (
                <div className="flex flex-col gap-2">
                    {posts.length === 0 ? (
                        <div>사용자가 등록한 게시물이 없습니다.</div>
                    ) : (
                        posts.map((post) => (
                            <Post
                                key={post.postId}
                                userImgUrl={data.profileImg}
                                name={data.userName}
                                time={post.date ?? ""}
                                label={getCommunityTypeKorean(post.communityType)}
                                text={post.content}
                                postImgUrl={post.fileUrl}
                                postImgType={post.fileType}
                                postType={post.postType}
                            />
                        ))
                    )}
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-darkGray">체형 변화</span>

                        {inbody.length === 0 && <div>사용자가 등록한 인바디 정보가 없습니다.</div>}

                        {inbody.length === 1 && (
                            <div>
                                <History date={inbody[0].createdAt} cur={getCommunityTypeKorean(inbody[0].userCase)} />
                            </div>
                        )}

                        {inbody.length > 1 &&
                            inbodyHistory.map((item, idx) => (
                                <Dialog.Root key={idx}>
                                    <Dialog.Trigger className="text-left">
                                        <History
                                            date={item.date}
                                            prev={getCommunityTypeKorean(item.prevInbody.userCase)}
                                            cur={getCommunityTypeKorean(item.curInbody.userCase)}
                                        />
                                    </Dialog.Trigger>
                                    <Dialog.Portal>
                                        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                                        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md max-h-[90vh] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl focus:outline-none p-6 overflow-hidden">
                                            <div className="overflow-y-auto max-h-[80vh] flex flex-col gap-6">
                                                {item.prevInbody && (
                                                    <div>
                                                        <div className="flex flex-row gap-2">
                                                            <span className="font-bold text-darkGray">
                                                                이전 인바디 수치
                                                            </span>
                                                            <Badge
                                                                type="primary"
                                                                label={getCommunityTypeKorean(item.prevInbody.userCase)}
                                                            />
                                                        </div>
                                                        <Box className="flex-col">
                                                            <InbodyInfo
                                                                type="키"
                                                                value={`${item.prevInbody.height}cm`}
                                                            />
                                                            <InbodyInfo
                                                                type="체중"
                                                                value={`${item.prevInbody.weight}kg`}
                                                            />
                                                            <InbodyInfo
                                                                type="골격근량"
                                                                value={`${item.prevInbody.muscle}kg`}
                                                            />
                                                            <InbodyInfo
                                                                type="체지방량"
                                                                value={`${item.prevInbody.fat}%`}
                                                            />
                                                            <InbodyInfo type="BMI" value={`${item.prevInbody.bmi}`} />
                                                            <InbodyInfo
                                                                type="팔 근육 수준"
                                                                label={item.prevInbody.armGrade}
                                                            />
                                                            <InbodyInfo
                                                                type="몸통 근육 수준"
                                                                label={item.prevInbody.bodyGrade}
                                                            />
                                                            <InbodyInfo
                                                                type="다리 근육 수준"
                                                                label={item.prevInbody.legGrade}
                                                            />
                                                        </Box>
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="flex flex-row gap-2">
                                                        <span className="font-bold text-darkGray">
                                                            이후 인바디 수치
                                                        </span>
                                                        <Badge
                                                            type="primary"
                                                            label={getCommunityTypeKorean(item.curInbody.userCase)}
                                                        />
                                                    </div>
                                                    <Box className="flex-col">
                                                        <InbodyInfo type="키" value={`${item.curInbody.height}cm`} />
                                                        <InbodyInfo type="체중" value={`${item.curInbody.weight}kg`} />
                                                        <InbodyInfo
                                                            type="골격근량"
                                                            value={`${item.curInbody.muscle}kg`}
                                                        />
                                                        <InbodyInfo type="체지방량" value={`${item.curInbody.fat}%`} />
                                                        <InbodyInfo type="BMI" value={`${item.curInbody.bmi}`} />
                                                        <InbodyInfo
                                                            type="팔 근육 수준"
                                                            label={item.curInbody.armGrade}
                                                        />
                                                        <InbodyInfo
                                                            type="몸통 근육 수준"
                                                            label={item.curInbody.bodyGrade}
                                                        />
                                                        <InbodyInfo
                                                            type="다리 근육 수준"
                                                            label={item.curInbody.legGrade}
                                                        />
                                                    </Box>
                                                </div>
                                            </div>
                                            <Dialog.Close className="absolute top-2 right-2">✕</Dialog.Close>
                                        </Dialog.Content>
                                    </Dialog.Portal>
                                </Dialog.Root>
                            ))}
                    </div>

                    {latestInbody && (
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex flex-row gap-2">
                                <span className="font-bold text-darkGray">인바디 수치</span>
                                <Badge type="primary" label={getCommunityTypeKorean(latestInbody.userCase)} />
                            </div>
                            <Box className="flex-col">
                                <InbodyInfo type="키" value={`${latestInbody.height}cm`} />
                                <InbodyInfo type="체중" value={`${latestInbody.weight}kg`} />
                                <InbodyInfo type="골격근량" value={`${latestInbody.muscle}kg`} />
                                <InbodyInfo type="체지방량" value={`${latestInbody.fat}%`} />
                                <InbodyInfo type="BMI" value={`${latestInbody.bmi}`} />
                                <InbodyInfo type="팔 근육 수준" label={latestInbody.armGrade} />
                                <InbodyInfo type="몸통 근육 수준" label={latestInbody.bodyGrade} />
                                <InbodyInfo type="다리 근육 수준" label={latestInbody.legGrade} />
                            </Box>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
