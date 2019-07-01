import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import NewUser from './components/NewUser';
import UserHome from './components/UserHome';
import Chat from './components/Chat';
import MyChats from './components/MyChats';
// import NavBar from './components/NavBar';
// import Adapter from './components/Adapter';

class Routes extends React.Component {

  render() {
    return (
      <Router>
        <Route path='/' component={App} />
        <Route exact path='/new' component={(props) => <NewUser {...props}/>} />
        <Route exact path='/login' component={(props) => <Login {...props}/>} />
        <Route path='/homepage' component={UserHome} />
        <Route path='/chat' component={Chat} />
        <Route path='/mychats' component={MyChats} />
      </Router>
    )
  }
}

export default Routes;
