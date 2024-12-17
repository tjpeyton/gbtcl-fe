import { cookies } from "next/headers"

import { generateToken } from "@/lib/jwt"
import { isAdmin } from "@/lib/mongodb"


// Generate a jwt 
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const admin = await isAdmin(body.address)
    const token = await generateToken({ 
      address: body.address, 
      isAdmin: admin
    })

    const response = new Response(
      JSON.stringify({ isAdmin: admin, token }),
      { headers: { 'Content-Type': 'application/json' } }
    )

    if (admin) {
      cookies().set({
        name: 'admin-token',
        value: token,
        path: '/',
        maxAge: 86400,
        httpOnly: true 
      })
    }

    return response
  } catch (err) {
    return new Response(null, { status: 500, statusText: 'Server Error' })
  }
}
