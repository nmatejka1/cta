import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Portal from "./Components/Portal/Portal";
import CorrectUser from "./Components/Portal/CorrectUser";
import Services from "./Components/Services/Services";

function App() {
  return (
    <Router>
      <Navigation/>        
      <Switch>
        <Route exact path="/"  component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
        <Route exact path="/contractor-portal" component={Portal} />
        <Route exact path="/contractor-portal/correct-user" component={CorrectUser} />
      </Switch>
    </Router>
  );
}

export default App;
