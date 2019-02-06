import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './styles/Home.css' 
import Home from './components/Home.js'
import Rsvp from './components/Rsvp.js'
import Button from '@material-ui/core/Button';


const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Button variant="outlined">
              <Link className="link" to="/">Logout</Link> 
            </Button>
          </li>
        </ul>
      </nav>
      <Route path="/" exact component={Home} />
      <Route path="/rsvp" exact component={Rsvp} />
    </div>
  </Router>
);
export default AppRouter;