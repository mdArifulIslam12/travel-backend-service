import Jwt from 'jsonwebtoken';
export const createToken = (
  jwtPayload: { email: string; name: string },
  secret: string,
  expiresIn: string,
) => {
  return Jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
