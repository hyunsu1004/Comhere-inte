import clsx from "clsx";

interface ButtonProps {
    type?: "primary" | "secondary" | "login" | "gray" | "telegram";
    size?: "l" | "m" | "s" | "xs" | "xxs" | "fit";
    label: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

const typeStyles = {
    primary: "bg-point text-white",
    secondary: "bg-white",
    login: "bg-yellow",
    gray: "bg-chat",
    telegram: "bg-telegram text-white",
};

const sizeStyles = {
    l: "w-full h-[50px]",
    m: "w-2/3 h-[40px] text-sm",
    s: "w-2/5 h-[40px] text-sm",
    xs: "text-sm w-[100px] p-1.5",
    xxs: "text-xs w-[100px] p-0.5",
    fit: "text-sm h-[50px] w-[60px] p-1",
};

export const Button = ({ type = "primary", size = "l", label, onClick, children }: ButtonProps) => {
    const className = clsx(
        "shadow-md rounded-xl flex items-center justify-center gap-2",
        typeStyles[type],
        sizeStyles[size],
    );

    return (
        <button onClick={onClick} className={className}>
            {children}
            <span>{label}</span>
        </button>
    );
};
