import React from 'react';
import NewUserChatForm from './NewUserChatForm';

const UserChatsDisplay = ({
  chat: { id, chat_name, user_chats },
}) => {
  return (
    <div className="userChatsArea">
      <h2>{chat_name}</h2>
      <ul>{orderedUserChats(user_chats)}</ul>
      <NewUserChatForm chat_id={id} />
    </div>
  )
}

export default UserChatsDisplay;

const orderedUserChats = user_chats => {
  const sortedUserChats = user_chats.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  )
  return sortedUserChats.map(userChat => {
    return <li key={userChat.id}>{userChat.user.username} : {userChat.message_text}</li>;
  })
}
