import { Badge } from "../Badge";
import userIcon from "@/assets/userIcon.svg";
import { useState } from "react";
import { SideMenu } from "../SideMenu";
import { formatDate } from "@/app/utils/date";
import { FileText } from "lucide-react";

interface PostProps {
    userImgUrl?: string;
    name: string;
    time: string;
    label: string;
    text: string;
    postImgUrl: string;
    postImgType?: string;
    postType?: "SUBSCRIBE" | "NORMAL";
    onClick?: () => void;
}

// Telegram Mini App WebApp 인터페이스 정의
interface TelegramWebApp {
    openDocument?: (url: string, options?: { cache?: boolean }) => void;
}

export const Post = ({
    userImgUrl = userIcon,
    name,
    time,
    label,
    text,
    postImgUrl,
    postImgType,
    postType,
    onClick,
}: PostProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_CHARS = 50;
    const isLong = text.length > MAX_CHARS;

    const isImage = postImgType?.startsWith("image/");
    const isPDF = postImgType === "application/pdf";

    const onNotInterestPostClick = () => {
        console.log("관심 없음 게시물 등록");
    };

    const openPdfExternally = () => {
        // any 대신 TelegramWebApp 타입으로 캐스트
        const tg = window.Telegram?.WebApp as TelegramWebApp | undefined;
        if (tg?.openDocument) {
            tg.openDocument(postImgUrl, { cache: true });
        } else {
            window.open(postImgUrl, "_blank");
        }
    };

    return (
        <div className="flex flex-col p-4 rounded-xl shadow-md gap-3">
            {/* 헤더 */}
            <div onClick={onClick} className="flex items-center justify-between w-full">
                <div className="flex gap-2">
                    <img src={userImgUrl} className="w-[44px] h-[44px] cursor-pointer rounded-full" alt="user avatar" />
                    <div className="flex flex-col gap-0 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <span>{name}</span>
                            <Badge type="primary" label={label} />
                            {postType === "NORMAL" && <Badge type="all" label="전체" />}
                            {postType === "SUBSCRIBE" && <Badge type="sub" label="구독자" />}
                        </div>
                        <span className="text-gray text-xs">{formatDate(time)}</span>
                    </div>
                </div>
                <SideMenu onNotInterestPostClick={onNotInterestPostClick} />
            </div>

            {/* 본문 */}
            <div className="break-words whitespace-pre-wrap text-sm">
                {!isLong && text}
                {isLong && (
                    <>
                        {isExpanded ? text : text.slice(0, MAX_CHARS) + "... "}
                        {!isExpanded && (
                            <button className="text-gray text-sm" onClick={() => setIsExpanded(true)}>
                                더보기
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* 이미지 렌더링 */}
            {isImage && (
                <div className="w-full h-[170px] overflow-y-auto">
                    <img src={postImgUrl} className="w-full object-contain" alt="post image" />
                </div>
            )}

            {/* PDF 렌더링: iframe + 클릭 시 외부 뷰어 */}
            {isPDF && (
                <>
                    <div className="w-full h-[170px] overflow-auto border rounded-md mb-1">
                        <iframe
                            src={postImgUrl}
                            className="w-full h-full"
                            style={{ border: "none" }}
                            sandbox="allow-scripts allow-same-origin"
                        />
                    </div>
                    <button
                        onClick={openPdfExternally}
                        className="flex items-center justify-center gap-1 text-sm text-blue-600"
                    >
                        <FileText className="w-4 h-4" />
                        전체 PDF 보기
                    </button>
                </>
            )}
        </div>
    );
};
