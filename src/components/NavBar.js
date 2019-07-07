import React from 'react';
import { NavLink } from 'react-router-dom';
import Adapter from './Adapter';

// const NavBar = (props) => {
class NavBar extends React.Component {
  render() {
  return (
    <header className="NavBar">
      <NavLink activeclassname="selected" exact to="/homepage"> Home </NavLink>
      { Adapter.isLoggedIn() ?
        // <React.Fragment>
          <button activeclassname="selected"
            onClick={() => { Adapter.logout();
              this.props.history.push("/login")}
            }> Logout
          </button>
        // {/* <NavLink activeclassname="selected" exact to="/chats"> ChatsList! </NavLink> */}
        // </React.Fragment>
      :
      <React.Fragment>
        <NavLink activeclassname="selected" exact to="/login" > Login </NavLink>
        <NavLink activeclassname="selected" exact to="/new" > Sign Up </NavLink>
      </React.Fragment>
      }
      {/* <NavLink activeclassname="selected" exact to="/conversations"> ConversationsList! </NavLink> */}

      {/* <NavLink activeclassname="selected" exact to="/chats"> ChatsList! </NavLink> */}

      {/* <NavLink activeClassName="selected" exact to="/chat"> Chat! (New Chats w/ users?) </NavLink> */}
      {/* <NavLink activeClassName="selected" exact to="/mychats"> Messages (Existing Chats?) </NavLink> */}
    </header>
  )
}
}

export default NavBar
