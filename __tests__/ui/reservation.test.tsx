import { render, screen } from '@testing-library/react';
import { Reservation } from '@/components/reservations/Reservation';

test('reservation page shows correct number of available seats', async () => {
  render(<Reservation showId={0} submitPurchase={jest.fn()} />);

  const seatCountText = await screen.findByText(/10 seats left/i);
  expect(seatCountText).toBeInTheDocument();
});

test("reservation page shows 'sold out' message and NO purchase button if there are no seats available", async () => {
  render(<Reservation showId={1} submitPurchase={jest.fn()} />);

  const soldOutText = await screen.findByText(/sold out/i);
  expect(soldOutText).toBeInTheDocument();

  const purchaseButton = screen.queryByRole('button', {
    name: /purchase tickets/i,
  });
  expect(purchaseButton).not.toBeInTheDocument();
});
