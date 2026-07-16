import type { Meta, StoryObj } from "@storybook/react";
import { Post } from "@/components/common/Post";
import post1 from "@/assets/post/post1.svg";

const meta = {
    title: "components/common/Post",
    component: Post,
} satisfies Meta<typeof Post>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: "사용자",
        time: "3시간 전",
        label: "근육형",
        text: "일주일에 -3kg씩 건강하게 식단하고 싶으신가요? 그렇다면 저를 팔로우하고 맞춤형 식단을 받아보세요. 저는 단지 일반적인 샐러드만 추천해주는 사람이 아닙니다. 그러니 후회하지 않으실겁니다 만약",
        postImgUrl: post1,
    },
};
