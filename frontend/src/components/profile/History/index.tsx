import { formatDate } from "@/app/utils/date";

interface HistoryProps {
    date: string;
    prev?: string;
    cur: string;
}

export const History = ({ date, prev, cur }: HistoryProps) => {
    return (
        <div className="flex flex-col shadow-md rounded-xl p-5 gap-1.5">
            <span className="text-darkGray text-sm">{formatDate(date)}</span>
            <div>
                {prev ? (
                    <>
                        <span>{prev}에서 </span>
                        <span className="text-point">{cur}</span>
                    </>
                ) : (
                    <span className="text-point">{cur}</span>
                )}
                <span>이 되었어요.</span>
            </div>
        </div>
    );
};
