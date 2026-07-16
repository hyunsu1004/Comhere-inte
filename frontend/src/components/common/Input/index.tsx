import clsx from "clsx";
import { forwardRef } from "react";

interface InputProps {
    placeholder?: string;
    size?: "m" | "s";
    label?: string;
    unit?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder, size = "m", label, unit }, ref) => {
    return (
        <div className="flex flex-col gap-3">
            {label && (
                <label htmlFor="input-field" className="font-bold">
                    {label}
                </label>
            )}
            <div className="relative w-full">
                <input
                    id="input-field"
                    ref={ref}
                    placeholder={placeholder}
                    className={clsx(
                        "rounded-xl border border-lightGray h-[55px] p-4 pr-12 placeholder:text-sm placeholder:text-lightGray outline-none focus:outline-none",
                        size === "m" ? "w-full" : "w-2/5",
                    )}
                />
                {unit && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-darkGray">{unit}</span>
                )}
            </div>
        </div>
    );
});
