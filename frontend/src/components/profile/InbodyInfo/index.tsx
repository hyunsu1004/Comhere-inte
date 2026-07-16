import point from "@/assets/point.svg";
import { Badge } from "@/components/common/Badge";

interface InbodyInfoProps {
    type: string;
    label?: "BELOW_STANDARD" | "STANDARD" | "ABOVE_STANDARD";
    value?: string;
}

export const InbodyInfo = ({ type, label, value }: InbodyInfoProps) => {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl">
            <div className="flex items-center gap-4 ">
                <img src={point}></img>
                <span className="text-darkGray">{type}</span>
                {label && (
                    <Badge
                        type={label === "BELOW_STANDARD" ? "secondary" : label === "STANDARD" ? "primary" : "primary"}
                        label={label === "BELOW_STANDARD" ? "표준 이하" : label === "STANDARD" ? "표준" : "표준 이상"}
                    ></Badge>
                )}
            </div>
            <span className="font-bold">{value}</span>
        </div>
    );
};
