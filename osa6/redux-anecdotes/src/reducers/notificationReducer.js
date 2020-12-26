const reducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      return action.data
    case 'RESET_NOTIFICATION':
      return null
    default: return state
  }
}

let timeoutID
export const createNotification = (content, time) => {

  return async dispatch => {
    clearTimeout(timeoutID)

    timeoutID = setTimeout(() => {
      dispatch({ type: 'RESET_NOTIFICATION' })
    }, time * 1000)
    
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: content
    })

  }
}

export default reducer