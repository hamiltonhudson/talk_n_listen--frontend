import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setUser, getUsers } from '../actions/index';

const usersAPI = 'http://localhost:3000/api/v1/users/'

class NewUser extends React.Component {

  state = {
    name: '',
    email: '',
    password: '',
    signedUp: false,
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const postConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    }
    fetch(usersAPI, postConfig)
    .then(response => response.json())
    .then(result => {
      console.log("result in NewUser", result)
      if (result.errors){
        window.alert('Hmmm...there might be a typo? 🧐 Please double check!')
        return <Redirect to="/newuser" />
      } else {
        this.props.setUser(result)
        this.setState({
          signedUp: true
        })
        fetch(usersAPI)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          this.props.getUsers(result)
        })
      }
    })
  }

  renderHomePage = () => {
    if (this.state.signedUp) {
      return <Redirect to="/homepage" />
    }
  }


  render() {
    return(
      <div className="form" style={{"marginLeft": "50px", "width": "75%"}}>
        <h3>New User Component</h3>
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            <br/>
            <label className="loginLabel">Name</label>
            <input
              className="input"
              placeholder="Sign Up With Your Name..."
              type="text"
              name="name"
              value={this.state.name}
              onChange={event => this.handleChange(event)}
            />
            <label className="loginLabel">Email</label>
            <input
              className="input"
              placeholder="...Your Email Address..."
              type="email"
              name="email"
              value={this.state.email}
              onChange={event => this.handleChange(event)}
            />
            <label>Password</label>
            <input
              className="input"
              placeholder="...And A Password 🔐"
              type="password"
              name="password"
              value={this.state.password}
              onChange={event => this.handleChange(event)}
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
    currentUser: state.users.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    getUsers: (users) => dispatch(getUsers(users))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
