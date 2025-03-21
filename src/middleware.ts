import { NextResponse, NextRequest } from 'next/server'

import { adminMiddleware, csrfMiddleware } from './lib/middleware'


const middleware = async (request: NextRequest) => {
  const path = request.nextUrl.pathname
  const method = request.method

  if (path.startsWith('/admin')) {
    return adminMiddleware(request)
  }

  if (method === 'POST' && !(path.startsWith('/api/auth'))) {
    return csrfMiddleware(request)
  }

  return NextResponse.next()
}

const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*'
  ]
}


export {
  middleware,
  config
} 
