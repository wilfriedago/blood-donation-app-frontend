import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { sessionOptions } from '@/config';

export default withIronSessionApiRoute(async function logoutRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      req.session.destroy();
      res.status(200).json({ message: 'Logged out' });
      break;

    default:
      res.status(405).json({ errors: { message: 'Method not allowed' } });
  }
},
sessionOptions);
