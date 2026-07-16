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
    | "OVERWEIGHT"
    | "OBESITY"
    | "MUSCULAR_OBESITY";

interface ViewGoalResponseBody {
    weight: number;
    muscle: number;
    fat: number;
    bmi: number;
    armGrade: BodyLevel | null;
    bodyGrade: BodyLevel | null;
    legGrade: BodyLevel | null;
    bodyType: BodyType | null;
}

const viewGoal = async () => {
    const response = await fetchInstance.get<ApiResponse<ViewGoalResponseBody>>("/api/goal");
    return response.data.value;
};

export const useViewGoal = () => {
    const query = useQuery({
        queryKey: ["goal"],
        queryFn: () => viewGoal(),
    });

    return { ...query };
};
