import { Badge } from "@/components/common/Badge";
import userIcon from "@/assets/userIcon.svg";

interface SubscribeUserProps {
    imgUrl?: string;
    name: string;
    prev: string;
    label: string;
    onClick?: () => void;
}

export const SubscribeUser = ({ imgUrl = userIcon, name, prev, label, onClick }: SubscribeUserProps) => {
    return (
        <div className="flex gap-4 rounded-xl p-2 cursor-pointer" onClick={onClick}>
            <img src={imgUrl} className="w-[50px] h-[50px] rounded-full object-cover"></img>
            <div className="flex flex-col gap-1">
                <span className="text-sm">{name}</span>
                <span className="text-[11px] text-gray">
                    이 사용자는 {prev}에서 {label}으로 성장했어요
                </span>
                <Badge type="primary" label={label}></Badge>
            </div>
        </div>
    );
};
