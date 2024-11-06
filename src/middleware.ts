import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { adminMiddleware } from './lib/middleware/admin'
import { csrfMiddleware } from './lib/middleware/csrf'


export function middleware(request: NextRequest) {
  
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
