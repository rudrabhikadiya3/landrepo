import { setCookie } from 'cookies-next/client'
import { getLocalStorage, setLocalStorage } from '../utils'
import { deleteCookie } from 'cookies-next'

export const handleRegister = ({ email, password }) => {
  const userData = { email, password }

  const existingUsers = getLocalStorage('users') || []

  const userExists = existingUsers.some((user) => user.email === email)
  if (userExists) {
    return
  }

  existingUsers.push(userData)
  setLocalStorage('users', existingUsers)
  return true
}

export const handlelogin = ({ email, password }) => {
  const existingUsers = getLocalStorage('users') || []
  const user = existingUsers.find((user) => user.email === email && user.password === password)
  if (!user) {
    return false
  }
  setCookie('userSession', user.email)
  return true
}

export const handleLogout = () => {
  deleteCookie('userSession')
  return true
}
