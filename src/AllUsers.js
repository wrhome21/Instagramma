import React from 'react';

var AllUsers = React.createClass({
  
  render: function() {
    return (
	 <div><h2>{this.props.allusers}</h2>
	 </div>

    );
  }
});


export default AllUsers;
