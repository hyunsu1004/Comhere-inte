import type { Meta, StoryObj } from "@storybook/react";
import { History } from "@/components/profile/History";
const meta = {
    title: "components/profile/History",
    component: History,
} satisfies Meta<typeof History>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        date: "2025년 3월 9일 17:37",
        prev: "마른 체형",
        cur: "근육형",
    },
};
