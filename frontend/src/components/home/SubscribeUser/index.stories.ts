import type { Meta, StoryObj } from "@storybook/react";
import { SubscribeUser } from "@/components/home/SubscribeUser";

const meta = {
    title: "components/Home/SubscribeUser",
    component: SubscribeUser,
} satisfies Meta<typeof SubscribeUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: "사용자",
        prev: "마른형",
        label: "근육형",
    },
};
