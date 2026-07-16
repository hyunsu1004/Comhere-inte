export const formatDate = (isoDateString: string): string => {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) return "유효하지 않은 날짜";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
};

export const formatShortDate = (isoDateString: string): string => {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) return "유효하지 않은 날짜";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
};
