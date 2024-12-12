import { jwtVerify, SignJWT } from "jose"

const secretKey = process.env.JWT_SECRET

export const generateToken = (payload: any, expiresIn?: string) => {
  const secret = new TextEncoder().encode(secretKey)
  
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn ?? '24h')
    .sign(secret)
}

export const verifyToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
  
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    throw new Error('Invalid token')
  }
}
