import clsx from "clsx";

interface ChipProps {
    label: string;
    isSelected?: boolean;
    onClick?: () => void;
    size?: "s" | "m";
}

export const Chip = ({ label, isSelected, onClick, size = "m" }: ChipProps) => {
    return (
        <button
            className={clsx(
                "flex items-center justify-center border rounded-xl bg-transparent w-fit",
                isSelected ? "border-point text-point" : "border-gray text-gray",
                size === "m" ? "py-2.5 px-3.5 text-sm" : "py-2 px-2.5 text-xs", // size === "s"
            )}
            onClick={onClick}
        >
            {label}
        </button>
    );
};
