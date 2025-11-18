import type { Meta, StoryObj } from '@storybook/react-vite';

import Counter from '../Counter';

const meta = {
  title: 'Shared/Components/Counter',
  component: Counter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
