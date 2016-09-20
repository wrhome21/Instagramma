import React from 'react';
import User from './User';

var AllUsers = React.createClass({

  render: function () {
    console.log("All users rendering " + this.props.allUsers)	
    var userObj = this.props.allUsers;
    var userNodes = [];
    for (var key in userObj) {
      if (userObj.hasOwnProperty(key)) {
        userNodes.push(<User name={userObj[key].name} id = {userObj[key].primaryKey}/>);
      }
    }
	console.log(userNodes)	
      return (
        <div className="userList">
          {userNodes}
        </div>);
	  
  }
});

export default AllUsers;
