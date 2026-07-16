import { Button } from "@/components/common/Button";
import { Header } from "@/components/common/Header";
import { Title } from "@/components/common/Title";
import copy from "@/assets/copy.svg";
import { useNavigate } from "react-router-dom";
import { useGetWallet } from "@/hooks/wallet/useGetWallet";
import warning from "@/assets/warning.svg";

export const WalletIssuePage = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetWallet();
    const handleRegisterInbody = () => {
        navigate("/inbody/register");
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
            </div>
        );
    }

    const handleCopyPrivateKey = async () => {
        console.log("복사 클릭");
        if (data?.privateKey) {
            try {
                await navigator.clipboard.writeText(data.privateKey);
                alert("개인 키가 복사되었습니다.");
            } catch (e) {
                console.log(e);
                alert("복사에 실패했습니다.");
            }
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <Header></Header>
            <Title subTitle="생성된 지갑 주소와 개인 키를 확인하세요" title="지갑 생성"></Title>

            <div className="flex flex-col gap-4">
                <span className="font-bold">지갑 주소</span>
                <div
                    id="input-field"
                    className="rounded-xl border border-lightGray min-h-[80px] p-4 break-words whitespace-pre-wrap overflow-visible"
                >
                    {data?.address}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-2">
                    <span className="font-bold">개인키</span>
                    <Button size="xxs" label="복사하기" onClick={handleCopyPrivateKey}>
                        <img src={copy} className="w-6 h-6" />
                    </Button>
                </div>
                <div
                    id="input-field"
                    className="rounded-xl border border-lightGray min-h-[80px] p-4 break-words whitespace-pre-wrap overflow-visible"
                >
                    {data?.privateKey}
                </div>

                <div className="flex flex-col gap-1">
                    <img src={warning} className="self-center w-[40px] h-[40px] mb-2"></img>
                    <span className="text-darkGray text-xs">
                        * 이 개인 키는 다시 확인할 수 없으니 꼭 안전한 곳에 저장해주세요.
                    </span>
                    <span className="text-darkGray text-xs">* 만약 개인 키를 분실했다면 새로 발급받아야 합니다.</span>
                </div>
            </div>

            <div>
                <Button label="인바디 등록하러가기" onClick={handleRegisterInbody}></Button>
                <span className="text-darkBlue text-xs">📌 인바디를 등록하고 추천 사용자들을 살펴보아요</span>
            </div>
        </div>
    );
};
