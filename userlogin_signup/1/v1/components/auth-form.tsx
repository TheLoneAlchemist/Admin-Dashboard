'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa'

export function AuthFormComponent() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Promo Banner */}
      <div className="relative bg-blue-50 p-4 mb-8 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-800">FLAT ₹200 OFF</h2>
            <p className="text-gray-700 text-sm">+ Free Shipping On 1st Order</p>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Code:</span>
              <code className="px-2 py-1 border border-dashed border-blue-300 text-blue-600">SHOPNOW200</code>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt="Promotional character"
              width={100}
              height={100}
              className="w-24 h-24"
            />
            <div className="absolute -top-2 -right-2 bg-blue-600 text-white px-3 py-1 text-sm rounded-sm transform rotate-2">
              ₹200 OFF
            </div>
          </div>
        </div>
      </div>

      {/* Auth Form */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isSignUp ? 'signup' : 'login'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                {isSignUp ? 'Create an Account' : 'Welcome Back'}
              </h1>
              <p className="text-gray-600 mt-2">
                {isSignUp ? 'Sign up to get started' : 'Sign in to continue shopping'}
              </p>
            </div>

            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" required />
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isLoading ? "Please wait..." : (isSignUp ? "Sign Up" : "Sign In")}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="phone">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        +91
                      </span>
                      <Input
                        type="tel"
                        id="phone"
                        className="rounded-none rounded-r-lg"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isLoading ? "Please wait..." : "Send OTP"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1">
                <FaGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" className="flex-1">
                <FaFacebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              <Button variant="outline" className="flex-1">
                <FaTwitter className="mr-2 h-4 w-4" />
                X
              </Button>
            </div>

            <div className="text-center text-sm">
              <p className="text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                {' '}
                <button
                  onClick={toggleSignUp}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>

            {!isSignUp && (
              <div className="text-center">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot your password?
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}