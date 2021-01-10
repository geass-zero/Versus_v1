import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';


import Routes from "./components/Routes.js";
import Header from "./components/Header";

import './style/App.css';

const App = () => {

  return (
        
    <Container fluid>
      {/* <Favicon/> */}
      <Router>
          <Header/>
          {/* <TickerComponent/> */}
          <Routes/>
          {/* <Footer/> */}
      </Router>
    </Container>
  )
}

export default App;
