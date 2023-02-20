import { IronSessionOptions } from 'iron-session';

const { COOKIE_SECRET_PASSWORD, NODE_ENV } = process.env;

export const AppConfig = {
  site_name: 'Starter',
  title: 'Nextjs Starter',
  description: 'Starter code for your Nextjs Boilerplate with Tailwind CSS',
  locale: 'en',
};

export const sessionOptions: IronSessionOptions = {
  password: COOKIE_SECRET_PASSWORD as string,
  cookieName: 'auth.session',
  ttl: 60 * 60 * 24 * 7, // 7 days
  cookieOptions: {
    secure: NODE_ENV === 'production',
    sameSite: 'lax',
  },
};
