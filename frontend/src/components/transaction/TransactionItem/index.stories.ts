import type { Meta, StoryObj } from "@storybook/react";
import { TransactionItem } from "@/components/transaction/TransactionItem";

const meta = {
    title: "components/transaction/TransactionItem",
    component: TransactionItem,
} satisfies Meta<typeof TransactionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        userName: "조민주",
        walletAddress: "0x4635181351654131321843131",
        amount: 0.54861,
        transactionPeriod: 60,
        expiredDate: "2025.04.12",
        contractDate: "2025.04.12",
        label: "송금하기",
        isTransfered: false,
        isIncome: true,
    },
};
