import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Navbar from "./components/Navbar"
import searchPAssport from './components/searchPassport'
import PassportEntry from './components/passportRegistration'
import VisaEntry from './components/visaRegistration'
import Register from './components/register'
import Login from "./components/login";

import Home from './components/Homepage'
import Install from './components/install/Install'
import startPWA from './components/startpaw';

class App extends React.Component {

  render() {

    if (!window.matchMedia('(display-mode: standalone)').matches) {

      return (
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route path='/' exact component={startPWA} />
                <Route path='/search' exact component={searchPAssport} />
                <Route path='/passport' exact component={PassportEntry} />
                <Route path='/visa/:id' exact component={VisaEntry} />
                <Route path='/register' exact component={Register} />
                <Route path='/login' exact component={Login} />
                <Route path='/startpwa' exact component={startPWA} />
              </Switch>
            </div>
          </div>
        </Router>
      );
    } else {

      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
      document.addEventListener('copy', (e) => {
        e.preventDefault();
      });

      return (
        <Router>
          <div className="container">
            <Switch>
              <Route path='/' exact render={() => <Home />} />
              <Route path='/install/' exact render={() => <Install />} />
              <Route exact render={() => <Home />} />
            </Switch>
          </div>
        </Router>
      );
    }
  }
}


export default App;
