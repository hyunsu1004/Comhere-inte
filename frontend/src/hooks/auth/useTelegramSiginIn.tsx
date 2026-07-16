import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/useAuthStore";
import { fetchInstance } from "@/app/config/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const telegramSignIn = async (initData: string) => {
    const response = await fetchInstance.post("/api/auth/telegram", {
        initData,
    });
    return response.data;
};

export const useTelegramSignIn = () => {
    const { setAccessToken, setRefreshToken, login, walletRegistered, setWalletRegistered } = useAuthStore();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (initData: string) => telegramSignIn(initData),
        onSuccess: (data) => {
            alert("로그인 성공하였습니다!");
            login();
            console.log(data.value);
            setAccessToken(data.value.accessToken);
            setRefreshToken(data.value.refreshToken);
            setWalletRegistered(data.value.walletRegistered);

            // if (data.walletRegistered === true) {
            //     // 정확히 boolean일 때만
            //     window.location.href = "/";
            // } else {
            //     window.location.href = "/wallet/register";
            // }
        },
        onError: (err) => {
            console.error("❌ Telegram 인증 실패", err);
        },
    });

    useEffect(() => {
        if (!mutation.isSuccess) return;
        if (walletRegistered) navigate("/");
        else navigate("/wallet/register");
    }, [mutation.isSuccess, walletRegistered]);

    const handleTelegramSignInClick = () => {
        const initData = localStorage.getItem("telegram_init_data");
        // const initData =
        //     "query_id=AAFdiMZRAwAAAF2IxlGTPnn0&user=%7B%22id%22%3A7814416477%2C%22first_name%22%3A%22cho%22%2C%22last_name%22%3A%22minju%22%2C%22language_code%22%3A%22ko%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F8Q5F74vrItU4mYsv_sD5nYtj3NIjuXoQiWI6zx3i_HMN1NhV8bRqxfcfKGGpsGb-.svg%22%7D&auth_date=1748483010&signature=oYlRgH7jIYVspL0WiAYUzHJZa37O9a45Fy2AtslXSCYrU2Mrzt3H14cXeiXQw69HLsVIUG9ovp4lIQUsfadCDA&hash=cc222282288729cad385c880f302731738a482e13881a04e04d70e85cfc5d7ca";
        if (!initData) {
            alert("initData가 없습니다.");
            return;
        }
        mutation.mutate(initData);
    };

    return {
        handleTelegramSignInClick,
        ...mutation,
    };
};
