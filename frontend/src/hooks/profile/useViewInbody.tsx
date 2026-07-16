import { fetchInstance } from "@/app/config/axios";
import { useQuery } from "@tanstack/react-query";

interface ApiResponse<T> {
    code: number;
    message: string;
    value: T;
}

type BodyLevel = "BELOW_STANDARD" | "STANDARD" | "ABOVE_STANDARD";
type BodyType =
    | "SKINNY"
    | "SKINNY_MUSCLE"
    | "STANDARD"
    | "WEIGHT_LOSS"
    | "MUSCLE"
    | "WEIGHT"
    | "OBESITY"
    | "MUSCULAR_OBESITY";
type Gender = "MALE" | "FEMALE";

interface ViewInbodyResponseBody {
    id: number;
    createdAt: string;
    inbodySheet: boolean;
    gender: Gender;
    height: number;
    weight: number;
    muscle: number;
    fat: number;
    bmi: number;
    muscleMassType: BodyLevel;
    fatMassType: BodyLevel;
    bodyType: BodyType;
    armGrade: BodyLevel;
    bodyGrade: BodyLevel;
    legGrade: BodyLevel;
}

const viewInbody = async () => {
    const response = await fetchInstance.get<ApiResponse<ViewInbodyResponseBody>>("/api/gemini/inbody");
    return response.data.value;
};

export const useViewInbody = () => {
    const query = useQuery({
        queryKey: ["inbody"],
        queryFn: () => viewInbody(),
    });

    return { ...query };
};
