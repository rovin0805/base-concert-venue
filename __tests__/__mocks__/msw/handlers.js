import { rest } from 'msw';
import { readFakeData } from '../fakeData';
import { fakeUserReservations } from '../fakeData/userReservations';

const BASE_URL = 'http://localhost:3000/api';

const reservationHandler = rest.get(
  `${BASE_URL}/shows/:showId`,
  async (req, res, ctx) => {
    const { fakeShows } = await readFakeData();
    const { showId } = req.params;

    // index / showId = 0 has seats available in fake data
    // index / howId = 1 has no seats available in fake data
    return res(
      ctx.json({
        show: fakeShows[+showId],
      })
    );
  }
);

const userReservationsHandler = rest.get(
  `${BASE_URL}/users/:userId/reservations`,
  (req, res, ctx) => {
    return res(
      ctx.json({
        userReservations: fakeUserReservations,
      })
    );
  }
);

export const handlers = [reservationHandler, userReservationsHandler];
