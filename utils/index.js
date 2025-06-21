import moment from 'moment'

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPassword = (password) => {
  return password && password.length >= 6
}

export function setLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error)
  }
}

export function getLocalStorage(key) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error)
    return null
  }
}

export function isValidLatitude(lat) {
  return typeof lat === 'number' && lat >= -90 && lat <= 90
}

export function isValidLongitude(lng) {
  return typeof lng === 'number' && lng >= -180 && lng <= 180
}

export const now = () => Math.floor(Date.now() / 1000)

export const uniqId = () => Date.now()

export function getRelativeTime(timestamp) {
  return moment.unix(timestamp).fromNow()
}
