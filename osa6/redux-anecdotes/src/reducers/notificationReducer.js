const initialNotification = null

const reducer = (state = initialNotification, action) => {
  switch (action.type){
    case 'VOTE_NOTIFICATION':
      return `you voted ${action.data}`
    case 'CREATE_NOTIFICATION':
      return `you added ${action.data}`
    case 'RESET_NOTIFICATION':
      return action.data
    default: return state
  }
}

export const voteNotification = (content) => {

  return {
    type: 'VOTE_NOTIFICATION',
    data:  content
  }
}

export const createNotification = (content) => {
  return {
    type: 'CREATE_NOTIFICATION',
    data: content
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION',
    data: null
  }
}

export default reducer