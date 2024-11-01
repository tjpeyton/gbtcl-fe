import { generateToken } from "@/lib/jwt"
import { isAdmin } from "@/lib/mongodb/models/admin"

// Generate a jwt 
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const admin = await isAdmin(body.address)
    const token = generateToken({ 
      address: body.address, 
      isAdmin: admin
    })

    return new Response(JSON.stringify({ token, isAdmin: admin }), {
        headers: { 'Content-Type': 'application/json' }
    })

  } catch (err) {
    return new Response(null, { status: 500, statusText: 'Server Error' })
  }
}
