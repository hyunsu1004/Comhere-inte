import { forwardRef, ReactNode } from "react";
import clsx from "clsx";
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    type?: "primary" | "secondary";
    placeholder?: string;
    children?: ReactNode;
    className?: string;
    readOnly?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ type = "primary", placeholder, children, className, readOnly = false, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                placeholder={placeholder}
                readOnly={readOnly}
                className={clsx(
                    "rounded-xl text-sm w-full p-4 outline-none overflow-y-scroll resize-none scrollbar-hide",
                    type === "primary" ? "border border-lightGray h-[120px]" : "border-none h-[70px]",
                    className,
                )}
                {...props}
            >
                {children}
            </textarea>
        );
    },
);
