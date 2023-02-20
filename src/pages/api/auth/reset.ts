import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { sessionOptions } from '@/config';
import api from '@/lib/api';

export default withIronSessionApiRoute(async function resetRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password, hash } = req.body;

  switch (req.method) {
    case 'POST':
      await api
        .resetPassword(password, hash)
        .then(async () => res.status(200).json({ message: 'Password reset' }))
        .catch(({ response }) => {
          if (!response)
            res.status(500).json({
              errors: {
                message: 'Could not connect to the server',
              },
            });

          JSON.parse(JSON.stringify(response.data));
          const { status, errors } = response.data;
          res.status(status).json({ errors });
        });
      break;

    default:
      res.status(405).json({ errors: { message: 'Method not allowed' } });
  }
},
sessionOptions);
