import { rest } from 'msw';
import { readFakeData } from '../fakeData';
import { fakeUserReservations } from '../fakeData/userReservations';

const BASE_URL = 'http://localhost:3000/api';

const reservationHandler = rest.get(
  `${BASE_URL}/shows/:showId`,
  async (req, res, ctx) => {
    const { fakeShows } = await readFakeData();
    return res(
      ctx.json({
        show: fakeShows[0],
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
