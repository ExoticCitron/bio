import nodemailer from 'nodemailer'
import tls from 'tls'

export async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false,
      // Force specific TLS version
      minVersion: 'TLSv1.2',
    },
  })

  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

  try {
    await transporter.sendMail({
      from: '"ExoDevs Space" <noreply@exodevs.space>',
      to: email,
      subject: 'Verify your email address',
      html: `
        <h1>Welcome to ExoDevs Space!</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationLink}">${verificationLink}</a>
      `,
    })
    console.log('Verification email sent successfully')
  } catch (error) {
    console.error('Error sending verification email:', error)
    throw error
  }
}

