import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { FormError } from '@/components/ui/error'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { handleRegister } from '@/services/auth'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'

export default function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false })

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
      toast.error('Email is already registe')
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

            <div className='relative'>
              <Label className='mb-2' htmlFor='password'>
                Password
              </Label>
              <Input
                name='password'
                id='password'
                type={showPassword.password ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter a password'
              />

              <div
                className='absolute right-3 top-[30px] cursor-pointer text-gray-500 hover:text-gray-700'
                onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
              >
                {showPassword.password ? <Eye size={18} /> : <EyeOff size={18} />}
              </div>
              {errors.password && <FormError>{errors.password}</FormError>}
            </div>

            <div className='relative'>
              <Label className='mb-2' htmlFor='confirmPassword'>
                Confirm Password
              </Label>
              <Input
                name='confirmPassword'
                id='confirmPassword'
                type={showPassword.confirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Enter a confirm password'
              />

              <div
                className='absolute right-3 top-[30px] cursor-pointer text-gray-500 hover:text-gray-700'
                onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
              >
                {showPassword.confirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </div>
              {errors.confirmPassword && <FormError>{errors.confirmPassword}</FormError>}
            </div>

            <Button type='submit' className='w-full'>
              Create Account
            </Button>
          </form>

          <p className='text-center text-sm text-gray-600 mt-4'>
            Already have an account?{' '}
            <Link href='/login' className='text-blue-500 hover:underline'>
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
