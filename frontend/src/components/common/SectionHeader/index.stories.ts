import type { Meta, StoryObj } from "@storybook/react";
import { SectionHeader } from "@/components/common/SectionHeader";

const meta = {
    title: "components/common/SectionHeader",
    component: SectionHeader,
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { label: "추천 사용자" },
};
