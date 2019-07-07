import { combineReducers } from 'redux';
import users from './userReducer';
import chats from './chatReducer';

const rootReducer = combineReducers({
  users,
  chats
})

export default rootReducer;
