import rightArrow from "@/assets/rightArrow.svg";
import { Badge } from "@/components/common/Badge";

interface SectionHeaderProps {
    label: string;
    type?: "primary" | "secondary" | "tertiary";
    goal?: string;
    onClick?: () => void;
}

export const SectionHeader = ({ label, type = "primary", goal = "", onClick }: SectionHeaderProps) => {
    const containerClass =
        type === "tertiary" ? "flex items-center w-full gap-4" : "flex items-center w-full justify-between";

    return (
        <div className={containerClass}>
            <div className="flex flex-row gap-2">
                <span className="text-darkGray font-bold">{label}</span>
                {type === "secondary" && <Badge type="primary" label={goal} />}
            </div>
            <img src={rightArrow} className="cursor-pointer" onClick={onClick} />
        </div>
    );
};
