import skinny from "@/assets/community/skinny.svg";
import skinnyMuscle from "@/assets/community/skinnyMuscle.svg";
import standard from "@/assets/community/standard.svg";
import weightLoss from "@/assets/community/weightLoss.svg";
import muscle from "@/assets/community/muscle.svg";
import overWeight from "@/assets/community/overWeight.svg";
import obesity from "@/assets/community/obesity.svg";
import muscularObesity from "@/assets/community/muscularObesity.svg";

type CommunityType =
    | "skinny"
    | "skinnyMuscle"
    | "standard"
    | "weightLoss"
    | "muscle"
    | "overWeight"
    | "obesity"
    | "muscularObesity";

interface CommunityButtonProps {
    type: CommunityType;
    onClick?: () => void;
}

const typeMapping: Record<CommunityType, { imgUrl: string; name: string }> = {
    skinny: { imgUrl: skinny, name: "마른 체형" },
    skinnyMuscle: { imgUrl: skinnyMuscle, name: "마른 근육형" },
    standard: { imgUrl: standard, name: "표준형" },
    weightLoss: { imgUrl: weightLoss, name: "감량형" },
    muscle: { imgUrl: muscle, name: "근육형" },
    overWeight: { imgUrl: overWeight, name: "과체중형" },
    obesity: { imgUrl: obesity, name: "비만형" },
    muscularObesity: { imgUrl: muscularObesity, name: "근육형 비만" },
};

export const CommunityButton = ({ type, onClick }: CommunityButtonProps) => {
    const { imgUrl, name } = typeMapping[type];
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center border-0 rounded-xl shadow-md w-[90px] h-[90px] justify-center gap-0.5"
        >
            <img src={imgUrl} className="w-[50px] h-[60px] object-contain"></img>
            <span className="text-xs font-bold text-point">{name}</span>
        </button>
    );
};
