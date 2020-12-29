const reducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      return action
    case 'RESET_NOTIFICATION':
      return null
    default: return state
  }
}

let timeoutID
export const createNotification = (message, type, time) => {

  return async dispatch => {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({ type: 'RESET_NOTIFICATION' })
    }, time * 1000)
    
    dispatch({
      type: 'CREATE_NOTIFICATION',
      message: message,
      messageType: type
    })

  }
}

export default reducer