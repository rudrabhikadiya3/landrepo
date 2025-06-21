import { useEffect, useState } from 'react'
import { LogOut } from 'lucide-react'
import { getCookie } from 'cookies-next'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { handleLogout } from '@/services/auth'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [currentUser, setCurrentUser] = useState(null)
  const router = useRouter()
  useEffect(() => {
    const user = getCookie('userSession')
    if (user) setCurrentUser(user)
  }, [])

  return (
    <header className='sticky top-0 z-50 w-full bg-white border-b shadow-sm'>
      <div className='max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between'>
        <div className='text-xl font-bold text-blue-600'>LandReco</div>
        <div className='flex items-center gap-4'>
          {currentUser && <div className='text-sm text-gray-700 hidden sm:block'>{currentUser}</div>}

          <AlertDialog>
            <AlertDialogTrigger>
              <LogOut className='w-5 h-5 text-red-700' />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleLogout()
                    router.push('/login')
                  }}
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </header>
  )
}
