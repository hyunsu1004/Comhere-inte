import type { Meta, StoryObj } from "@storybook/react";
import { Chat } from "@/components/chat/Chat";

const meta = {
    title: "components/chat/Chat",
    component: Chat,
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        type: "receive",
        date: "25년 3월 9일 17:37",
        children: "무엇을 도와드릴까요",
    },
};
