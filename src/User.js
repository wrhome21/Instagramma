import React from 'react';

var User = React.createClass({
  	
	render: function() {
	var userStyle =  {
		color: 'red'
		};    
	  
    return (
	
	 <div style={userStyle}>
	 
		 {this.props.id}: {this.props.name}  
	 
	 </div>

    );
  }
});


export default User;
