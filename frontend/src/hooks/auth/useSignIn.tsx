import { fetchInstance } from "@/app/config/axios";
import { useMutation } from "@tanstack/react-query";

interface KakaoLoginCodeResponse {
    code: number;
    message: string;
    value: {
        access_token: string;
        token_type: string;
        refresh_token: string;
        expires_in: number;
        refresh_token_expires_in: number;
        scope: string;
    };
}

interface KakaoLoginResponse {
    code: number;
    message: string;
    value: {
        accessToken: string;
        refreshToken: string;
        expir: number;
    };
}

const getAccessTokenByCode = async (code: string): Promise<KakaoLoginCodeResponse> => {
    const response = await fetchInstance.get<KakaoLoginCodeResponse>("/api/auth/oauth/kakao/callback", {
        params: { code },
    });
    return response.data;
};

const signInWithKakao = async (accessToken: string): Promise<KakaoLoginResponse> => {
    const response = await fetchInstance.post<KakaoLoginResponse>("/api/auth/kakao", { accessToken: accessToken });
    return response.data;
};

export const useSignIn = () => {
    return useMutation({
        mutationFn: async (code: string) => {
            const tokenResponse = await getAccessTokenByCode(code);
            if (tokenResponse.code !== 0) {
                throw new Error("카카오 토큰 발급 실패: " + tokenResponse.message);
            }

            console.log(tokenResponse.value.access_token);

            const loginResponse = await signInWithKakao(tokenResponse.value.access_token);
            if (loginResponse.code !== 0) {
                throw new Error("로그인 실패: " + loginResponse.message);
            }
            console.log(loginResponse);
            return loginResponse.value;
        },
    });
};
