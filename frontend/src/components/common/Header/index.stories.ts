import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@/components/common/Header";

const meta = {
    title: "components/common/Header",
    component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
