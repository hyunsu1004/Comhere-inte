import { useState, useRef, useEffect } from "react";
import { Chat } from "@/components/chat/Chat";
import { Header } from "@/components/common/Header";
import { FaCirclePlus } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type ChatItem = {
    type: "send" | "receive";
    date: string;
    text: string;
};

export const ChatPage = () => {
    const [chats, setChats] = useState<ChatItem[]>([
        { type: "receive", date: "25년 3월 9일 17:37", text: "무엇을 도와드릴까요" },
        { type: "send", date: "25년 3월 9일 17:37", text: "거래를 하고 싶어요" },
        { type: "send", date: "25년 3월 9일 17:37", text: "첫번째 피드 운동 루틴 공유 받고 싶습니다." },
        { type: "receive", date: "25년 3월 9일 17:37", text: "게시물 공유는 1주일당 1000원입니다. 거래 하실래요?" },
    ]);

    const [inputValue, setInputValue] = useState("");

    const bottomRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newChat: ChatItem = {
            type: "send",
            date: new Date().toLocaleString("ko-KR"),
            text: inputValue,
        };

        setChats([...chats, newChat]);
        setInputValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    const handleGoTransactionRegister = () => {
        navigate("/transaction/register");
    };

    return (
        <div className="flex flex-col gap-8 w-full max-w-[400px] mx-auto relative min-h-screen pb-[80px]">
            <Header />

            <div className="flex flex-row gap-2">
                <span className="font-bold text-[24px]">@Kangjae</span>
                <span className="font-bold text-l text-darkGray self-end">님과의 채팅</span>
            </div>

            <div className="flex flex-col gap-4 flex-grow">
                {chats.map((chat, index) => (
                    <Chat key={index} type={chat.type} date={chat.date}>
                        {chat.text}
                    </Chat>
                ))}
                <div ref={bottomRef}></div>
            </div>

            <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-full max-w-[400px] flex items-center justify-between p-4 gap-2 bg-white">
                <FaCirclePlus className="w-7 h-7 cursor-pointer" onClick={handleGoTransactionRegister} />

                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="rounded-xl flex-grow h-[50px] border-0 outline-none focus:outline-none p-4 placeholder:text-sm bg-back"
                    placeholder="메세지 보내기"
                />

                <IoSend className="w-6 h-6 cursor-pointer" onClick={handleSend} />
            </div>
        </div>
    );
};
