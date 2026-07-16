import type { Meta, StoryObj } from "@storybook/react";
import { Title } from "@/components/common/Title";

const meta = {
    title: "components/common/Title",
    component: Title,
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        subTitle: "채팅을 나눈 사용자와의 거래 내용을 작성해주세요",
        title: "거래 내역 작성",
    },
};
