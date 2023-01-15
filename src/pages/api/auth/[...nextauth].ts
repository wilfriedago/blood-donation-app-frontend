import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import {
  GITHUB_ID,
  GITHUB_SECRET,
  GOOGLE_ID,
  GOOGLE_SECRET,
  NEXT_PUBLIC_NODE_ENV,
  SECRET,
} from '@/AppConfig';
import type { LoginUserDto } from '@/interfaces/dto';
import api from '@/services/api';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    // EmailProvider({
    //  server: EMAIL_SERVER,
    //  from: EMAIL_FROM,
    // }),
    // AppleProvider({
    //  clientId: APPLE_ID,
    //  clientSecret: {
    //    appleId: APPLE_ID,
    //    teamId: APPLE_TEAM_ID,
    //    privateKey: APPLE_PRIVATE_KEY,
    //    keyId: APPLE_KEY_ID,
    //  },
    // }),
    // Auth0Provider({
    //   clientId: AUTH0_ID,
    //   clientSecret: AUTH0_SECRET,
    //   // @ts-ignore
    //   domain: AUTH0_DOMAIN,
    // }),
    // FacebookProvider({
    //   clientId: FACEBOOK_ID,
    //   clientSecret: FACEBOOK_SECRET,
    // }),
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
      // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
      // @ts-ignore
      scope: 'read:user',
    }),
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
    // TwitterProvider({
    //   clientId: TWITTER_ID,
    //   clientSecret: TWITTER_SECRET,
    // }),
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {},
      authorize: async (credentials) => {
        const { email, password } = credentials as LoginUserDto;

        try {
          const { data } = await api.loginEmail({ email, password });

          if (data) return data.user;
        } catch (error: any) {
          if (error?.response)
            switch (error.response.status) {
              case 401:
              case 422:
                throw new Error('Email ou mot de passe incorrect !');
              case 500:
                throw new Error(
                  'Une erreur est survenue, Veuillez réessayer !'
                );
              default:
                throw new Error('Une erreur est survenue !');
            }
        }
        return null;
      },
    }),
  ],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  // database: DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/auth/signin', // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },
    async jwt({ token }) {
      return token;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: NEXT_PUBLIC_NODE_ENV === 'development',
};

export default NextAuth(authOptions);
