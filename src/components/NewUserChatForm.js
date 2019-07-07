import React from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants/Constants';

class NewUserChatForm extends React.Component {

  state = {
    message_text: '',
    chat_id: this.props.chat_id,
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      chat_id: nextProps.chat_id,
    })
  }

  handleChange = (event) => {
    this.setState({ message_text: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`${API_ROOT}/user_chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        message_text: this.state.message_text,
        chat_id: this.state.chat_id,
        user_id: this.props.currentUser.id
      })
    })
    this.setState({
      message_text: ''
    })
  }

  render() {
    return (
      <div className="newUserChatForm">
        <form onSubmit={this.handleSubmit}>
          <br />
          <label>New Message:</label>
          <input
            type="text"
            value={this.state.message_text}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.user
  }
}

export default connect(mapStateToProps)(NewUserChatForm)
