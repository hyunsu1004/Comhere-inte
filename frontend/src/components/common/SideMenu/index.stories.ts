import type { Meta, StoryObj } from "@storybook/react";
import { SideMenu } from "@/components/common/SideMenu";

const meta = {
    title: "components/common/SideMenu",
    component: SideMenu,
} satisfies Meta<typeof SideMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
