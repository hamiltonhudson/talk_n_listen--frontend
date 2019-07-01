import React from 'react';
import { NavLink } from 'react-router-dom';
import Adapter from './Adapter';

const NavBar = (props) => {
  return (
    <header className="NavBar">
      <NavLink activeClassName="selected" exact to="/homepage"> Home </NavLink>
      { Adapter.isLoggedIn() ?
        <button activeClassName="selected"
          onClick={() => { Adapter.logout();
            props.history.push("/login")}
          }> Logout
        </button>
      :
      <React.Fragment>
        <NavLink activeClassName="selected" exact to="/new"> Sign Up </NavLink>
        <NavLink activeClassName="selected" exact to="/login"> Login </NavLink>
      </React.Fragment>
      }
      <NavLink activeClassName="selected" exact to="/chat"> Chat! (New Chats w/ users?) </NavLink>
      <NavLink activeClassName="selected" exact to="/mychats"> Messages (Existing Chats?) </NavLink>
    </header>
  )
}

export default NavBar
