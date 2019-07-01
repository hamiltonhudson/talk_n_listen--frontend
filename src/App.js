import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Adapter from './components/Adapter';


class App extends React.Component {

  render() {
    return(
      <div className="App">
        <h3 className="App-header">Talk 'n Listen</h3>
        <br/><br/>
        <div>
          <h5>Navbar row</h5>
          <NavBar {...this.props}/>
        </div>
        <hr/><br/>
      </div>
    )
  }
}

export default App;
