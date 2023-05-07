import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Raktárkezelő rendszer</Navbar.Brand>
      </Container>
    </Navbar>
    <App />
  </React.StrictMode>,
)
