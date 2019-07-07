import React from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants/Constants';


class MyChats extends React.Component {

  state = {
    myChats: []
  }

  componentDidMount() {
    this.getMyChats()
  }

  getMyChats = () => {
    fetch(`${API_ROOT}/users/${this.props.currentUser.id}/chats`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log("json in myChats", json)
      this.setState({
        myChats: json
      })
    })
    .catch(err => {
      console.log('catch')
      this.setState({
        myChats: []
      })
    })
  }

  render() {
    return (
      <div className="myChats-container">
        <h5>⇣ MyChats (MyChats.js)! ⇣</h5>
        {
          this.state.myChats.map(myChat => {
            return (
              <ul key={myChat.id}>
                {myChat.message}
              </ul>
            )
          })
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.user
  }
}

export default connect (mapStateToProps)(MyChats)
