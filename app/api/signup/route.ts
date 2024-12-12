import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { sendVerificationEmail } from '@/lib/email'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json()
    console.log('Received signup request for:', email)

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        verificationToken
      }
    })

    console.log('User created:', user.id)

    // Send verification email
    try {
      console.log('Attempting to send verification email')
      await sendVerificationEmail(email, verificationToken)
      console.log('Verification email sent successfully')
    } catch (emailError) {
      console.error('Error sending verification email:', emailError)
      // Delete the user if email sending fails
      await prisma.user.delete({ where: { id: user.id } })
      return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 })
    }

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

