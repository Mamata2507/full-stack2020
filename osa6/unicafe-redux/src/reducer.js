const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state, action) => {
  const changedState = { ...state}
  switch (action.type) {
    case 'GOOD':
      changedState.good++
      return changedState
    case 'OK':
      changedState.ok++
      return changedState
    case 'BAD':
      changedState.bad++
      return changedState
    case 'ZERO':
      return initialState
    default: return initialState
  }

}

export default counterReducer