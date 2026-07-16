import type { Meta, StoryObj } from "@storybook/react";
import { RecommendUser } from "@/components/home/RecommendUser";

const meta = {
    title: "components/home/RecommendUser",
    component: RecommendUser,
} satisfies Meta<typeof RecommendUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        userName: "cmj1002",
        bodyType: "근육형",
        reason: "팔근육 부분에 있어 많이 성장하였고, 이전에 사용자와 같은 체형이었어요",
    },
};
