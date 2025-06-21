import '@/styles/globals.css'
import { Toaster } from '@/components/ui/sonner'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster richColors theme='light' />
    </>
  )
}
