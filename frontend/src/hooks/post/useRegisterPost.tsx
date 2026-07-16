import { useState, useRef, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchInstance } from "@/app/config/axios";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/app/config/query";

type PostType = "NORMAL" | "SUBSCRIBE";
type Community =
    | "SKINNY"
    | "SKINNY_MUSCLE"
    | "STANDARD"
    | "WEIGHT_LOSS"
    | "MUSCLE"
    | "OVERWEIGHT"
    | "OBESITY"
    | "MUSCULAR_OBESITY";

interface RegisterPostRequestBody {
    data: {
        communityType: string;
        postType: PostType;
        content: string;
    };
    image: File;
}

interface RegisterPostProps {
    community: Community;
}

const registerPost = async (data: RegisterPostRequestBody): Promise<void> => {
    const formData = new FormData();

    formData.append("data", new Blob([JSON.stringify(data.data)], { type: "application/json" }));

    formData.append("image", data.image);

    const response = await fetchInstance.post("/api/posts", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const useRegisterPost = ({ community }: RegisterPostProps) => {
    const [isAll, setIsAll] = useState(true);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleFileChange = useCallback((f: File | null) => setFile(f), []);

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            if (!file) throw new Error("파일이 선택되지 않았습니다.");

            const payload: RegisterPostRequestBody = {
                data: {
                    communityType: community,
                    postType: isAll ? "NORMAL" : "SUBSCRIBE",
                    content: contentRef.current?.value || "",
                },
                image: file,
            };

            return registerPost(payload);
        },
        onSuccess: () => {
            setIsAll(true);
            if (contentRef.current) contentRef.current.value = "";
            setFile(null);
            queryClient.invalidateQueries({ queryKey: ["posts", community] });
            alert("게시물을 성공적으로 등록하였습니다!");

            navigate(-1);
        },
        onError: (err) => {
            console.error("등록 실패:", err);
            alert("게시물 등록에 실패하였습니다.");
        },
    });
    const handleRegisterClick = useCallback(() => {
        mutate();
    }, [mutate]);

    return {
        isAll,
        setIsAll,
        contentRef,
        handleFileChange,
        handleRegisterClick,
        isPending,
    };
};
