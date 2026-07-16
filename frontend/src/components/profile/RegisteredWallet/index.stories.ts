import type { Meta, StoryObj } from "@storybook/react";
import { RegisteredWallet } from "@/components/profile/RegisteredWallet";

const meta = {
    title: "components/profile/RegisteredWallet",
    component: RegisteredWallet,
} satisfies Meta<typeof RegisteredWallet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        coin: "6.9353",
    },
};
