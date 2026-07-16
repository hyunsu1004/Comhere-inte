interface BadgeProps {
    type: "primary" | "secondary" | "sub" | "all";
    label: string;
}

const badgeStyles = {
    primary: {
        wrapper: "bg-lightGreen",
        text: "text-point",
    },
    secondary: {
        wrapper: "bg-lightRed",
        text: "text-red",
    },
    sub: {
        wrapper: "bg-lightPurple",
        text: "text-purple",
    },
    all: {
        wrapper: "bg-skyBlue",
        text: "text-blue",
    },
};

export const Badge = ({ type, label }: BadgeProps) => {
    const { wrapper, text } = badgeStyles[type];

    return (
        <div className={`inline-flex items-center justify-center rounded-xl py-1.5 px-2 w-fit ${wrapper}`}>
            <span className={`text-xs ${text}`}>{label}</span>
        </div>
    );
};
