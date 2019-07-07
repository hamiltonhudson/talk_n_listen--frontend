import React from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants/Constants';

class NewChatForm extends React.Component {

  state = {
    chat_name: ''
  }

  handleChange = (event) => {
    this.setState({ chat_name: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`${API_ROOT}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(this.state)
    })
    this.setState({
      chat_name: ''
    })
  }

  render() {
    return (
      <div className="newChatForm">
        <form onSubmit={this.handleSubmit}>
          <br />
          <label>New Group Chat:</label>
          <input
            type="text"
            value={this.state.chat_name}
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

export default connect(mapStateToProps)(NewChatForm)
