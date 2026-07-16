import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSignIn } from "@/hooks/auth/useSignIn";
import { useAuthStore } from "@/stores/useAuthStore";

export const RedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { mutateAsync: signIn } = useSignIn();
    const { setAccessToken, setRefreshToken } = useAuthStore();
    const isCalledRef = useRef(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");
        if (!code || isCalledRef.current) return;

        isCalledRef.current = true;

        (async () => {
            try {
                const res = await signIn(code);
                console.log("로그인 성공, 토큰:", res.accessToken);
                setAccessToken(res.accessToken);
                setRefreshToken(res.refreshToken);
                navigate("/");
            } catch (err) {
                if (err instanceof Error) {
                    alert("로그인 실패: " + err.message);
                } else {
                    alert("알 수 없는 에러 발생");
                }
            }
        })();
    }, []);

    return <div>로그인 중...</div>;
};
