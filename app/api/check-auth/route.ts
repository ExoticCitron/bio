import { NextRequest, NextResponse } from 'next/server'

async function verifyJWT(token: string, secret: string): Promise<boolean> {
  try {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split('.')
    const header = JSON.parse(atob(encodedHeader))
    const payload = JSON.parse(atob(encodedPayload))

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return false
    }

    const dataToVerify = `${encodedHeader}.${encodedPayload}`
    const signature = atob(encodedSignature)

    const encoder = new TextEncoder()
    const secretBuffer = encoder.encode(secret)
    const dataBuffer = encoder.encode(dataToVerify)

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      secretBuffer,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )

    const isValid = await crypto.subtle.verify(
      'HMAC',
      cryptoKey,
      new Uint8Array(signature.split('').map(c => c.charCodeAt(0))),
      dataBuffer
    )

    return isValid
  } catch (error) {
    console.error('JWT verification error:', error)
    return false
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 })
  }

  try {
    const isValid = await verifyJWT(token, process.env.JWT_SECRET!)
    if (isValid) {
      return NextResponse.json({ authenticated: true })
    } else {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
  }
}
