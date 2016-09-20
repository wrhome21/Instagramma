import React from 'react';

var User = React.createClass({
  	
	shouldComponentUpdate: function(nextProps, nextState){
    // return a boolean value
    return true;
},

	
	
	
	render: function() {
	var userStyle =  {
		color: 'red'
		};   
console.log("User rendering")		
	  
    return (
	
	 <div style={userStyle}>
	 
		 {this.props.id}: {this.props.name}  
	 
	 </div>

    );
  }
});


export default User;
