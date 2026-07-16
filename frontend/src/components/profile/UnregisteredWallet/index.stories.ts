import type { Meta, StoryObj } from "@storybook/react";
import { UnregisteredWallet } from "@/components/profile/UnregisteredWallet";

const meta = {
    title: "components/profile/UnregisteredWallet",
    component: UnregisteredWallet,
} satisfies Meta<typeof UnregisteredWallet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
