import React from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants/Constants';


class Chat extends React.Component {

  state = {
    chats: []
  }

  componentDidMount() {
    this.getChats()
  }

  getChats = () => {
    fetch(`${API_ROOT}/chats`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(result => {
      this.setState({
        chats: result
      })
    })
    .catch(err => {
      console.log('catch')
      this.setState({
        chats: []
      })
    })
  }

  listUsers = () => {
    console.log(this.props.allUsers)
    return this.props.allUsers.map((user) => {
      return (
        <ul key={user.id}>{user.username}</ul>
      )
    })
  }

  render() {
    return (
      <div className="chat-container">
        {this.listUsers()}
        <div className="all-chats-list">
          <h5>All Chats</h5>
          {this.state.chats.map(chat => {
            return (
              <span key={chat.id}> chat_id: {chat.id} - message: {chat.message}</span>
            )
          })}
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    allUsers: state.users.users,
    currentUser: state.users.user
  }
}

export default connect(mapStateToProps)(Chat)
