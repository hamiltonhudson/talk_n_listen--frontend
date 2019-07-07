import React from 'react';
import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT } from '../constants/Constants';
import NewChatForm from './NewChatForm';
// import NewUserChatForm from './NewUserChatForm';
import UserChatsDisplay from './UserChatsDisplay';
import Cable from './Cable';

class ChatsList extends React.Component {

  state = {
    chats: [],
    activeChat: null
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/chats`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      }
    })
      .then(r => r.json())
      .then(chats => {
        this.setState({ chats })
      })
  }

  handleClick = id => {
    this.setState({ activeChat: id })
  }

  handleReceivedChat = response => {
    const { chat } = response
    this.setState({
      chats: [...this.state.chats, chat]
    })
  }

  handleReceivedUserChat = response => {
    const userChat = response.user_chat
    const chats = [...this.state.chats]
    const chat = chats.find(
      chat => chat.id === userChat.chat_id
    )
    chat.user_chats = [...chat.user_chats, userChat]
    this.setState({ chats })
  }

  findActiveChat = (chats, activeChat) => {
    return chats.find(
      chat => chat.id === activeChat
    )
  }

  chatsDisplay = (chats, handleClick) => {
    return chats.map(chat => {
      return (
        <li key={chat.id} onClick={() => handleClick(chat.id)}>
          {chat.chat_name}
        </li>
      )
    })
  }

  render() {
    const { chats, activeChat } = this.state
    return (
      <div className="chatsList">
        <ActionCableConsumer
          channel={{ channel: 'ChatsChannel' }}
          onReceived={this.handleReceivedChat}
        />
        {this.state.chats.length ? (
          <Cable
            chats={chats} currentUser={this.props.currentUser}
            handleReceivedUserChat={this.handleReceivedUserChat}
          />
        ) : null}
        <h2>Chats</h2>
        <ul>{this.chatsDisplay(chats, this.handleClick)}</ul>
        <NewChatForm currentUser={this.props.currentUser} />
        {activeChat ? (
          <UserChatsDisplay
            chat={this.findActiveChat(
            chats,
              activeChat
            )}
            currentUser={this.props.currentUser}
          />
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.user
  }
}

export default connect(mapStateToProps)(ChatsList)
