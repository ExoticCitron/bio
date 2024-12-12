import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'
import { Request } from "express"

export async function GET(req: Request) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    verify(token, process.env.JWT_SECRET!)
    return NextResponse.json({ message: 'Authenticated' })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}

