import jwt from 'jsonwebtoken';

abstract class TokenHelper {
  public static createToken(object: object) {
    const secret = process.env.JWT_SECRET!;
    return jwt.sign(object, secret, { expiresIn: '10h' });
  }

  public static verifyToken(token: string) {
    try {
      const secret = process.env.JWT_SECRET!;
      return jwt.verify(token, secret);
    } catch (err) {
      return null;
    }
  }
}

export default TokenHelper;
