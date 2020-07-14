
import cookie from 'js-cookie'
import { TOKEN_KEY } from './config'

export function getToken() {
  return cookie.get(TOKEN_KEY)
}

export function removeToken() {
  return cookie.remove(TOKEN_KEY)
}

export function setToken(token) {
  return cookie.set(TOKEN_KEY, token)
}
