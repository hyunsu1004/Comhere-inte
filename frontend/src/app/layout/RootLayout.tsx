import { Outlet } from "react-router-dom";

export const RootLayout = () => {
    return (
        <main className="w-full max-w-[400px] mx-auto pt-[30px] pb-[50px] px-[12px]">
            <Outlet></Outlet>
        </main>
    );
};
