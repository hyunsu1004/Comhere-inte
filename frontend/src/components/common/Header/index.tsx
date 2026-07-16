import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
        const pathname = location.pathname;

        if (pathname.startsWith("/community/")) {
            navigate("/");
        } else {
            navigate(-1);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="bg-[url('/src/assets/leftArrow.svg')] bg-no-repeat bg-center w-[10px] h-[20px]"
        ></button>
    );
};
