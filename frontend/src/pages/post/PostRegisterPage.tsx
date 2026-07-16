import { Button } from "@/components/common/Button";
import { Chip } from "@/components/common/Chip";
import { FileUploader } from "@/components/common/FileUploader";
import { Header } from "@/components/common/Header";
import { TextArea } from "@/components/common/TextArea";
import { Title } from "@/components/common/Title";
import { useRegisterPost } from "@/hooks/post/useRegisterPost";
import { useSearchParams } from "react-router-dom";

type Community =
    | "SKINNY"
    | "SKINNY_MUSCLE"
    | "STANDARD"
    | "WEIGHT_LOSS"
    | "MUSCLE"
    | "OVERWEIGHT"
    | "OBESITY"
    | "MUSCULAR_OBESITY";

export const PostRegisterPage = () => {
    const [searchParams] = useSearchParams();
    const communityType = searchParams.get("communityType");

    const { isAll, setIsAll, contentRef, handleFileChange, handleRegisterClick, isPending } = useRegisterPost({
        community: communityType as Community,
    });

    return (
        <div className="flex flex-col gap-8">
            <Header />

            <Title title="게시물 작성" subTitle="자신을 나타낼 수 있거나 공유하고 싶은 정보를 적어보세요" />

            <div className="flex flex-col gap-4">
                <span className="font-bold text-darkGray">공개 대상</span>
                <div className="flex gap-2">
                    <Chip label="전체" isSelected={isAll} onClick={() => setIsAll(true)} />
                    <Chip label="구독자" isSelected={!isAll} onClick={() => setIsAll(false)} />
                </div>
            </div>

            <FileUploader onChange={handleFileChange} />

            <TextArea ref={contentRef} placeholder="문구 추가..." className="border-chat" />

            <Button label={isPending ? "등록 중입니다..." : "공유하기"} onClick={handleRegisterClick} />
            
            {isPending && (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid" />
                </div>
            )}
        </div>
    );
};
