export default interface ITokenService {
  generateToken: (
    uuid: string,
    expires: Date,
    type: string,
    secret: string,
  ) => string;
  verifyToken: (token: string, type: string) => any;
}
