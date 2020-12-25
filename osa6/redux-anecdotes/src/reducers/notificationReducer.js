const reducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      return action.data
    case 'RESET_NOTIFICATION':
      return null
    default: return state
  }
}

export const createNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: content
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, time*1000);
  }
}

export default reducer