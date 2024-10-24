import { generateToken } from "@/lib/jwt"

// Generate a jwt 
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const token = generateToken({ address: body.address })

    return new Response(JSON.stringify({ token }), {
        headers: { 'Content-Type': 'application/json' }
    })

  } catch (err) {
    return new Response(null, { status: 500, statusText: 'Server Error' })
  }
}
