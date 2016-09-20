import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery';
import User from './User';
import AllUsers from './AllUsers';
 
let urls = [
 '/img/cat1.jpg',
 '/img/cat2.jpg',
 '/img/cat3.jpg',
];
 
ReactDOM.render(
 <Gallery imageUrls={urls}/>,
 document.getElementById('mount')
);

//ReactDOM.render(
//  <User name="fred" id="77"/>,
//  document.getElementById('mount')
//);


let allUsersTest = 
{ '1':
   { primaryKey: 1,
     userid: '',
     name: 'fred',
     password: '',
     email: '' },
  '2':
   { primaryKey: 2,
     userid: 'joe',
     name: 'joe',
     password: '',
     email: '' },
  '3':
   { primaryKey: 3,
     userid: 'bill',
     name: 'bill',
     password: '',
     email: '' }
}

// ReactDOM.render(
//   <AllUsers allUsers = {allUsersTest}/>,
//   document.getElementById('mount')
// );