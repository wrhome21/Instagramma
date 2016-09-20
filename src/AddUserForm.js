import React from 'react';
import AllUsers from './AllUsers';

var AddUserForm = React.createClass({
  getInitialState: function() {
    return {userName: '', allUsers: ''};
  },
  handleUserNamerChange: function(e) {
    this.setState({userName: e.target.value, allUsers: ''});
  },
 
  handleSubmit: function(e) {
    e.preventDefault();
    var userName = this.state.userName.trim();
    
    console.log("Im posting " + userName + " to database");
    
	$.ajax({
      url: 'user' ,
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(this.state),
	  contentType: "application/json; charset=utf-8",
      success: function(data) {
       console.log("user name post complete");
	   
	   /////////////////////////
	   $.ajax({
      url: 'allusers' ,
      dataType: 'json',
      type: 'GET',
      data: this.state.username,
	  contentType: "application/json; charset=utf-8",
      success: function(data) {
		  // push all the users onto state
		  //console.log(data);
		  this.setState({userName: userName, allUsers: data[Object.keys(data).length ]});
       console.log("allusers get complete");
      }.bind(this),
      error: function(xhr, status, err) {
        //this.setState({data: comments});
		//alert("post failed");
        console.error("allusers:: state: " + this.state + " status: " +  status + " error: " + err.toString());
      }.bind(this)
    });
	console.log(this.state.allUsers);  
	this.setState({allUsers: ''});
	 
	   
	   ////////////////////////
      }.bind(this),
      error: function(xhr, status, err) {
        //this.setState({data: comments});
		//alert("post failed");
        console.error("user name:: state: " + this.state + " status: " +  status + " error: " + err.toString());
      }.bind(this)
    });
	this.setState({userName: ''});
	
	
	
	
  },
  render: function() {
    return (
       <div>
	   <form className="addUserForm" onSubmit={this.handleSubmit}>
         <input
           type="text"
           placeholder="User name"
           value={this.state.userName}
           onChange={this.handleUserNamerChange}
         />
         <input type="submit" value="Post" / >
		
       </form>

      <AllUsers allusers={this.state.allUsers.name} />
	  </div>
	  
    );
  }
});


export default AddUserForm;
