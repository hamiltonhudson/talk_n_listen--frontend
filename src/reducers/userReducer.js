import * as types from '../constants/ActionTypes';

const initialState = {
  users: '',
  user: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state;
  }
}
