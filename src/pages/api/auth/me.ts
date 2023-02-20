import { withIronSessionApiRoute } from 'iron-session/next';
import Cookies from 'js-cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import { sessionOptions } from '@/config';
import api from '@/lib/api';
import { User } from '@/types/entities';

export default withIronSessionApiRoute(async function meRoute(
  req: NextApiRequest,
  res: NextApiResponse<User | {} | undefined>
) {
  /**
   * @description Catches errors from the API and sends them to the client
   * @param response - The response from the API
   */
  async function catchErrors(response: any) {
    if (!response)
      res.status(500).json({
        errors: {
          message: 'Could not connect to the server',
        },
      });
    JSON.parse(JSON.stringify(response?.data));
    const { status, errors } = response.data;
    res.status(status).json({ errors });
    res.status(500).send(undefined);
  }

  if (req.session.data?.isLoggedIn) {
    switch (req.method) {
      case 'GET':
        api
          .getMe()
          .then(async ({ data }) => {
            req.session.user = data;
            await req.session.save();
            res.status(200).json(data as User);
          })
          .catch(({ response }) => catchErrors(response));
        break;

      case 'PATCH':
        api
          .updateMe(req.body)
          .then(async ({ data }) => {
            req.session.user = data;
            await req.session.save();
            res.status(200).json(data as User);
          })
          .catch(({ response }) => catchErrors(response));
        break;

      case 'DELETE':
        api
          .deleteMe()
          .then(async () => {
            Cookies.remove('auth.jwt');
            req.session.destroy();
            res.status(204).send(undefined);
          })
          .catch(({ response }) => catchErrors(response));
        break;

      default:
        res.status(405).json({ errors: { message: 'Method not allowed' } });
    }
  }

  res.status(401).json({ errors: { message: 'Unauthorized' } });
},
sessionOptions);
