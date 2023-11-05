import jwt from 'jsonwebtoken';
import { addDays, addMinutes, getUnixTime } from 'date-fns';
import { config } from '@configs/config';
import { parseTime } from '@helpers/timeHelper';

const getAcessTokenExpirationMinutes = () => {
  const accessTokenExpires = config.jwt.accessExpirationMinutes;
  if (!accessTokenExpires) {
    throw new Error('refreshExpirationDays not defined in config');
  }

  return addMinutes(new Date(), Number(accessTokenExpires));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRefreshTokenExpirationDays = () => {
  const refreshExpirationDays = config.jwt.refreshExpirationDays;
  if (!refreshExpirationDays) {
    throw new Error('refreshExpirationDays not defined in config');
  }
  return addDays(new Date(), Number(refreshExpirationDays));
};

export const generateToken = (id: string) => {
  const secret = config.jwt.secret;
  if (!secret) {
    throw new Error('JWT Secret not defined in config');
  }

  const acessTokenExpires: Date = getAcessTokenExpirationMinutes();

  const payload = {
    id: Number(id),
    iat: getUnixTime(new Date()),
    exp: getUnixTime(parseTime(acessTokenExpires)),
  };

  return {
    acess_token: jwt.sign(payload, secret),
    type: 'Bearer',
    expires: acessTokenExpires,
  };
};

export const verifyToken = async (token: string) => {
  const secret = config.jwt.secret;
  if (!secret) {
    throw new Error('JWT Secret not defined in config');
  }
  const payload: any = await jwt.verify(token, secret);

  return payload;
};
