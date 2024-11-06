import { NextRequest, NextResponse } from "next/server"

import { verifyCsrfToken } from "../csrf"


export const csrfMiddleware = async (request: NextRequest) => {
    console.log('csrfMiddleware')
    try {
        const csrfToken = request.headers.get('X-CSRF-Token')
        if (!csrfToken) {
            return NextResponse.json({ error: 'Missing CSRF token' }, { status: 401 })
        }

        await verifyCsrfToken(csrfToken)
    } catch (error) {
        return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 401 })
    }
}       
