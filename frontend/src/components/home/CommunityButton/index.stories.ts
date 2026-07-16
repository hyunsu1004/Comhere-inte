import type { Meta, StoryObj } from "@storybook/react";
import { CommunityButton } from "@/components/home/CommunityButton";

const meta = {
    title: "components/Home/CommunityButton",
    component: CommunityButton,
} satisfies Meta<typeof CommunityButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Skinny: Story = {
    args: {
        type: "skinny",
    },
};
export const SkinnyMuscle: Story = {
    args: {
        type: "skinnyMuscle",
    },
};
export const Standard: Story = {
    args: {
        type: "standard",
    },
};
export const WeightLoss: Story = {
    args: {
        type: "weightLoss",
    },
};
export const Muscle: Story = {
    args: {
        type: "muscle",
    },
};
export const OverWeight: Story = {
    args: {
        type: "overWeight",
    },
};
export const Obesity: Story = {
    args: {
        type: "obesity",
    },
};
export const MuscularObesity: Story = {
    args: {
        type: "muscularObesity",
    },
};
