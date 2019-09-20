import { LOGIN, LOGOUT } from '../constants/user'

export function login(data) {
  return { type: LOGIN, payload: data }
}

export function logout() {
  return { type: LOGOUT }
}
