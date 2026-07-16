import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isLoggedIn, walletRegistered } = useAuthStore();

    if (!isLoggedIn) {
        // 비로그인 → 로그인 페이지로
        return <Navigate to="/start" replace />;
    } else if (!walletRegistered) {
        // 로그인했지만 지갑 미등록 → 지갑 등록 페이지로
        return <Navigate to="/wallet/register" replace />;
    }

    // 로그인 & 지갑 등록 완료 → 보호된 자식 라우트 렌더
    else return <Outlet />;
};
