import type { Meta, StoryObj } from "@storybook/react";
import { Selector } from "@/components/common/Selector";

const meta = {
    title: "components/common/Selector",
    component: Selector,
} satisfies Meta<typeof Selector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: "거래 주기를 입력하세요",
    },
};
