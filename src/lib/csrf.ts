import { NextRequest, NextResponse } from 'next/server'
import { generateToken } from './jwt'
import { cookies } from 'next/headers'

export const getCsrfToken = async () => {
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

export const verifyCsrfToken = async (token: string) => {
  const cookieToken = cookies().get('csrf-token')?.value
  
  if (!cookieToken || !token || token !== cookieToken) {
    throw new Error('Invalid CSRF token')
  }
}
