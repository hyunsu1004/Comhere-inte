import { Box } from "@/components/common/Box";
import userIcon from "@/assets/userIcon.svg";
import { Chip } from "@/components/common/Chip";

interface TransactionItemProps {
    userName: string;
    profileImg?: string;
    walletAddress: string;
    amount: number;
    transactionPeriod?: number;
    expiredDate: string;
    contractDate: string;
    label: string;
    isTransfered: boolean;
    isIncome: boolean;
    onClick?: () => void;
}

export const TransactionItem = ({
    userName,
    profileImg = userIcon,
    walletAddress,
    amount,
    expiredDate,
    contractDate,
    label,
    isTransfered,
    isIncome,
    onClick,
}: TransactionItemProps) => {
    const shortenWalletAddress = (address: string) => {
        if (address.length <= 8) return address;
        return `${address.slice(0, 4)}..${address.slice(-3)}`;
    };
    return (
        <Box className="flex-col">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                    <img src={profileImg} className="w-[44px] h-[44px] rounded-full"></img>
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-1">
                            <span className="font-bold">{userName}</span>
                            <span className="font-bold">({shortenWalletAddress(walletAddress)})</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-row gap-1.5">
                                <span className="font-bold text-darkGray text-[8px]">체결일 </span>
                                <span className="text-darkGray text-[8px]">{contractDate}</span>
                            </div>
                            <span className="text-darkGray text-[8px]">l</span>
                            <div className="flex flex-row gap-1.5">
                                <span className="font-bold text-darkGray text-[8px]">만료일 </span>
                                <span className="text-darkGray text-[8px]">{expiredDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <Chip size="s" label={label} isSelected={!isTransfered} onClick={onClick}></Chip>
                    {isIncome === true && <span className="text-darkBlue font-bold text-sm">+{amount} ETH</span>}
                    {isIncome === false && <span className="text-red font-bold text-sm">-{amount} ETH</span>}
                </div>
            </div>
        </Box>
    );
};
