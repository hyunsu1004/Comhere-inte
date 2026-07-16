import { Badge } from "@/components/common/Badge";
import { Box } from "@/components/common/Box";
import { TextArea } from "@/components/common/TextArea";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import userIcon from "@/assets/userIcon.svg";
import { Button } from "@/components/common/Button";
import { forwardRef } from "react";

interface ProfileProps {
    userName: string;
    profileImg?: string;
    label: string;
    info?: string;
    type?: "my" | "other";
    isLiked?: boolean;
    onLikeClick?: () => void;
    onChatClick?: () => void;
    onInfoClick?: () => void;
    onInbodyClick?: () => void;
}

export const Profile = forwardRef<HTMLTextAreaElement, ProfileProps>(
    (
        {
            userName,
            profileImg = userIcon,
            label,
            info,
            type = "other",
            isLiked,
            onLikeClick,
            onChatClick,
            onInfoClick,
            onInbodyClick,
        },
        ref,
    ) => {
        return (
            <div className="flex flex-col items-center relative min-h-[320px] gap-2">
                <img src={profileImg} className="w-[80px] h-[80px] rounded-full" />
                <Box className="items-center flex-col gap-2 absolute top-10 pt-10">
                    <div className="flex items-center gap-3">
                        <span className="text-point text-2xl font-bold">@{userName}</span>
                        {type === "other" &&
                            (isLiked === false ? (
                                <FaRegHeart
                                    className="w-[23px] h-[23px] text-gray cursor-pointer"
                                    onClick={onLikeClick}
                                />
                            ) : (
                                <FaHeart className="w-[23px] h-[23px] text-red cursor-pointer" onClick={onLikeClick} />
                            ))}
                    </div>
                    <Badge type="primary" label={label}></Badge>
                    <div className="w-full flex flex-col">
                        <span className="font-bold text-darkGray">자기 소개</span>
                        <TextArea
                            type="secondary"
                            placeholder="자기소개 글을 등록하세요."
                            className="text-darkGray"
                            readOnly={type === "other"}
                            ref={ref}
                            defaultValue={info ?? ""}
                        ></TextArea>
                    </div>
                    {type === "other" ? (
                        <Button size="m" type="primary" label="채팅하러하기" onClick={onChatClick}></Button>
                    ) : (
                        <div className="w-full flex gap-3 justify-center">
                            <Button size="s" type="primary" label="정보 수정하기" onClick={onInfoClick}></Button>
                            <Button size="s" type="primary" label="인바디 등록하기" onClick={onInbodyClick}></Button>
                        </div>
                    )}
                </Box>
            </div>
        );
    },
);
