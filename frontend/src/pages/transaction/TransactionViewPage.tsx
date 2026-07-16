import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/common/Header";
import { Title } from "@/components/common/Title";
import { TransactionItem } from "@/components/transaction/TransactionItem";
import { formatShortDate } from "@/app/utils/date";
import { useViewTransaction } from "@/hooks/transaction/useViewTransaction";
import { useAuthStore } from "@/stores/useAuthStore";
import { useTransfer } from "@/hooks/transaction/useTransfer";

export const TransactionViewPage = () => {
    const navigate = useNavigate();
    const { privateKey } = useAuthStore();
    const hasKey = Boolean(privateKey);

    // 키 없으면 진입 시 리다이렉트
    useEffect(() => {
        if (!hasKey) {
            alert("privateKey를 등록해야 거래 내역 페이지를 볼 수 있습니다.");
            navigate("/profile/my");
        }
    }, [hasKey, navigate]);

    const { data, isLoading } = useViewTransaction();
    const { handleTransferClick } = useTransfer();

    const [isFollower, setIsFollower] = useState(true);

    const list = isFollower ? (data?.follower ?? []) : (data?.following ?? []);
    if (isLoading) return <p className="text-center">로딩 중입니다...</p>;

    console.log("follower", data?.follower);
    console.log("following", data?.following);
    console.log("list" + list);

    return (
        <div className="flex flex-col gap-8">
            <Header />
            <Title title="거래 내역" subTitle="거래를 등록한 사용자들과 송금 여부를 볼 수 있어요" />

            <div className="flex flex-row justify-evenly">
                <button
                    onClick={() => setIsFollower(true)}
                    className={`pb-1 border-b-2 ${
                        isFollower ? "border-black text-black" : "border-gray-300 text-gray-300"
                    }`}
                >
                    나를 구독한 사용자
                </button>
                <button
                    onClick={() => setIsFollower(false)}
                    className={`pb-1 border-b-2 ${
                        !isFollower ? "border-black text-black" : "border-gray-300 text-gray-300"
                    }`}
                >
                    내가 구독한 사용자
                </button>
            </div>

            <div className="flex flex-col gap-2">
                {list.length ? (
                    list.map((item) => (
                        <TransactionItem
                            key={item.transactionId}
                            userName={item.name}
                            profileImg={item.profileImg}
                            walletAddress={item.walletAddress}
                            amount={item.amount}
                            isTransfered={item.transfered}
                            contractDate={formatShortDate(item.contractDate)}
                            expiredDate={formatShortDate(item.expirationDate)}
                            isIncome={isFollower}
                            label={
                                isFollower
                                    ? item.transfered
                                        ? "입금 완료"
                                        : "입금 대기"
                                    : item.transfered
                                      ? "송금 완료"
                                      : "송금 대기"
                            }
                            onClick={
                                !isFollower && !item.transfered
                                    ? () =>
                                          handleTransferClick({
                                              transactionId: item.transactionId,
                                              amount: item.amount,
                                          })
                                    : undefined
                            }
                        />
                    ))
                ) : (
                    <span className="text-center text-gray-500">거래 내역이 없습니다.</span>
                )}
            </div>
        </div>
    );
};
