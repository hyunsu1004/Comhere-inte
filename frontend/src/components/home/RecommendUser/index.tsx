import { Badge } from "@/components/common/Badge";
import { Box } from "@/components/common/Box";
import userIcon from "@/assets/userIcon.svg";
import { Button } from "@/components/common/Button";

interface RecommendUserProps {
    userName: string;
    profileImg?: string;
    bodyType: string;
    reason?: string;
    onClick?: () => void;
    onChatClick?: () => void;
}

export const RecommendUser = ({
    userName,
    profileImg = userIcon,
    bodyType,
    reason,
    onClick,
    onChatClick,
}: RecommendUserProps) => {
    return (
        <Box className="flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2">
                <img src={profileImg} className="w-[60px] h-[60px] rounded-full" onClick={onClick} />
                <span className="text-point text-[20px] font-bold">@{userName}</span>
                <Badge type="primary" label={bodyType}></Badge>
            </div>
            <div className="w-full flex flex-col gap-2">
                <span className="font-bold text-darkGray">추천 이유 ✨</span>
                <div className="min-h-[70px]">{reason}</div>
            </div>

            <Button size="m" type="primary" label="채팅하러하기" onClick={onChatClick}></Button>
        </Box>
    );
};
