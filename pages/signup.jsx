import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { FormError } from '@/components/ui/error'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { handleRegister } from '@/services/auth'

export default function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' })
  const router = useRouter()
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const validate = () => {
    const newErrors = { email: '', password: '', confirmPassword: '' }
    let isValid = true

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email'
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const isRegistered = handleRegister(formData)
    if (!isRegistered) {
      alert('Email is already registered')
      return
    }
    router.push('/login')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <Card className='w-full max-w-md shadow-xl'>
        <CardHeader>
          <CardTitle className='text-center text-xl font-bold'>Create New Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label className='mb-2' htmlFor='email'>
                Email
              </Label>
              <Input name='email' id='email' type='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' />
              {errors.email && <FormError>{errors.email}</FormError>}
            </div>

            <div>
              <Label className='mb-2' htmlFor='password'>
                Password
              </Label>
              <Input name='password' id='password' type='password' value={formData.password} onChange={handleChange} placeholder='Enter a password' />
              {errors.password && <FormError>{errors.password}</FormError>}
            </div>

            <div>
              <Label className='mb-2' htmlFor='confirmPassword'>
                Confirm Password
              </Label>
              <Input
                name='confirmPassword'
                id='confirmPassword'
                type='password'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Enter a confirm password'
              />
              {errors.confirmPassword && <FormError>{errors.confirmPassword}</FormError>}
            </div>

            <Button type='submit' className='w-full'>
              Create Account
            </Button>
          </form>

          <p className='text-center text-sm text-gray-600 mt-4'>
            Already have an account?{' '}
            <Link href='/login' className='text-blue-500 underline'>
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
