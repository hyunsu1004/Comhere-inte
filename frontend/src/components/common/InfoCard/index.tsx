import userIcon from "@/assets/userIcon.svg";

interface InfoCardProps {
    type?: "primary" | "secondary";
    imgUrl?: string;
    label: string;
    desc?: string | number;
    onClick?: () => void;
}

const shortenName = (name: string) => {
    if (name.length <= 10) return name;
    return `${name.slice(0, 8)}..`;
};

export const InfoCard = ({ type = "primary", imgUrl = userIcon, label, desc, onClick }: InfoCardProps) => {
    return (
        <div
            className="flex flex-col gap-0.5 items-center shadow-md p-2 w-[100px] rounded-xl cursor-pointer p=1"
            onClick={onClick}
        >
            <img src={imgUrl} className="w-[44px] h-[44px] rounded-full object-contain"></img>
            <span className="text-base">{shortenName(label)}</span>
            {type === "primary" ? (
                <div className="flex flex-col items-center">
                    <span className="text-xs text-gray">{desc}</span>
                    <span className="text-xs text-gray">사용자</span>
                </div>
            ) : (
                <span className="text-xs text-gray">{desc}</span>
            )}
        </div>
    );
};
