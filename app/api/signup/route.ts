import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/email';
import { SignJWT } from 'jose';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    console.log('Starting signup process');
    try {
        const { email, password, username } = await req.json();
        console.log('Received signup request for:', email);

        // Check if email, password, and username are provided
        if (!email || !password || !username) {
            return NextResponse.json({ error: 'Email, password, and username are required' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if (existingUser) {
            console.log('User already exists:', email);
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Create user
        let user;
        try {
            console.log('Creating user in database');
            user = await prisma.user.create({
                data: {
                    email,
                    username,
                    password: hashedPassword,
                    verificationToken
                }
            });
            console.log('User created:', user.id);
        } catch (dbError) {
            console.error('Error creating user:', dbError);
            return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
        }

        // Send verification email
        try {
            console.log('Attempting to send verification email');
            await sendVerificationEmail(email, verificationToken);
            console.log('Verification email sent successfully');
        } catch (emailError) {
            console.error('Error sending verification email:', emailError);
            // Delete the user if email sending fails
            if (user) {
                await prisma.user.delete({ where: { id: user.id } });
            }
            return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
        }

        // Generate JWT token
        try {
            if (!user) {
                throw new Error('User object is null or undefined');
            }
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error('JWT_SECRET is not set');
            }

            const token = await new SignJWT({ userId: user.id })
                .setProtectedHeader({ alg: 'HS256' })
                .setExpirationTime('1h')
                .sign(new TextEncoder().encode(jwtSecret));

            console.log('JWT token generated successfully');
            return NextResponse.json({ message: 'User created successfully', token }, { status: 201 });
        } catch (jwtError) {
            console.error('JWT signing error:', jwtError);
            return NextResponse.json({ error: 'Failed to generate authentication token' }, { status: 500 });
        }
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
