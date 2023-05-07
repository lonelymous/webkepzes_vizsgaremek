import React from 'react';
import './NavBar.css'

export default function NavBar(props) {
  return (
    <div id='navbar'>
        <h2>{props.text}</h2>
    </div>
  );
}