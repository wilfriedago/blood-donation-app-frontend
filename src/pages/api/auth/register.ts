import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { sessionOptions } from '@/config';
import api from '@/lib/api';

export default withIronSessionApiRoute(async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      await api
        .registerEmail(req.body)
        .then(async () => {
          req.session.validateEmail = {
            email: req.body.email,
          };

          await req.session.save();

          res.status(201).json({ message: 'Account created' });
        })
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
