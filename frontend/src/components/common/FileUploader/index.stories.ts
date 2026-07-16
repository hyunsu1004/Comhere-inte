import type { Meta, StoryObj } from "@storybook/react";
import { FileUploader } from "@/components/common/FileUploader";

const meta = {
    title: "components/common/FileUploader",
    component: FileUploader,
} satisfies Meta<typeof FileUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
