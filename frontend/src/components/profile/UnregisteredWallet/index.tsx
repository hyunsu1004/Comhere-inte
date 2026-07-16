import { Box } from "@/components/common/Box";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

interface UnregisteredWalletProps {
    inputRef?: React.RefObject<HTMLInputElement | null>;
    onClick?: () => void;
}

export const UnregisteredWallet = ({ onClick, inputRef }: UnregisteredWalletProps) => {
    return (
        <Drawer>
            <Box className="gap-4 flex-col">
                <span className="text-darkGray font-bold">나의 지갑</span>
                <div className="flex flex-col">
                    <span className="text-darkGray text-sm">아직 지갑이 등록되지 않았어요</span>
                    <span className="text-darkGray text-sm">지갑을 등록해보세요</span>
                </div>

                <DrawerTrigger className="text-left">
                    <Button type="primary" label="지갑 등록하러 가기" />
                </DrawerTrigger>
            </Box>

            <DrawerContent>
                <DrawerHeader className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <DrawerTitle>지갑 등록</DrawerTitle>
                        <DrawerDescription className="text-darkGray">등록할 지갑 주소를 입력하세요.</DrawerDescription>
                    </div>

                    <Input ref={inputRef} placeholder="자신의 지갑 주소를 입력하세요"></Input>
                </DrawerHeader>
                <DrawerFooter>
                    <div className="flex flex-row gap-2">
                        <Button type="primary" size="m" label="등록 완료" onClick={onClick} />
                        <DrawerClose asChild>
                            <Button type="secondary" size="m" label="취소" />
                        </DrawerClose>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
