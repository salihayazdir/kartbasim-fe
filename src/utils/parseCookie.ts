import jwt from 'jsonwebtoken';

export function verifyJwt<T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null {
  let key = '';

  if (keyName === 'accessTokenPublicKey' && process.env.ACCESS_TOKEN_PUBLIC_KEY)
    key = process.env.ACCESS_TOKEN_PUBLIC_KEY;
  if (
    keyName === 'refreshTokenPublicKey' &&
    process.env.REFRESH_TOKEN_PUBLIC_KEY
  )
    key = process.env.REFRESH_TOKEN_PUBLIC_KEY;

  const publicKey = Buffer.from(key, 'base64').toString('ascii');

  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (err) {
    return null;
  }
}
