import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { isValidEmail } from '@/utils'
import { FormError } from '@/components/ui/error'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { handlelogin } from '@/services/auth'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const [errors, setErrors] = useState({ email: '', password: '' })
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const validate = () => {
    const newErrors = { email: '', password: '' }
    let isValid = true

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Enter a valid email'
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const isValidLogin = handlelogin(formData)
    if (!isValidLogin) {
      toast.error('Invalid email or password')
      return
    }
    router.push('/')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <Card className='w-full max-w-md shadow-xl'>
        <CardHeader>
          <CardTitle className='text-center text-xl font-bold'>Login</CardTitle>
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
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter a password'
                className='pr-10'
              />
              <div
                className='absolute right-3 top-[30px] cursor-pointer text-gray-500 hover:text-gray-700'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </div>
              {errors.password && <FormError>{errors.password}</FormError>}
            </div>

            <Button type='submit' className='w-full' onClick={handleSubmit}>
              Login
            </Button>
          </form>
          <p className='text-center text-sm text-gray-600 mt-4'>
            Don't have an account?{' '}
            <Link href='/signup' className='text-blue-500 hover:underline'>
              Signup
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  const userSession = req.cookies.userSession || null
  if (!userSession) {
    return {
      props: {},
    }
  }

  return {
    redirect: { destination: '/', permanent: false },
  }
}
