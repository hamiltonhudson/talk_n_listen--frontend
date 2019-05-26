import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class App extends React.Component {

  render() {
    return(
      <div>
        <h3 className="App-header">Talk 'n Listen</h3>
        <div className="row">
          <div className="col l6 m6 s12 App-link">
            <Link to='/login'>Login</Link>
          </div>
          <div className="col l6 m6 s12 App-link">
            <Link to='/new'>New User?</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
