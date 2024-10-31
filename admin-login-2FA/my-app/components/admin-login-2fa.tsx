'use client'

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, AlertCircle, Lock } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  countryCode: z.string(),
  phoneNumber: z.string().regex(/^[0-9]{1,14}$/, { message: "Invalid phone number" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  rememberMe: z.boolean().optional(),
  emailOtp: z.string().length(6, { message: "OTP must be 6 digits" }).optional(),
  phoneOtp: z.string().length(6, { message: "OTP must be 6 digits" }).optional(),
  authenticatorCode: z.string().length(6, { message: "Authenticator code must be 6 digits" })
})

type LoginData = z.infer<typeof loginSchema>

const TEST_EMAIL = 'admin@test.com'
const TEST_PHONE = '1234567890'

const countryCodes = [
  { value: '+1', label: 'US (+1)' },
  { value: '+44', label: 'UK (+44)' },
  { value: '+91', label: 'IN (+91)' },
]

const checkExistsInDatabase = async (type: 'email' | 'phone', value: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return type === 'email' ? value === TEST_EMAIL : value === TEST_PHONE
}

export function AdminLogin_2fa() {
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [otpSent, setOtpSent] = useState<{ email: boolean; phone: boolean }>({ email: false, phone: false })
  const [timer, setTimer] = useState<{ email: number; phone: number }>({ email: 0, phone: 0 })

  const { register, handleSubmit, formState: { errors }, watch, setValue, control } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      countryCode: '+1',
      phoneNumber: '',
      emailOtp: '',
      phoneOtp: '',
      authenticatorCode: ''
    }
  })

  const watchEmail = watch('email')
  const watchPhoneNumber = watch('phoneNumber')
  const watchCountryCode = watch('countryCode')

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => ({
        email: Math.max(0, prev.email - 1),
        phone: Math.max(0, prev.phone - 1)
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true)
    setLoginError(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Login attempt:', data)
      alert('Login attempt successful!')
    } catch (error) {
      setLoginError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const sendOTP = async (method: 'email' | 'phone') => {
    setIsLoading(true)
    try {
      const value = method === 'email' ? watchEmail : watchCountryCode + watchPhoneNumber
      await checkExistsInDatabase(method, value)
      setOtpSent(prev => ({ ...prev, [method]: !prev[method] })) // Toggle OTP sent state
      setValue(`${method}Otp`, '')
      if (!otpSent[method]) {
        setTimer(prev => ({ ...prev, [method]: 60 }))
      } else {
        setTimer(prev => ({ ...prev, [method]: 0 }))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-green-500 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md overflow-hidden">
          <div className="relative h-20 bg-gradient-to-r from-blue-600 to-blue-800">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className="text-white h-10 w-10" />
            </div>
          </div>
          <CardHeader className="space-y-1 pt-6">
            <CardTitle className="text-3xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">Enter your credentials and verify with 2FA</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-grow">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="admin@example.com" 
                      {...register('email')}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => sendOTP('email')}
                    disabled={!watchEmail || isLoading || timer.email > 0}
                    className="mt-6"
                  >
                    {otpSent.email 
                      ? (timer.email > 0 ? `Resend in ${timer.email}s` : 'Reset OTP') 
                      : 'Send OTP'}
                  </Button>
                </div>
                {otpSent.email && (
                  <div className="mt-2">
                    <Label htmlFor="emailOtp" className="text-sm font-medium">Email OTP</Label>
                    <div className="flex space-x-2">
                      {[...Array(6)].map((_, index) => (
                        <Input
                          key={`emailOtp-${index}`}
                          type="text"
                          maxLength={1}
                          className="w-10 text-center"
                          {...register(`emailOtp.${index}` as any)}
                          onChange={(e) => {
                            const value = e.target.value
                            if (value && index < 5) {
                              document.getElementById(`emailOtp-${index + 1}`)?.focus()
                            }
                          }}
                          id={`emailOtp-${index}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-grow flex space-x-2">
                    <div className="w-1/3">
                      <Label htmlFor="countryCode" className="text-sm font-medium">Code</Label>
                      <Controller
                        name="countryCode"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Code" />
                            </SelectTrigger>
                            <SelectContent>
                              {countryCodes.map((code) => (
                                <SelectItem key={code.value} value={code.value}>
                                  {code.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div className="flex-grow">
                      <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</Label>
                      <Input 
                        id="phoneNumber" 
                        type="tel" 
                        placeholder="2345678901" 
                        {...register('phoneNumber')}
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => sendOTP('phone')}
                    disabled={!watchPhoneNumber || isLoading || timer.phone > 0}
                    className="mt-6"
                  >
                    {otpSent.phone 
                      ? (timer.phone > 0 ? `Resend in ${timer.phone}s` : 'Reset OTP') 
                      : 'Send OTP'}
                  </Button>
                </div>
                {otpSent.phone && (
                  <div className="mt-2">
                    <Label htmlFor="phoneOtp" className="text-sm font-medium">Phone OTP</Label>
                    <div className="flex space-x-2">
                      {[...Array(6)].map((_, index) => (
                        <Input
                          key={`phoneOtp-${index}`}
                          type="text"
                          maxLength={1}
                          className="w-10 text-center"
                          {...register(`phoneOtp.${index}` as any)}
                          onChange={(e) => {
                            const value = e.target.value
                            if (value && index < 5) {
                              document.getElementById(`phoneOtp-${index + 1}`)?.focus()
                            }
                          }}
                          id={`phoneOtp-${index}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  {...register('password')}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authenticatorCode" className="text-sm font-medium">Authenticator Code</Label>
                <div className="flex space-x-2">
                  {[...Array(6)].map((_, index) => (
                    <Input
                      key={`authenticatorCode-${index}`}
                      type="text"
                      maxLength={1}
                      className="w-10 text-center"
                      {...register(`authenticatorCode.${index}` as any)}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value && index < 5) {
                          document.getElementById(`authenticatorCode-${index + 1}`)?.focus()
                        }
                      }}
                      id={`authenticatorCode-${index}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rememberMe" {...register('rememberMe')} />
                <Label htmlFor="rememberMe" className="text-sm">Remember me</Label>
              </div>
              {loginError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Log in'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline transition-all duration-200">
              Forgot password?
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}