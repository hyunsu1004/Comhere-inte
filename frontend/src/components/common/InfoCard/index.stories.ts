import type { Meta, StoryObj } from "@storybook/react";
import { InfoCard } from "@/components/common/InfoCard";
import userIcon from "@/assets/userIcon.svg";
import weightIcon from "@/assets/weightIcon.svg";

const meta = {
    title: "components/common/InfoCard",
    component: InfoCard,
} satisfies Meta<typeof InfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        imgUrl: userIcon,
        label: "사용자",
        desc: "표준형 사용자",
    },
};

export const Secondary: Story = {
    args: {
        imgUrl: weightIcon,
        label: "체중",
        desc: "62.8kg",
    },
};
