import * as IronSession from 'iron-session';
import { User } from './entities';

declare module 'iron-session' {

  interface UserSession {
    id: number;
    role: {
      id: number;
      name: string;
      __entity: string;
    }
    isLoggedIn: boolean;
  }

  interface IronSessionData {
    data?: UserSession;
    user?: User;
    jwt?: string;
    validateEmail?: {
      email: string;
    }
  }
}
