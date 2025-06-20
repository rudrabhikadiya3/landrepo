import { getLocalStorage, setLocalStorage } from '../utils'

export const handleRegister = ({ email, password }) => {
  const userData = { email, password }

  const existingUsers = getLocalStorage('users') || []

  const userExists = existingUsers.some((user) => user.email === email)
  if (userExists) {
    console.error('User already exists')
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
  setLocalStorage('userSession', { email: user.email })
  return true
}
