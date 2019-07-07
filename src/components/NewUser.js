import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setUser, getUsers } from '../actions/index';
import { API_ROOT } from '../constants/Constants';


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
    fetch(`${API_ROOT}/users`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      // abstract localStorage into an adapter
      localStorage.setItem('token', result.token)
      this.props.setUser(result)
      this.props.history.push("/homepage")
      this.setState({
        signedUp: true
      })
    })
    // fetch(`${API}/users`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": localStorage.getItem('token')
    //   }
    // })
    // .then(response => response.json())
    // .then(result => {
    //   console.log("fetch users result in Login", result)
    //   this.props.getUsers(result)
    // })
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
            {/* <label className="loginLabel">Name</label>
              <input
              className="input"
              placeholder="Sign Up With Your Name..."
              type="text"
              name="name"
              value={this.state.name}
              onChange={event => this.handleChange(event)}
            /> */}
            <label className="loginLabel">Username</label>
            <input
              className="input"
              placeholder="Choose A Username..."
              type="text"
              name="username"
              value={this.state.username}
              onChange={event => this.handleChange(event)}
            />
            <label>Password</label>
            <input
              className="input"
              placeholder="...And Give It A Password 🔐"
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
          {/* {this.renderHomePage()} */}
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
