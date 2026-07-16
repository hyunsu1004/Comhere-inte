import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/common/Badge";

const meta = {
    title: "components/common/Badge",
    component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        type: "primary",
        label: "근육형",
    },
};

export const Secondary: Story = {
    args: {
        type: "secondary",
        label: "위험",
    },
};
