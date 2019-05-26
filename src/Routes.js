import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import NewUser from './components/NewUser';
import UserHome from './components/UserHome';

class Routes extends React.Component {

  render() {
    return (
       <Router>
         <Switch>
           <Route path='/' exact render={() => <App />} />
           <Route path='/login' component={Login} />
           <Route path='/new' component={NewUser} />
           <Route path='/homepage' component={UserHome} />
         </Switch>
       </Router>
    )
  }
}

export default Routes;
