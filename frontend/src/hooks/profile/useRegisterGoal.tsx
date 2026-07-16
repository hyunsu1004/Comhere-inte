import { fetchInstance } from "@/app/config/axios";
import { queryClient } from "@/app/config/query";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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

interface RegisterGoalRequestBody {
    weight: number;
    muscle: number;
    fat: number;
    bmi: number;
    armGrade: BodyLevel | null;
    bodyGrade: BodyLevel | null;
    legGrade: BodyLevel | null;
    bodyType: BodyType | null;
}

const registerGoal = async (data: RegisterGoalRequestBody): Promise<void> => {
    const response = await fetchInstance.put("/api/goal", data);
    return response.data;
};

export const useRegisterGoal = () => {
    const weightRef = useRef<HTMLInputElement | null>(null);
    const muscleRef = useRef<HTMLInputElement | null>(null);
    const fatRef = useRef<HTMLInputElement | null>(null);
    const bmiRef = useRef<HTMLInputElement | null>(null);

    const [armGrade, setArmGrade] = useState<BodyLevel | null>(null);
    const [bodyGrade, setBodyGrade] = useState<BodyLevel | null>(null);
    const [legGrade, setLegGrade] = useState<BodyLevel | null>(null);
    const [bodyType, setBodyType] = useState<BodyType | null>(null);

    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            const payload = {
                weight: Number(weightRef.current?.value),
                muscle: Number(muscleRef.current?.value),
                fat: Number(fatRef.current?.value),
                bmi: Number(bmiRef.current?.value),
                armGrade,
                bodyGrade,
                legGrade,
                bodyType,
            };

            console.log(payload);
            return registerGoal(payload);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goal"] });
            queryClient.invalidateQueries({ queryKey: ["myProfile"] });
            alert("성공적으로 저장되었습니다!");
            navigate("/");
        },
        onError: (error) => {
            console.error("Error response:", error.message);
            alert("목표 등록에 실패하였습니다.");
        },
    });

    const handleRegisterClick = useCallback(() => {
        mutate();
    }, [mutate]);

    return {
        weightRef,
        muscleRef,
        fatRef,
        bmiRef,
        armGrade,
        setArmGrade,
        bodyGrade,
        setBodyGrade,
        legGrade,
        setLegGrade,
        bodyType,
        setBodyType,
        handleRegisterClick,
        isPending,
    };
};
