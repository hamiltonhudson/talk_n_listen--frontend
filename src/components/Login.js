import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUsers, setUser } from '../actions';

// const usersAPI = 'http://localhost:3000/api/v1/users/'
const API = 'http://localhost:3000/api/v1/'

class Login extends React.Component {

  state = {
    email: '',
    password: '',
    loggedIn: false
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`${API}/users`)
    // fetch(`${API}/auth`)
    .then(r => r.json())
    .then(response => {
      console.log("response", response)
      this.props.getUsers(response)
      let currentUser = this.props.allUsers.find(user => user.email === this.state.email)
      // let currentUser = this.props.allUsers.find(user => user.email === this.state.email && user.password === this.state.password)
      this.props.setUser(currentUser)
      this.setState({
        loggedIn: true
      })
    })
  }

  renderHomePage = () => {
    if (this.state.loggedIn) {
      return <Redirect to="/homepage" />
    }
  }



  render() {
    return (
      <div className="form" style={{"marginLeft": "50px", "width": "75%"}}>
        <h3>Login Component</h3>
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            <br/>
            <label className="loginLabel">Email</label>
            <input
              className="input"
              placeholder="Enter Yo' Email!"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label className="loginLabel">Password</label>
            <input
              className="input"
              placeholder="Password 🗝 Please"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <br/><br/>
            <input
              type="submit"
              className="submit-button"
            />
          </form>
          {this.renderHomePage()}
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

  const mapDispatchToProps = (dispatch) => {
    return {
      getUsers: (users) => dispatch(getUsers(users)),
      setUser: (currentUser) => dispatch(setUser(currentUser))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Login);
