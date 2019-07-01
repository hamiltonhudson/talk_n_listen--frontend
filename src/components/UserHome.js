import React from 'react';
import '../App.css'
import { connect } from 'react-redux';
import Chat from './Chat';
import MyChats from './MyChats';
import { getUsers } from '../actions';


const API = 'http://localhost:3000/api/v1'

class UserHome extends React.Component {

  componentDidMount() {
    this.getUsers()
  }

  getUsers = () => {
    fetch(`${API}/users`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(result => {
      console.log("fetch users result in Login", result)
      this.props.getUsers(result)
    })
  }

  listUsers = () => {
    console.log(this.props.allUsers)
    return this.props.allUsers.map((user) => {
      return <li key={user.id}>{user.username}</li>
    })
  }

  render() {
    console.log("this.props.allUsers in UserHome", this.props.allUsers)
    // this.listUsers()
    return(
      <div className="App">
        <h3 className="homepage-header">{this.props.currentUser.username}'s Home Page!</h3>
        <h5>Users</h5>
        <div>
          {
            this.listUsers()
            // this.props.allUsers.map(user => {
            //   return <li key={user.id}>{user.username}</li>
            // })
          }
        </div>
        <hr/>
        <Chat />
        <hr/>
        <MyChats />
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
