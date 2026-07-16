import { Box } from "@/components/common/Box";
import ethereumIcon from "@/assets/ethereumIcon.svg";

interface RegisteredWalletProps {
    coin?: string;
}

export const RegisteredWallet = ({ coin }: RegisteredWalletProps) => {
    return (
        <Box className="gap-1 flex-col">
            <span className="text-darkGray font-bold">나의 지갑</span>
            <div className="flex items-center justify-between">
                <div className="flex gap-2.5">
                    <span className="text-3xl text-point font-bold">{coin}</span>
                    <span className="text-xl text-darkGray self-end font-semibold">ETH</span>
                </div>
                <img src={ethereumIcon} className="w-[32px] h-[32px]"></img>
            </div>
        </Box>
    );
};
