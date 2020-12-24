const reducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':     
      return action.filter
    default:
      return 'ALL'
  }
}

export const filterChange = filter => {
  if (filter === ''){
    return {
      type: 'ALL'
    }
  }
  return {
    type: 'SET_FILTER',
    filter,
  }
}

export default reducer