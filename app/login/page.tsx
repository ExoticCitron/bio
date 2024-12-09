'use client'

import Link from "next/link"
import { PenIcon as Gun } from 'lucide-react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-[400px] space-y-6 rounded-lg bg-zinc-900/50 p-6 text-white">
        <div className="flex flex-col items-center space-y-2">
          <Gun className="h-12 w-12 text-purple-500" />
          <h1 className="text-xl font-semibold">Log in to your account</h1>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-400">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="border-gray-800 bg-zinc-900 text-white placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-400">
                Password
              </Label>
              <Button
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

          <Button className="w-full bg-zinc-800 hover:bg-zinc-700">
            Login
          </Button>
        </div>

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

