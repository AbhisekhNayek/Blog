import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from '@/components/ui/card'
import { RouteSignIn } from '@/helpers/RouteName'
import { Link, useNavigate } from 'react-router-dom'
import { getEvn } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import GoogleLogin from '@/components/GoogleLogin'

const SignUp = () => {
  const navigate = useNavigate()

  const formSchema = z
    .object({
      name: z.string().min(3, 'Name must be at least 3 characters long.'),
      email: z.string().email(),
      password: z.string().min(8, 'Password must be at least 8 characters long'),
      confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters long'),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          message: 'Password and confirm password should be the same.',
          path: ['confirmPassword'], // attach error to confirmPassword field
        })
      }
    })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values) {
    try {
      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/auth/register`, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(values)
      })
      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message)
      }
      navigate(RouteSignIn)
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-black">
      <Card className="w-[400px] p-5 bg-gray-900 border border-green-600 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-5 text-green-400">Create Your Account</h1>

        <GoogleLogin />

        <div className="border border-green-600 my-5 relative flex justify-center items-center">
          <span className="absolute bg-gray-900 px-3 text-green-400 text-sm">Or</span>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-green-400">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className="bg-gray-800 text-green-200 border-green-600 focus:ring-green-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-green-400">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      {...field}
                      className="bg-gray-800 text-green-200 border-green-600 focus:ring-green-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-green-400">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="bg-gray-800 text-green-200 border-green-600 focus:ring-green-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-green-400">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password again"
                      {...field}
                      className="bg-gray-800 text-green-200 border-green-600 focus:ring-green-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-5 bg-green-600 hover:bg-green-700 text-black font-semibold">
              Sign Up
            </Button>
          </form>
        </Form>

        <div className="mt-5 text-sm flex justify-center items-center gap-2 text-green-400">
          <p>Already have an account?</p>
          <Link className="text-green-500 hover:underline" to={RouteSignIn}>
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default SignUp
