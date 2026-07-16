import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/common/Input";

const meta = {
    title: "components/common/Input",
    component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: "지갑 주소를 입력해주세요",
        label: "지갑 주소",
    },
};
