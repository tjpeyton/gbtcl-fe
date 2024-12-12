import { NextResponse, NextRequest } from 'next/server'

import { adminMiddleware } from './lib/middleware/admin'
import { csrfMiddleware } from './lib/middleware/csrf'


export const middleware = async (request: NextRequest) => {
  
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

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*'
  ]
}
