import { filenames, writeJSONToFile } from '@/lib/db/db-utils';
import { readFakeData } from '../../fakeData';

export const resetDB = async () => {
  // failsafe against resetting production db
  const safeToReset = process.env.NODE_ENV === 'test';
  if (!safeToReset) {
    console.log('WARNING: db reset unavailable outside test environment');
    return;
  }

  const { fakeBands, fakeReservations, fakeShows, fakeUsers } =
    await readFakeData();

  // overwrite data in files
  await Promise.all([
    writeJSONToFile(filenames.bands, fakeBands),
    writeJSONToFile(filenames.shows, fakeShows),
    writeJSONToFile(filenames.reservations, fakeReservations),
    writeJSONToFile(filenames.users, fakeUsers),
  ]);
};
