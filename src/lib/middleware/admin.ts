
import { NextRequest, NextResponse } from 'next/server'

import { verifyToken } from '../jwt'


const adminMiddleware = async (request: NextRequest) => {
  try {
    const response = NextResponse.next()
    response.headers.set('x-auth-status', 'authenticated')

    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/', request.url), { status: 302 })
    }

    const payload = await verifyToken(token)  

    if (!payload.isAdmin) {
      return NextResponse.redirect(new URL('/', request.url), { status: 403 })
    } else {
      return response
    }
        
  } catch (error) {
    console.error(error)    
    return NextResponse.redirect(new URL('/', request.url), { status: 403 })
  }
}

export {
  adminMiddleware
} 
