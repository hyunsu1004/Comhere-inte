interface TitleProps {
    subTitle: string;
    title: string;
}

export const Title = ({ subTitle, title }: TitleProps) => {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-darkGray font-bold text-sm">{subTitle}</span>
            <span className="text-[22px] font-bold">{title}</span>
        </div>
    );
};
