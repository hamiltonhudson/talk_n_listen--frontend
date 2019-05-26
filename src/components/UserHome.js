import React from 'react';
import '../App.css'
import { connect } from 'react-redux';

class UserHome extends React.Component {

  render() {
    console.log(this.props)
    return(
      <div className="App">
        <h3 className="homepage-header">{this.props.currentUser.name}'s Home Page!</h3>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.user
  }
}

export default connect(mapStateToProps)(UserHome);
