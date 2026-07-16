import userIcon from "@/assets/userIcon.svg";
import { ReactNode } from "react";

interface ChatProps {
    imgUrl?: string;
    type?: "send" | "receive";
    date?: string;
    children: ReactNode;
}

const Receive = ({ imgUrl = userIcon, date, children }: ChatProps) => {
    return (
        <div className="flex gap-4">
            <img src={imgUrl} className="w-[40px] h-[40px] rounded-full" />
            <div className="py-2 px-3 rounded-xl bg-chat text-sm max-w-[220px]">{children}</div>
            <span className="text-lightGray text-[10px] self-end">{date}</span>
        </div>
    );
};

const Send = ({ imgUrl = userIcon, date, children }: ChatProps) => {
    return (
        <div className="flex gap-4 justify-end">
            <span className="text-lightGray text-[10px] self-end">{date}</span>
            <div className="py-2 px-3 rounded-xl bg-point text-white text-sm max-w-[220px]">{children}</div>
            <img src={imgUrl} className="w-[40px] h-[40px] rounded-full" />
        </div>
    );
};

export const Chat = (props: ChatProps) => {
    const { type = "receive" } = props;

    return type === "receive" ? <Receive {...props} /> : <Send {...props} />;
};
