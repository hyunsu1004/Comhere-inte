import { Button } from "@/components/common/Button";
import logo from "@/assets/logo.svg";
import { RiKakaoTalkFill } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const LoginPage = () => {
    const handleKakaoLogin = () => {
        window.location.href = kakaoAuthUrl;
    };

    return (
        <div className="flex flex-col items-center justify-center gap-10 h-screen">
            <img src={logo}></img>
            <div className="flex flex-col items-center">
                <text className="text-gray">로그인하여 다양한 사람과 함께</text>
                <text className="text-gray">운동 루틴을 공유해보세요!</text>
            </div>
            <Button type="login" size="l" label="카카오로 시작하기" onClick={handleKakaoLogin}>
                <RiKakaoTalkFill className="w-6 h-6" />
            </Button>
        </div>
    );
};
