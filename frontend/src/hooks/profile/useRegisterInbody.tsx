import { fetchInstance } from "@/app/config/axios";
import { queryClient } from "@/app/config/query";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

// interface ApiResponse<T> {
//     code: number;
//     message: string;
//     value: T;
// }

interface RegisterInbodyRequestBody {
    file: File;
}

type Gender = "MALE" | "FEMALE";
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

interface RegisterInbodyResponseBody {
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

const registerInbody = async (data: RegisterInbodyRequestBody, privateKey: string) => {
    const formData = new FormData();
    formData.append("file", data.file);

    const response = await fetchInstance.post<RegisterInbodyResponseBody>("/api/gemini", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "X-PRIVATE-KEY": privateKey,
        },
    });

    return response.data;
};

export const useRegisterInbody = () => {
    const [file, setFile] = useState<File | null>(null);
    const [inbody, setInbody] = useState<RegisterInbodyResponseBody | null>(null);
    const handleFileChange = useCallback((f: File | null) => setFile(f), []);
    const navigate = useNavigate();
    // const privateKey = useAuthStore((state) => state.privateKey);
    const { privateKey } = useAuthStore();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            if (!file) throw new Error("파일이 선택되지 않았습니다.");
            if (privateKey === null) throw new Error("PRIVATE_KEY 없음");

            const payload: RegisterInbodyRequestBody = {
                file,
            };

            return registerInbody(payload, privateKey);
        },
        onSuccess: (data) => {
            // if (data.code !== 200) {
            //     setErrorMessage(data.message || "알 수 없는 오류가 발생했습니다.");
            //     return;
            // }

            queryClient.invalidateQueries({ queryKey: ["inbody"] });
            queryClient.invalidateQueries({ queryKey: ["myProfile"] });

            setInbody(data);
            setErrorMessage(null);
        },
        onError: (error) => {
            const err = error as AxiosError;
            const status = err.response?.status;
            const message = err.message;

            console.error("에러 상태코드:", status);
            console.error("에러 응답 메시지:", err.response?.data);

            if (message === "PRIVATE_KEY 없음") {
                alert("Private Key가 등록되지 않았습니다. 보관하고 있는 키를 등록해주세요.");
                navigate("/profile/my");
                return;
            }

            if (status === 500) {
                setErrorMessage("인바디 분석 서버 오류가 발생했습니다. 다시 시도해주세요.");
            } else {
                setErrorMessage("올바르지 않은 인바디 형식의 종이입니다.");
            }

            console.error("Error uploading Inbody:", err);
        },
    });

    const handleRegisterClick = useCallback(() => {
        mutate();
    }, [mutate]);

    return {
        handleFileChange,
        handleRegisterClick,
        inbody,
        isPending,
        errorMessage,
    };
};
