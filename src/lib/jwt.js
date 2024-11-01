import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET

export const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h'})
}

export const parseToken = (token) => {
  try {
    return jwt.verify(token, secretKey)
  } catch (error) {
    console.error('Error parsing token:', error)
    throw new Error('Invalid token')
  }
}
