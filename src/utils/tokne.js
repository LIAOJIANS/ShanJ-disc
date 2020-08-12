
import Cookies from 'js-cookie'

const TOKEN_KEY = 'TOKEN_KEY'

export function getToken() {
  return Cookies.get(TOKEN_KEY)
}

export function removeToken() {
  return Cookies.remove(TOKEN_KEY)
}

export function setToken(token) {
  return Cookies.set(TOKEN_KEY, token)
}
