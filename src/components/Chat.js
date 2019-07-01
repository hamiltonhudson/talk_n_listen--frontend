import React from 'react';
import { connect } from 'react-redux';

const API = 'http://localhost:3000/api/v1'

class Chat extends React.Component {

  state = {
    chats: []
  }

  componentDidMount() {
    this.getChats()
  }

  getChats = () => {
    fetch(`${API}/chats`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(result => {
      console.log("result in chats", result)
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
    // return this.props.allUsers.map((user) => {
    //   return (
    //     <ul key={user.id}>{user.username}</ul>
    //   )
    // })
  }

  render() {
    console.log("this.props in Chat", this.props)
    console.log("this.props.allUsers in Chat", this.props.allUsers)
    return (
      <div className="chat-container">
        CHAT (Chat.js)!
        {/* {this.listUsers()} */}
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
