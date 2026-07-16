import { Plus } from "lucide-react";
import { useEffect } from "react";

import clsx from "clsx";
import { useFileUpload } from "@/hooks/useFileUpload";

export interface FileUploadProps {
    className?: string;
    onChange?: (file: File | null) => void;
}

export const FileUploader = ({ className, onChange }: FileUploadProps) => {
    const { isUploaded, file, previewURL, fileType, fileInputRef, handleFileUpload, handleFileChange } =
        useFileUpload();

    useEffect(() => {
        onChange?.(file);
    }, [file, onChange]);

    return (
        <div
            className={clsx(
                "flex w-full h-[280px] border-2 rounded-xl hover:cursor-pointer justify-center items-center border-darkGray border-dashed",
                className,
            )}
            onClick={handleFileUpload}
        >
            {!isUploaded ? (
                <div className="flex flex-col justify-center">
                    <Plus size={30} className="mx-auto" />
                    <label>파일 업로드</label>
                </div>
            ) : fileType.startsWith("image/") ? (
                <img src={previewURL} alt="uploaded-file" className="w-full h-full object-cover rounded-[inherit]" />
            ) : fileType === "application/pdf" ? (
                <embed
                    src={previewURL}
                    type="application/pdf"
                    className="w-full h-full rounded-[inherit]"
                    style={{ width: "100%", height: "100%", minHeight: 280 }}
                />
            ) : (
                <p className="text-center text-gray-500">미리보기를 지원하지 않는 파일 형식입니다.</p>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
};
