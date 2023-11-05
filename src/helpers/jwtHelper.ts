import jwt from 'jsonwebtoken';
import { addDays, getUnixTime } from 'date-fns';
import { config } from '@configs/config';
import { parseTime } from '@helpers/timeHelper';

export const generateToken = (id: string) => {
  const secret = config.jwt.secret;
  if (!secret) {
    throw new Error('JWT Secret not defined in config');
  }
  const refreshExpirationDays = config.jwt.refreshExpirationDays;
  if (!refreshExpirationDays) {
    throw new Error('refreshExpirationDays not defined in config');
  }

  const refreshTokenExpires: Date = addDays(
    new Date(),
    Number(refreshExpirationDays),
  );

  const payload = {
    id: Number(id),
    iat: getUnixTime(new Date()),
    exp: getUnixTime(parseTime(refreshTokenExpires)),
  };

  return jwt.sign(payload, secret);
};

export const verifyToken = async (token: string) => {
  const secret = config.jwt.secret;
  if (!secret) {
    throw new Error('JWT Secret not defined in config');
  }
  const payload: any = await jwt.verify(token, secret);

  return payload;
};
