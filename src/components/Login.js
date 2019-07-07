import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setUser } from '../actions';
import { API_ROOT } from '../constants/Constants';


class Login extends React.Component {

  state = {
    username: '',
    password: '',
    loggedIn: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`${API_ROOT}/auth/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(result => {
      localStorage.setItem('token', result.token)
      this.props.setUser(result)
      this.props.history.push("/homepage")
      this.setState({
        loggedIn: true
      })
    })
  }

  renderHomePage = () => {
    if (this.state.loggedIn) {
      return <Redirect to="/homepage"/>
    }
  }



  render() {
    return (
      <div className="form" style={{"marginLeft": "50px", "width": "75%"}}>
        <h3>Login Component</h3>
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            <br/>
            <label className="loginLabel">Username</label>
            <input
              className="input"
              placeholder="Who Are You?!"
              type="text"
              name="username"
              value={this.state.username}
              onChange={event => this.handleChange(event)}
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
          {/* {this.renderHomePage()} */}
        </div>
      </div>
    )
  }
}

  const mapStateToProps = (state) => {
    return {
      currentUser: state.users.user,
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      setUser: (currentUser) => dispatch(setUser(currentUser)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Login);
