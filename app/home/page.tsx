import Link from "next/link"
import { BarChart3, DiscIcon as Discord, Globe, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-purple-900/20 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-purple-400" />
              <span className="text-xl font-bold">exodevs.space</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                Features
              </Link>
              <Link href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                Partnership
              </Link>
              <Link href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                Pricing
              </Link>
              <Link href="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-purple-400">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Sign Up Free
                </Button>
              </Link>
            </div>
            
            <Button variant="ghost" className="md:hidden" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Everything you want,
          <br />
          right here.
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-400">
          exodevs.space is your go-to for modern, feature-rich biolinks and fast, secure profile hosting.
          Everything you need — right here.
        </p>
        
        <div className="mx-auto mb-20 flex max-w-md flex-col items-center space-y-4">
          <div className="relative w-full">
            <div className="relative flex items-center h-12 bg-white/5 rounded-md overflow-hidden">
              <span className="absolute left-5 text-white pointer-events-none select-none">exodevs.space/</span>
              <Input 
                type="text" 
                placeholder="username"
                className="h-full bg-transparent border-0 pl-[132px] focus:ring-0 focus:ring-offset-0 placeholder:text-gray-500"
              />
              <Button 
                className="absolute right-1.5 top-1.5 bg-purple-600 hover:bg-purple-700"
              >
                Claim Now
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative mx-auto max-w-6xl">
          <div className="rounded-xl bg-gradient-to-b from-purple-900/20 to-black p-1">
            <div className="rounded-lg bg-black/90 p-6">
              <div className="grid gap-6 md:grid-cols-[240px_1fr]">
                {/* Sidebar */}
                <div className="rounded-lg bg-white/5 p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 rounded-lg bg-purple-600/20 p-2 text-purple-400">
                      <BarChart3 className="h-5 w-5" />
                      <span>Dashboard</span>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg p-2 text-gray-400 hover:bg-white/5">
                      <Globe className="h-5 w-5" />
                      <span>Links</span>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg p-2 text-gray-400 hover:bg-white/5">
                      <Discord className="h-5 w-5" />
                      <span>Discord</span>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-white/5 p-4">
                      <div className="text-sm text-gray-400">Total Views</div>
                      <div className="text-2xl font-bold">24.5K</div>
                    </div>
                    <div className="rounded-lg bg-white/5 p-4">
                      <div className="text-sm text-gray-400">Click Rate</div>
                      <div className="text-2xl font-bold">12.3%</div>
                    </div>
                    <div className="rounded-lg bg-white/5 p-4">
                      <div className="text-sm text-gray-400">Active Links</div>
                      <div className="text-2xl font-bold">15</div>
                    </div>
                  </div>
                  
                  {/* Graph */}
                  <div className="h-[200px] rounded-lg bg-white/5 p-4">
                    <div className="h-full w-full rounded bg-gradient-to-r from-purple-600/20 to-purple-900/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Previews */}
          <div className="absolute -right-20 top-1/2 hidden -translate-y-1/2 transform md:block">
            <div className="relative h-[400px] w-[200px]">
              <div className="absolute right-0 top-0 h-full w-full rounded-xl bg-black p-2 shadow-xl">
                <div className="h-full w-full rounded-lg bg-white/5 p-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-purple-600" />
                    <div className="text-sm font-medium">@username</div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-16 top-20 h-[300px] w-[180px] rounded-xl bg-black p-2 shadow-xl">
                <div className="h-full w-full rounded-lg bg-white/5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="rounded-xl bg-purple-900/20 p-8">
          <h2 className="text-4xl font-bold mb-4">
            Join our Community
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join over 50,000+ people using exodevs.space and become<br />
            part of our large community
          </p>
          
          <div className="max-w-md">
            <div className="relative flex items-center h-12 bg-black/40 rounded-md overflow-hidden">
              <span className="absolute left-5 text-white pointer-events-none select-none">exodevs.space/</span>
              <Input 
                type="text" 
                placeholder="username"
                className="h-full bg-transparent border-0 pl-[132px] focus:ring-0 focus:ring-offset-0 placeholder:text-gray-500"
              />
              <Button 
                className="absolute right-1.5 top-1.5 bg-purple-600 hover:bg-purple-700"
              >
                Claim Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-900/20 bg-black/50 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold">exodevs.space</span>
              </div>
              <p className="text-gray-400 text-sm">
                Create feature-rich, customizable and modern bio pages with exodevs.space
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">General</h3>
              <div className="space-y-2">
                <Link href="/login" className="block text-gray-400 hover:text-purple-400 text-sm">Login</Link>
                <Link href="/signup" className="block text-gray-400 hover:text-purple-400 text-sm">Sign Up</Link>
                <Link href="#" className="block text-gray-400 hover:text-purple-400 text-sm">Pricing</Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-purple-400 text-sm">Partnership</Link>
                <Link href="#" className="block text-gray-400 hover:text-purple-400 text-sm">Redeem Code</Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-purple-400 text-sm">Terms of Service</Link>
                <Link href="#" className="block text-gray-400 hover:text-purple-400 text-sm">Privacy Policy</Link>
                <Link href="#" className="block text-gray-400 hover:text-purple-400 text-sm">Copyright Policy</Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-purple-900/20">
            <p className="text-gray-400 text-sm">
              Copyright © {new Date().getFullYear()} exodevs.space - All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

