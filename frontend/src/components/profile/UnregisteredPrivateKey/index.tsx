import { Box } from "@/components/common/Box";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import * as Dialog from "@radix-ui/react-dialog";
import { useRef } from "react";

interface UnregisteredPrivateKeyProps {
    onRegister: (value: string) => void;
}

export const UnregisteredPrivateKey = ({ onRegister }: UnregisteredPrivateKeyProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleRegisterClick = () => {
        const value = inputRef.current?.value.trim();
        if (!value) return alert("Private Key를 입력해주세요.");
        onRegister(value);
    };

    return (
        <Dialog.Root>
            {/* 메인 설명 영역 */}
            <Box className="gap-4 flex-col">
                <span className="text-darkGray font-bold">Private Key</span>
                <div className="flex flex-col">
                    <span className="text-darkGray text-sm">Private Key가 등록되지 않았어요</span>
                    <span className="text-darkGray text-sm">등록하고 인바디 등록 기능을 이용해보세요</span>
                </div>

                <Dialog.Trigger asChild>
                    <Button type="primary" label="Private Key 등록" />
                </Dialog.Trigger>
            </Box>

            {/* 모달 영역 */}
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-6">
                    <Dialog.Title className="text-lg font-bold mb-2">Private Key 등록</Dialog.Title>
                    <Dialog.Description className="text-sm text-darkGray mb-4">
                        개인 키는 안전하게 보관하세요.
                    </Dialog.Description>

                    <Input ref={inputRef} placeholder="private key를 입력해주세요" />

                    <div className="flex justify-end gap-2 mt-6">
                        <Dialog.Close asChild>
                            <Button type="secondary" size="m" label="취소" />
                        </Dialog.Close>
                        <Dialog.Close asChild>
                            <Button type="primary" size="m" label="등록 완료" onClick={handleRegisterClick} />
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
