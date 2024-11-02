import { jwtVerify, SignJWT } from "jose"

const secretKey = process.env.JWT_SECRET

export async function generateToken(payload: any) {
  const secret = new TextEncoder().encode(secretKey)
  
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
}

// Verify token
export async function verifyToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
  
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    throw new Error('Invalid token')
  }
}