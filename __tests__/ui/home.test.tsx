import { render, screen } from '@testing-library/react';
import Home from '@/pages';

test('page has correct heading and image', () => {
  render(<Home />);

  const heading = screen.getByRole('heading', {
    name: /Popular Concert Venue/i,
  });

  expect(heading).toBeInTheDocument();

  const image = screen.getByRole('img', {
    name: /Concert goer with hands in the shape of a heart/i,
  });
  expect(image).toBeInTheDocument();
});
