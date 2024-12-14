'use client'

import Link from "next/link"
import { PenIcon as Gun } from 'lucide-react'
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        router.push('/dashboard')
      } else {
        setError(data.error || 'An error occurred during login')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred during login')
    }
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-[400px] space-y-6 rounded-lg bg-zinc-900/50 p-6 text-white">
        <div className="flex flex-col items-center space-y-2">
          <Gun className="h-12 w-12 text-purple-500" />
          <h1 className="text-xl font-semibold">Log in to your account</h1>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-400">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="border-gray-800 bg-zinc-900 text-white placeholder:text-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-400">
                Password
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-sm text-purple-400 hover:text-purple-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border-gray-800 bg-zinc-900 text-white placeholder:text-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-gray-400 hover:text-gray-300"
            >
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full bg-zinc-800 hover:bg-zinc-700" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-400">
          Are you new to exodevs.space?{" "}
          <Link href="/signup" className="text-purple-400 hover:text-purple-300">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}

