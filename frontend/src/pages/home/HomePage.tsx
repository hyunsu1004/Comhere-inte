import { useNavigate } from "react-router-dom";
import { CommunityButton } from "@/components/home/CommunityButton";
import logo_sm from "@/assets/logo_sm.svg";
import profile from "@/assets/profile.svg";
import { Box } from "@/components/common/Box";
import { InfoCard } from "@/components/common/InfoCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SubscribeUser } from "@/components/home/SubscribeUser";
import { Post } from "@/components/common/Post";
import { Button } from "@/components/common/Button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { RecommendUser } from "@/components/home/RecommendUser";
import { useViewMain } from "@/hooks/home/useViewMain";
import { useViewTransaction } from "@/hooks/transaction/useViewTransaction";
import { useAuthStore } from "@/stores/useAuthStore";
import { TransactionItem } from "@/components/transaction/TransactionItem";
import { formatShortDate } from "@/app/utils/date";

enum BodyTypeEnum {
    SKINNY = "마른 체형",
    SKINNY_MUSCLE = "마른 근육형",
    STANDARD = "표준형",
    WEIGHT_LOSS = "감량형",
    MUSCLE = "근육형",
    WEIGHT = "체중형",
    OVERWEIGHT = "과제충형",
    OBESITY = "비만형",
    MUSCULAR_OBESITY = "근육 비만형",
    NONE = "-",
}

export const HomePage = () => {
    const navigate = useNavigate();
    const { privateKey } = useAuthStore();
    const hasKey = Boolean(privateKey);

    // 메인 데이터
    const { data } = useViewMain();

    // 거래 데이터 (privateKey 없으면 data undefined)
    const { data: transactions } = useViewTransaction();

    // 거래 구역 클릭 핸들러
    const handleTransactionClick = () => {
        if (!hasKey) {
            alert("privateKey를 등록해야 거래 기능을 이용할 수 있습니다.");
            navigate("/profile/my");
        } else {
            navigate("/transaction");
        }
    };

    // 거래 추가 버튼 핸들러
    const handleAddTransaction = () => {
        if (!hasKey) {
            alert("privateKey를 등록해야 거래 기능을 이용할 수 있습니다.");
            navigate("/profile/my");
        } else {
            alert("판매자만 등록할 수 있습니다.");
            navigate("/transaction/register");
        }
    };

    const handleCommunity = (communityName: string) => {
        navigate(`/community/${communityName}`);
    };
    const handleProfile = () => {
        navigate("/profile/my");
    };
    const handleUserProfileClick = (id: number) => {
        navigate(`/profile/${id}`);
    };

    return (
        <div className="flex flex-col gap-8">
            {/* 헤더 */}
            <div className="flex justify-between items-center">
                <img src={logo_sm} className="cursor-pointer" onClick={() => navigate("/")} alt="logo" />
                <img src={profile} className="cursor-pointer" onClick={handleProfile} alt="profile" />
            </div>

            {/* 커뮤니티 */}
            <div>
                <span className="font-bold text-darkGray">커뮤니티 목록</span>
                <div className="flex items-center gap-2">
                    <CommunityButton type="skinny" onClick={() => handleCommunity("SKINNY")} />
                    <CommunityButton type="skinnyMuscle" onClick={() => handleCommunity("SKINNY_MUSCLE")} />
                    <CommunityButton type="standard" onClick={() => handleCommunity("STANDARD")} />
                    <CommunityButton type="weightLoss" onClick={() => handleCommunity("WEIGHT_LOSS")} />
                </div>
                <div className="flex items-center w-full gap-2">
                    <CommunityButton type="muscle" onClick={() => handleCommunity("MUSCLE")} />
                    <CommunityButton type="overWeight" onClick={() => handleCommunity("OVERWEIGHT")} />
                    <CommunityButton type="obesity" onClick={() => handleCommunity("OBESITY")} />
                    <CommunityButton type="muscularObesity" onClick={() => handleCommunity("MUSCULAR_OBESITY")} />
                </div>
            </div>

            {/* 추천 사용자 */}
            <div className="relative">
                <SectionHeader label="추천 사용자" />
                {data?.recommendUser?.length ? (
                    <Carousel>
                        <CarouselContent>
                            {data.recommendUser.map((user) => (
                                <CarouselItem key={user.userId}>
                                    <RecommendUser
                                        userName={user.userName}
                                        onClick={() => handleUserProfileClick(user.userId)}
                                        profileImg={user.profileImg}
                                        bodyType={BodyTypeEnum[user.bodyType]}
                                        reason={user.recommendReason}
                                        onChatClick={() => {
                                            window.open(user.telegramUrl);
                                        }}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                ) : (
                    <Box className="flex-col items-center justify-center gap-4 min-h-[200px]">
                        <span>목표치를 등록하여 맞춤형 사용자를 추천받아보세요!</span>
                        <Button
                            size="m"
                            type="primary"
                            label="목표치 등록하러가기"
                            onClick={() => navigate("/goal/register")}
                        />
                    </Box>
                )}
            </div>

            {/* 관심 사용자 */}
            <div>
                <SectionHeader label="관심 사용자" />
                <Box className="flex-row gap-2 overflow-x-auto min-h-[120px]">
                    {data?.interestUser?.length ? (
                        data.interestUser.map((user) => (
                            <InfoCard
                                key={user.userId}
                                imgUrl={user.profileImg}
                                label={user.userName}
                                desc={BodyTypeEnum[user.bodyType]}
                                onClick={() => handleUserProfileClick(user.userId)}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col">
                            <span className="text-sm">관심 사용자가 없어요.</span>
                            <span className="text-sm">관심 사용자를 등록해보세요!</span>
                        </div>
                    )}
                </Box>
            </div>

            {/* 구독 사용자 */}
            <div>
                <SectionHeader label="구독한 사용자" />
                <Box className="flex flex-col gap-2 min-h-[120px]">
                    {data?.subscribeUser?.length ? (
                        data.subscribeUser.map((user) => (
                            <SubscribeUser
                                key={user.userId}
                                name={user.userName}
                                imgUrl={user.profileImg}
                                prev={BodyTypeEnum[user.prevType]}
                                label={BodyTypeEnum[user.bodyType]}
                                onClick={() => handleUserProfileClick(user.userId)}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col">
                            <span className="text-sm">구독한 사용자가 없어요.</span>
                            <span className="text-sm">사용자를 구독하고 정보를 받아보세요!</span>
                        </div>
                    )}
                </Box>
            </div>

            {/* 거래 구독 관리 */}
            <div>
                <div className="flex justify-between items-center">
                    <SectionHeader type="tertiary" label="거래 구독 관리" onClick={handleTransactionClick} />
                    <Button size="xs" label="거래 추가" onClick={handleAddTransaction} />
                </div>
                <Box className="flex flex-col gap-2 min-h-[120px] mt-2 cursor-pointer" onClick={handleTransactionClick}>
                    {(transactions?.following ?? []).length ? (
                        transactions!.following.map((item) => (
                            <TransactionItem
                                key={item.transactionId}
                                userName={item.name}
                                profileImg={item.profileImg}
                                walletAddress={item.walletAddress}
                                amount={item.amount}
                                isTransfered={item.transfered}
                                contractDate={formatShortDate(item.contractDate)}
                                expiredDate={formatShortDate(item.expirationDate)}
                                isIncome={false}
                                label={item.transfered ? "송금 완료" : "송금 대기"}
                            />
                        ))
                    ) : (
                        <span className="text-sm">거래 내역이 없어요.</span>
                    )}
                </Box>
            </div>

            {/* 구독 게시물 */}
            <div className="flex flex-col gap-2">
                {data?.subscribePosts?.map((post) => (
                    <Post
                        key={post.postId}
                        name={post.userName}
                        time={post.createdDate}
                        label={BodyTypeEnum[post.bodyType]}
                        text={post.content}
                        postImgUrl={post.fileUrl}
                        postImgType={post.fileType}
                        onClick={() => handleUserProfileClick(post.userId)}
                    />
                ))}
            </div>
        </div>
    );
};
