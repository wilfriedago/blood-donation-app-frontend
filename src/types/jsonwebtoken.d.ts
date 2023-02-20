import * as JsonWebToken from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  interface JwtPayload {
    id: number;
    role: {
      id: number;
      name: string;
      __entity: string;
    };
    iat: number;
    exp: number;
  }
}
