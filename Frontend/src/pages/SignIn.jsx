import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Card } from '@/components/ui/card'
import { RouteIndex, RouteSignUp } from '@/helpers/RouteName'
import { Link, useNavigate } from 'react-router-dom'
import { showToast } from '@/helpers/showToast'
import { getEvn } from '@/helpers/getEnv'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/user/user.slice'
import GoogleLogin from '@/components/GoogleLogin'
import logo from '@/assets/images/logo-dark.png'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: z.string().min(3, { message: 'Password must be at least 3 characters' }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values) => {
    try {
      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      })

      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message || 'Login failed')
      }

      dispatch(setUser(data.user))
      showToast('success', data.message || 'Login successful')
      navigate(RouteIndex)
    } catch (error) {
      showToast('error', error.message || 'Something went wrong')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-black">
      <Card className="w-[400px] p-5 bg-gray-900 border border-green-600 shadow-lg">
        <div className="flex justify-center items-center mb-2">
          <Link to={RouteIndex}>
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-center mb-5 text-green-400">Login Into Account</h1>

        <GoogleLogin />

        <div className="border border-green-600 my-5 relative flex justify-center items-center">
          <span className="absolute bg-gray-900 px-3 text-green-400 text-sm">Or</span>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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

            <Button
              type="submit"
              className="w-full mt-5 bg-green-600 hover:bg-green-700 text-black font-semibold"
            >
              Sign In
            </Button>
          </form>
        </Form>

        <div className="mt-5 text-sm flex justify-center items-center gap-2 text-green-400">
          <p>Don't have an account?</p>
          <Link className="text-green-500 hover:underline" to={RouteSignUp}>
            Sign Up
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default SignIn
