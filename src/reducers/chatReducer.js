import * as types from '../constants/Constants';

const initialState = {
  chats: [],
  userChats: [],
  message: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.SET_CHATS:
      return {
        ...state,
        chats: action.payload
      }
    case types.GET_USER_CHATS:
      return {
        ...state,
        userChats: action.payload
      }
    case types.SEND_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    default:
      return state;
  }
}
