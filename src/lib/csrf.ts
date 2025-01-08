import { cookies } from 'next/headers'

import { generateToken } from './jwt'


const getCsrfToken = async () => {
  const token = await generateToken({}, '5m')
  
  // Set token in cookie
  cookies().set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 5 * 60,
    path: '/'
  })
  
  return token
}

const verifyCsrfToken = async (token: string) => {
  const cookieToken = cookies().get('csrf-token')?.value
  
  if (!cookieToken || !token || token !== cookieToken) {
    throw new Error('Invalid CSRF token')
  }
}

export {
  getCsrfToken,
  verifyCsrfToken
}
