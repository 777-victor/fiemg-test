import jwt from 'jsonwebtoken';
import { addDays, getUnixTime } from 'date-fns';
import ITokenService from '@services/contracts/ITokenService';
import { config } from '@configs/config';
import { parseTime } from '@helpers/timeHelper';

export default class TokenService implements ITokenService {
  generateToken = (id: string) => {
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
      id: id,
      iat: getUnixTime(new Date()),
      exp: getUnixTime(parseTime(refreshTokenExpires)),
    };

    return jwt.sign(payload, secret);
  };

  verifyToken = async (token: string) => {
    const secret = config.jwt.secret;
    if (!secret) {
      throw new Error('JWT Secret not defined in config');
    }
    const payload: any = await jwt.verify(
      token,
      secret,
      (err: any, decoded: any) => {
        if (err) {
          throw new Error('Token not found');
        } else {
          // if everything is good, save to request for use in other routes
          return decoded;
        }
      },
    );

    return payload;
  };
}
