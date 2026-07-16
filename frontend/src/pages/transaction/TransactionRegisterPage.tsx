import { Badge } from "@/components/common/Badge";
import { Box } from "@/components/common/Box";
import { Button } from "@/components/common/Button";
import { Header } from "@/components/common/Header";
import { Input } from "@/components/common/Input";
import { TextArea } from "@/components/common/TextArea";
import { Title } from "@/components/common/Title";
import { useCheckUser } from "@/hooks/transaction/useCheckUser";
import { useReigsterTransaction } from "@/hooks/transaction/useRegisterTransaction";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export const TransactionRegisterPage = () => {
    const { userNameRef, transactionPeriodRef, amountRef, infoRef, handleRegisterClick } = useReigsterTransaction();
    const { userData, isChecked, setIsChecked, handleCheckClick } = useCheckUser();
    const [dialogOpen, setDialogOpen] = useState(false);

    const isUserCheck = () => {
        if (
            !userData ||
            (userData.userName === null &&
                userData.community === null &&
                userData.profileUrl === null &&
                userData.walletAddress === null)
        ) {
            return false;
        }
        return true;
    };

    const bodyTypes: Record<string, string> = {
        SKINNY: "마른 체형",
        SKINNY_MUSCLE: "마른 근육형",
        STANDARD: "표준형",
        WEIGHT_LOSS: "감량형",
        MUSCLE: "근육형",
        OVERWEIGHT: "과체중형",
        OBESITY: "비만형",
        MUSCULAR_OBESITY: "근육 비만형",
        NONE: "-",
    };

    return (
        <div className="flex flex-col gap-6">
            <Header />
            <Title subTitle="채팅을 나눈 사용자와의 거래 내용을 작성해주세요" title="거래 내역 작성" />

            <div className="flex flex-col gap-4">
                <text className="font-bold">거래자 이름</text>
                <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                        <Input ref={userNameRef} placeholder="거래자 이름을 입력해주세요." />
                        <Button
                            type="secondary"
                            size="fit"
                            label="확인"
                            onClick={() => {
                                const userName = userNameRef.current?.value;
                                if (!userName || userName.trim() === "") {
                                    alert("사용자 이름을 입력해주세요.");
                                    return;
                                }
                                handleCheckClick(userName);
                                setDialogOpen(true);
                            }}
                        />
                    </div>

                    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                            <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md max-h-[90vh] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl focus:outline-none p-6 overflow-hidden flex flex-col gap-4">
                                {isUserCheck() ? (
                                    <Box className="flex-col justify-center items-center gap-6">
                                        <span className="flex text-point font-bold">
                                            이 사용자가 맞는지 확인해주세요!
                                        </span>
                                        <div className="flex flex-col items-center gap-1">
                                            <img
                                                src={userData!.profileUrl}
                                                className="rounded-full w-[80px] h-[80px]"
                                            />
                                            <span>{userData!.userName}</span>
                                            <Badge type="primary" label={bodyTypes[userData!.community ?? "NONE"]} />
                                        </div>
                                        <div className="w-full flex flex-col gap-1">
                                            <span className="font-bold">지갑 주소</span>
                                            <div className="rounded-xl border border-lightGray min-h-[80px] p-4 w-full break-words whitespace-pre-wrap overflow-visible">
                                                {userData!.walletAddress}
                                            </div>
                                        </div>
                                    </Box>
                                ) : (
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-point font-bold">텔레그램 아이디에 해당하는 유저가</span>
                                        <span className="text-point font-bold">
                                            존재하지 않습니다. 다시 확인해주세요!
                                        </span>
                                    </div>
                                )}
                                <Dialog.Close className="w-full flex justify-between items-center gap-2">
                                    {isUserCheck() && (
                                        <Button
                                            type="secondary"
                                            size="m"
                                            label="다시 입력하기"
                                            onClick={() => {
                                                setIsChecked(false);
                                            }}
                                        />
                                    )}
                                    <Button
                                        type={isUserCheck() ? "primary" : "secondary"}
                                        size={isUserCheck() ? "m" : "l"}
                                        label={isUserCheck() ? "확인 완료" : "다시 입력하기"}
                                        onClick={() => {
                                            if (isUserCheck()) {
                                                setIsChecked(true);
                                            }
                                        }}
                                    />
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>

                    {isChecked ? (
                        <span className="text-sm text-darkBlue">사용자 확인이 완료되었습니다.</span>
                    ) : (
                        <span className="text-sm text-red">
                            사용자 이름을 입력하고 해당 사용자가 맞는지 확인해주세요.
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <text className="font-bold">거래 주기</text>
                <Input ref={transactionPeriodRef} placeholder="일 단위로 입력해주세요." unit="일" />
            </div>

            <div className="flex flex-col gap-4">
                <text className="font-bold">거래 가격</text>
                <Input ref={amountRef} placeholder="거래하기로 한 가격을 입력해주세요." unit="ETH" />
            </div>

            <div className="flex flex-col gap-4">
                <text className="font-bold">거래 설명</text>
                <TextArea ref={infoRef} placeholder="거래 내용에 대한 추가 설명을 입력해주세요." />
            </div>

            <Button label="거래 등록하기" onClick={handleRegisterClick} />
        </div>
    );
};
