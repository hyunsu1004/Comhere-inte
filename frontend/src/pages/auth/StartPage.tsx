import { Button } from "@/components/common/Button";
import logo from "@/assets/logo.svg";
import { FaTelegramPlane } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import { useTelegramSignIn } from "@/hooks/auth/useTelegramSiginIn";

export const StartPage = () => {
    // const navigate = useNavigate();
    const { handleTelegramSignInClick } = useTelegramSignIn();

    const handleClick = () => {
        console.log("버튼 클릭");
        handleTelegramSignInClick();
    };

    return (
        <div className="flex flex-col items-center justify-center gap-10 h-screen">
            <img src={logo}></img>
            <div className="flex flex-col items-center">
                <span className="text-gray">comhere에서 다양한 사람과 함께</span>
                <span className="text-gray">운동 루틴을 공유해보세요!</span>
            </div>
            <Button type="telegram" size="l" label="텔레그램으로 시작하기" onClick={handleClick}>
                <FaTelegramPlane className="w-6 h-6 text-white" />
            </Button>
        </div>
    );
};
