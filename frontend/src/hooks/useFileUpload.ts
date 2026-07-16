import { useCallback, useRef, useState } from "react";

export const useFileUpload = () => {
    const [isUploaded, setIsUploaded] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState("");
    const [fileType, setFileType] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setIsUploaded(true);
        setFile(selectedFile);
        setPreviewURL(URL.createObjectURL(selectedFile));
        setFileType(selectedFile.type);
    }, []);

    return {
        isUploaded,
        file,
        previewURL,
        fileType,
        handleFileUpload,
        handleFileChange,
        fileInputRef,
    };
};
