import type { Meta, StoryObj } from "@storybook/react";
import { InbodyInfo } from "@/components/profile/InbodyInfo";

const meta = {
    title: "components/profile/InbodyInfo",
    component: InbodyInfo,
} satisfies Meta<typeof InbodyInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        type: "체지방량",
        label: "STANDARD",
        value: "23%",
    },
};
