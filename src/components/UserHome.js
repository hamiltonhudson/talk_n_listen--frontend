import React from 'react';
import '../App.css'
import { connect } from 'react-redux';
import { getUsers } from '../actions';
import { API_ROOT } from '../constants/Constants';
import ChatsList from './ChatsList';


class UserHome extends React.Component {

  componentDidMount() {
    this.getUsers()
  }

  getUsers = () => {
    fetch(`${API_ROOT}/users`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(result => {
      this.props.getUsers(result)
    })
  }

  listUsers = () => {
    return this.props.allUsers.map((user) => {
      return <li key={user.id}>{user.username}</li>
    })
  }

  render() {
    return(
      <div className="App">
        <h3 className="homepage-header">{this.props.currentUser.username}'s Home Page!</h3>
        {/* <h5>Users</h5> */}
        <div>
          {
            // this.listUsers()
            // this.props.allUsers.map(user => {
            //   return <li key={user.id}>{user.username}</li>
            // })
          }
        </div>
        <hr/>
        <ChatsList chats={this.props.currentUser.user_chats} currentUser={this.props.currentUser}/>
        {/* <ChatsList props={this.props}/> */}
        <hr/>
        <hr/>
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

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (users) => dispatch(getUsers(users))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
