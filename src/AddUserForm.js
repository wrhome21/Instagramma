import React from 'react';

var AddUserForm = React.createClass({
  getInitialState: function() {
    return {userName: ''};
  },
  handleUserNamerChange: function(e) {
    this.setState({userName: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var userName = this.state.userName.trim();
    
    alert("Im posting " + userName + " to database");
    
	$.ajax({
      url: 'user' ,
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(this.state),
      success: function(data) {
        alert("post complete");
      }.bind(this),
      error: function(xhr, status, err) {
        //this.setState({data: comments});
		alert("post failed");
        console.error(this.state, status, err.toString());
      }.bind(this)
    });
	this.setState({userName: ''});
	
	
  },
  render: function() {
    return (
      <form className="addUserForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="User name"
          value={this.state.userName}
          onChange={this.handleUserNamerChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});


export default AddUserForm;
