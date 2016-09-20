import React from 'react';
import User from './User';

var AllUsers = React.createClass({

  render: function () {
    var userObj = this.props.allUsers;
    var userNodes = [];
    for (var key in userObj) {
      if (userObj.hasOwnProperty(key)) {
        userNodes.push(<User name={userObj[key].name} id = {userObj[key].primaryKey}/>);
      }
    }
      return (
        <div className="userList">
          {userNodes}
        </div>);
	  
  }
});



export default AllUsers;
