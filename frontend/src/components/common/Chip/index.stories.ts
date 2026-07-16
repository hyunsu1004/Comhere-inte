import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "@/components/common/Chip";

const meta = {
    title: "components/common/Chip",
    component: Chip,
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "감량형",
    },
};
