import * as types from '../constants/Constants'

export const setUser = (user) => {
  return {
    type: types.SET_USER,
    payload: user
  }
}

export const getUsers = (users) => {
  return {
    type: types.GET_USERS,
    payload: users
  }
}

export const setChats = (chats) => {
  return {
    type: types.SET_CHATS,
    payload: chats
  }
}

export const getMessages = (messages) => {
  return {
    type: types.GET_MESSAGES,
    payload: messages
  }
}

export const getUserChats = (userChats) => {
  return {
    type: types.GET_USER_CHATS,
    payload: userChats
  }
}
