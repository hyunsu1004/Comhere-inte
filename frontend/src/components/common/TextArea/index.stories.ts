import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "@/components/common/TextArea";

const meta = {
    title: "components/common/TextArea",
    component: TextArea,
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { placeholder: "문구 추가..." },
};
