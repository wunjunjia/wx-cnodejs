import { LOGIN, LOGOUT } from '../constants/user'

const initState = {
  login: false,
  data: {}
}

export default function (state = {...initState}, action) {
  switch (action.type) {
    case LOGIN:
      return { login: true, ...action.payload }
    case LOGOUT:
      return { login: false, data: {} }
    default:
      return state
  }
}
