import { Secret, sign, SignOptions, verify } from 'jsonwebtoken';

const jwtConfig: SignOptions = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

const secret: Secret = process.env.JWT_SECRET || 'jwt_secret';

export const createToken = (email: string) => sign({ email }, secret, jwtConfig);

export const verifyToken = (token: string) => verify(token, secret, jwtConfig);
