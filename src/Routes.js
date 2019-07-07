import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants/Constants'
import App from './App';
// import Adapter from './components/Adapter';
import Login from './components/Login';
import NewUser from './components/NewUser';
import UserHome from './components/UserHome';
import ChatsList from './components/ChatsList';
// import Chat from './components/Chat';
// import MyChats from './components/MyChats';

class Routes extends React.Component {

  render() {
    return (
      <ActionCableProvider url={API_WS_ROOT}>
        <Router>
          <Route path='/' component={App} />
          <Route exact path='/login' component={(props) => <Login {...props}/>} />
          <Route exact path='/new' component={(props) => <NewUser {...props}/>} />
          <Route path='/homepage' component={UserHome} />
          {/* <Route path='/chat' component={Chat} />
          <Route path='/mychats' component={MyChats} /> */}
          {/* <Route path='/conversations' component={ConversationsList} /> */}
          <Route path='/chats' component={ChatsList} />
        </Router>
      </ActionCableProvider>
    )
  }
}

export default (Routes)
