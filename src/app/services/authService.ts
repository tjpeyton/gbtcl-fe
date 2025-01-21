const API_URL = '/api/auth'  

export const authenticateWallet = async (address: string) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ address }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error(`Failed to get admin token: ${res.status} ${res.statusText}`)
    }
    return await res.json()
  } catch (error: any) {
    throw new Error(`Network Error: Failed to get admin token: ${error.message}`) 
  }
}  
