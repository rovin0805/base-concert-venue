import { rest } from 'msw';
import { readFakeData } from '../fakeData';

const reservationHandler = rest.get(
  'http://localhost:3000/api/shows/:showId',
  async (req, res, ctx) => {
    const { fakeShows } = await readFakeData();
    return res(
      ctx.json({
        show: fakeShows[0],
      })
    );
  }
);

export const handlers = [reservationHandler];
