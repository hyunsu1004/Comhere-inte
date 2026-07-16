import clsx from "clsx";
import { ReactNode } from "react";

interface BoxProps {
    className?: string;
    children?: ReactNode;
    onClick?: () => void;
}

export const Box = ({ className, children, onClick }: BoxProps) => {
    return (
        <div onClick={onClick} className={clsx("rounded-xl shadow-md p-4 w-full flex", className)}>
            {children}
        </div>
    );
};
