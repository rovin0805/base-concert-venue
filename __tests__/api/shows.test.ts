/* File: test/unit.test.ts */
import { testApiHandler } from 'next-test-api-route-handler';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import showsHandler from '@/pages/api/shows';
import showIdHandler from '@/pages/api/shows/[showId]';

test('GET /api/shows returns shows from db', async () => {
  await testApiHandler({
    handler: showsHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' });
      expect(res.status).toBe(200);
      const json = await res.json();
      const { fakeShows } = await readFakeData();
      expect(json).toEqual({ shows: fakeShows });
    },
  });
});

test('GET /api/shows/[showId] returns the data for the correct show ID ', async () => {
  await testApiHandler({
    handler: showIdHandler,
    paramsPatcher: (params) => (params.showId = 0),
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' });
      expect(res.status).toBe(200);
      const json = await res.json();
      const { fakeShows } = await readFakeData();
      expect(json).toEqual({ show: fakeShows[0] });
    },
  });
});

test('POST /api/shows returns 401 status for incorrect revalidation secret', async () => {
  await testApiHandler({
    handler: showsHandler,
    paramsPatcher: (params) =>
      (params.queryStringURLParams = { secret: 'FAKE SECRET' }),
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'POST' });
      expect(res.status).toEqual(401);
    },
  });
});
