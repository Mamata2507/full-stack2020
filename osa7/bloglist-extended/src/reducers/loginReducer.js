import loginService from '../services/login'
import storage from '../utils/storage'

const reducer = (state = storage.loadUser(), action) => {
  switch (action.type) {
    case 'LOGIN':
      storage.saveUser(action.data)
      return action.data
    case 'LOGOUT':
      return null
    default: return state
  }
}



export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password,
    })
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    storage.logoutUser()
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default reducer