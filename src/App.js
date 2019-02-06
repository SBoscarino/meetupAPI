import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './styles/Home.css' 
import Home from './components/Home.js'
import Rsvp from './components/Rsvp.js'


const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/rsvp" exact component={Rsvp} />
    </div>
  </Router>
);
export default AppRouter;