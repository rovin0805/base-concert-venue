import { render, screen } from '@testing-library/react';
import Band from '@/pages/bands/[bandId]';
import { readFakeData } from '../__mocks__/fakeData';

test('band component displays correct band information', async () => {
  const { fakeBands } = await readFakeData();
  const bandData = fakeBands[0];

  render(<Band band={bandData} error={null} />);

  const heading = screen.getByRole('heading', { name: bandData.name });
  expect(heading).toBeInTheDocument();
});

test('band component displays error message', async () => {
  const { fakeBands } = await readFakeData();
  const bandData = fakeBands[0];

  render(<Band band={null} error={'test error'} />);

  const heading = screen.getByRole('heading', { name: /test error/i });
  expect(heading).toBeInTheDocument();
});
