import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery';
 
let urls = [
  '/img/cat1.jpg',
  '/img/cat2.jpg',
  '/img/cat3.jpg',
];
 
ReactDOM.render(
  <Gallery imageUrls={urls}/>,
  document.getElementById('mount')
);