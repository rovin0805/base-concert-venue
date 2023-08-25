import type { NextApiRequest, NextApiResponse } from 'next';
import { createHandler } from '@/lib/api/handler';

const handler = createHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.APP_ENV !== 'test') {
    return res
      .status(401)
      .json({ message: 'This endpoint only available for test use' });
  }

  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid revalidation secret' });
  }

  try {
    // revalidate pages that have ISR data updates
    // note: next 13 => await res.revalidate('/path-to-revalidate')

    await res.unstable_revalidate('/shows');
    await res.unstable_revalidate('/bands');

    return res.status(200).end();
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
});

export default handler;
