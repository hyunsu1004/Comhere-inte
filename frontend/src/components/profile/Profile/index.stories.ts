import type { Meta, StoryObj } from "@storybook/react";
import { Profile } from "@/components/profile/Profile";

const meta = {
    title: "components/profile/Profile",
    component: Profile,
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        userName: "user1",
        label: "근육형",
        info: "저는 평생 20년 동안 멸치였다가 단 2년 만에 몸짱이 되었습니다. 저같은 체질의 사람에게 도움을 주고 싶습니다!",
        type: "other",
        isLiked: true,
    },
};
