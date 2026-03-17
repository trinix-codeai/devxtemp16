import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SampleCard = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Island Snorkeling Escape</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted">Interactive card with premium hover and soft depth.</p>
    </CardContent>
  </Card>
);

const meta = {
  title: "UI/Card",
  component: SampleCard,
  tags: ["autodocs"],
} satisfies Meta<typeof SampleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
