import { UserReservations } from '@/components/user/UserReservations';
import { render, screen } from '@testing-library/react';

test('renders correct length of user reservation list items', async () => {
  render(<UserReservations userId={1} />);

  const userReservations = await screen.findAllByRole('listitem');
  expect(userReservations).toHaveLength(2);
});

test("Displays reservations and 'purchase more' button when reservations exist", async () => {
  render(<UserReservations userId={1} />);

  const purchaseButton = await screen.findByRole('button', {
    name: /purchase more tickets/i,
  });
  expect(purchaseButton).toBeInTheDocument();
});

test("Displays no reservations and 'purchase' button when no reservations exist", async () => {
  render(<UserReservations userId={0} />);

  const purchaseButton = await screen.findByRole('button', {
    name: /purchase tickets/i,
  });
  expect(purchaseButton).toBeInTheDocument();

  const ticketsHeading = screen.queryByRole('heading', {
    name: /your tickets/i,
  });
  expect(ticketsHeading).not.toBeInTheDocument();
});
