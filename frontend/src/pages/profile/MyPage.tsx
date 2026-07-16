import { Box } from "@/components/common/Box";
import { Header } from "@/components/common/Header";
import { InfoCard } from "@/components/common/InfoCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Profile } from "@/components/profile/Profile";
import { UnregisteredWallet } from "@/components/profile/UnregisteredWallet";
import weightIcon from "@/assets/weight.svg";
import muscleIcon from "@/assets/muscle.svg";
import fatIcon from "@/assets/fat.svg";
import { History } from "@/components/profile/History";
import { InbodyInfo } from "@/components/profile/InbodyInfo";
import { RegisteredWallet } from "@/components/profile/RegisteredWallet";
import { useNavigate } from "react-router-dom";
import { useViewMyProfile } from "@/hooks/profile/useViewMyProfile";
import { useRegisterWallet } from "@/hooks/profile/useRegisterWallet";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Post } from "@/components/common/Post";
import { Badge } from "@/components/common/Badge";
import { formatDate } from "@/app/utils/date";
import { useUpdateInfo } from "@/hooks/profile/useUpdateInfo";
import { useAuthStore } from "@/stores/useAuthStore";
import { UnregisteredPrivateKey } from "@/components/profile/UnregisteredPrivateKey";
import * as Dialog from "@radix-ui/react-dialog";

export const MyPage = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState<"post" | "info" | "inbody">("post");
    const { infoRef, handleUpdateClick } = useUpdateInfo();
    const { privateKey, setPrivateKey } = useAuthStore();
    const { data, isLoading, isError } = useViewMyProfile();
    const { walletRef, handleRegisterClick } = useRegisterWallet();

    if (isLoading) return <div>Loading...</div>;
    if (isError || !data) return <div>사용자 정보를 불러올 수 없습니다.</div>;

    const inbody = data.inbody ?? [];
    const posts = data.posts ?? [];
    const latestInbody = inbody.length > 0 ? inbody[inbody.length - 1] : null;

    // 변형된 inbodyHistory
    const inbodyHistory =
        inbody.length > 1
            ? inbody.slice(1).map((cur, idx) => ({
                  date: cur.createdAt,
                  prevInbody: inbody[idx],
                  curInbody: cur,
              }))
            : [];

    const handleGoal = () => navigate("/goal/register");

    const bodyTypes: Record<string, string> = {
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

    return (
        <div className="flex flex-col gap-6">
            <Header />

            <Profile
                ref={infoRef}
                userName={data.userName ?? "이름 없음"}
                profileImg={data.profileImg}
                label={latestInbody ? bodyTypes[latestInbody.userCase] : "-"}
                info={data.info}
                type="my"
                onInfoClick={handleUpdateClick}
                onInbodyClick={() => {
                    if (privateKey) {
                        navigate("/inbody/register");
                    } else {
                        alert("privateKey를 먼저 등록해주세요");
                    }
                }}
            />

            <div className="flex flex-row gap-4">
                <Button
                    onClick={() => setTab("post")}
                    type={tab === "post" ? "primary" : "secondary"}
                    size="m"
                    label="게시물 보기"
                />
                <Button
                    onClick={() => setTab("inbody")}
                    type={tab === "inbody" ? "primary" : "secondary"}
                    size="m"
                    label="인바디 추이"
                />
                <Button
                    onClick={() => setTab("info")}
                    type={tab === "info" ? "primary" : "secondary"}
                    size="m"
                    label="정보 등록"
                />
            </div>

            {tab === "post" && (
                <div className="flex flex-col gap-2">
                    {posts.length === 0 ? (
                        <div className="flex flex-col">
                            <span>아직 등록된 게시물이 없어요.</span>
                            <span>게시글은 각 커뮤니티에 들어가서 작성하실 수 있어요.</span>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <Post
                                key={post.postId}
                                userImgUrl={post.profileImg}
                                name={post.userName}
                                time={formatDate(post.date)}
                                label={bodyTypes[post.communityType] ?? "미지정"}
                                text={post.content}
                                postImgUrl={post.fileUrl}
                                postImgType={post.fileType}
                                postType={post.postType}
                            />
                        ))
                    )}
                </div>
            )}

            {tab === "inbody" && (
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 w-full">
                        <span className="font-bold text-darkGray">체형 변화</span>

                        {inbody.length === 0 && <div>사용자가 등록한 인바디 정보가 없습니다.</div>}

                        {inbody.length === 1 && (
                            <div>
                                <History
                                    date={inbody[0].createdAt}
                                    cur={bodyTypes[inbody[0].userCase]}
                                    // description={`${bodyTypes[inbody[0].userCase]}형이 되었어요`}
                                />
                            </div>
                        )}

                        {inbody.length > 1 &&
                            inbodyHistory.map((item, idx) => (
                                <Dialog.Root key={idx}>
                                    <Dialog.Trigger className="text-left">
                                        <History
                                            date={item.date}
                                            prev={bodyTypes[item.prevInbody.userCase]}
                                            cur={bodyTypes[item.curInbody.userCase]}
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
                                                                label={bodyTypes[item.prevInbody.userCase]}
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
                                                            label={bodyTypes[item.curInbody.userCase]}
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

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <span className="font-bold text-darkGray">인바디 수치</span>
                            <Badge type="primary" label={latestInbody ? bodyTypes[latestInbody.userCase] : "-"} />
                        </div>

                        <Box className="flex-col">
                            <InbodyInfo type="키" value={`${latestInbody?.height ?? "-"}cm`} />
                            <InbodyInfo type="체중" value={`${latestInbody?.weight ?? "-"}kg`} />
                            <InbodyInfo type="골격근량" value={`${latestInbody?.muscle ?? "-"}kg`} />
                            <InbodyInfo type="체지방량" value={`${latestInbody?.fat ?? "-"}%`} />
                            <InbodyInfo type="BMI" value={`${latestInbody?.bmi ?? "-"}`} />
                            <InbodyInfo type="팔 근육 수준" label={latestInbody?.armGrade} />
                            <InbodyInfo type="몸통 근육 수준" label={latestInbody?.bodyGrade} />
                            <InbodyInfo type="다리 근육 수준" label={latestInbody?.legGrade} />
                        </Box>
                    </div>
                </div>
            )}

            {tab === "info" && (
                <div className="flex flex-col gap-6">
                    {!data.walletRegistered ? (
                        <UnregisteredWallet inputRef={walletRef} onClick={handleRegisterClick} />
                    ) : (
                        <RegisteredWallet coin={data.eth ?? 0} />
                    )}

                    {!privateKey ? (
                        <UnregisteredPrivateKey onRegister={setPrivateKey} />
                    ) : (
                        <Box className="gap-1 flex-col">
                            <span className="text-darkGray font-bold">등록된 Private Key</span>
                            <span className="text-darkGray text-sm break-all">{privateKey}</span>
                        </Box>
                    )}

                    <Box className="flex-col gap-4">
                        <SectionHeader
                            type="secondary"
                            label="목표치"
                            goal={bodyTypes[data.goal?.bodyType ?? ""] ?? "미지정"}
                            onClick={handleGoal}
                        />
                        <div className="flex justify-evenly">
                            <InfoCard
                                type="secondary"
                                imgUrl={weightIcon}
                                label="체중"
                                desc={data.goal?.weight != null ? `${data.goal.weight} kg` : "-"}
                            />
                            <InfoCard
                                type="secondary"
                                imgUrl={muscleIcon}
                                label="골격근량"
                                desc={data.goal?.muscle != null ? `${data.goal.muscle} kg` : "-"}
                            />
                            <InfoCard
                                type="secondary"
                                imgUrl={fatIcon}
                                label="지방량"
                                desc={data.goal?.fat != null ? `${data.goal.fat} %` : "-"}
                            />
                        </div>
                    </Box>
                </div>
            )}
        </div>
    );
};
