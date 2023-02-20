import { withIronSessionApiRoute } from 'iron-session/next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { sessionOptions } from '@/config';
import api from '@/lib/api';

export default withIronSessionApiRoute(async function adminLoginRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      api
        .loginAdminEmail(req.body)
        .then(async ({ data }) => {
          const { token } = data;

          try {
            const { id, role, exp } = jwt.verify(
              token,
              process.env.AUTH_JWT_SECRET as string
            ) as JwtPayload; // There is more data in the payload, but we only need these three

            req.session.data = {
              id,
              role,
              isLoggedIn: true,
            };

            req.session.jwt = token;

            await req.session.save();

            res.status(200).json({ token, exp });
          } catch (err) {
            res
              .status(401)
              .json({ errors: { message: "Can't verify token authenticity" } });
          }
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
