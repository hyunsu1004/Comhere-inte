import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/common/Button";

const meta = {
    title: "components/common/Button",
    component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        type: "primary",
        size: "l",
        label: "등록하기",
    },
};
