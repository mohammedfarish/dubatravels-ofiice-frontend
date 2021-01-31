import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Navbar from "./cmponents/Navbar"
import searchPAssport from './cmponents/searchPassport'
import PassportEntry from './cmponents/passportRegistration'
import VisaEntry from './cmponents/visaRegistration'
import Register from './cmponents/register'
import Login from "./cmponents/login";

import Home from './cmponents/Homepage'
import Install from './cmponents/install/Install'
import startPWA from './cmponents/startpaw';

class App extends React.Component {

  render() {
    // if (!window.matchMedia('(display-mode: standalone)').matches) {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return (
        <Router>
          <Switch>
            <div className="App">
              <Navbar />
              <div className="container">
                <Route path='/new' exact component={Home} />
                <Route path='/search' exact component={searchPAssport} />
                <Route path='/passport' exact component={PassportEntry} />
                <Route path='/visa/:id' exact component={VisaEntry} />
                <Route path='/register' exact component={Register} />
                <Route path='/login' exact component={Login} />
                <Route path='/startpwa' exact component={startPWA} />
              </div>
            </div>
          </Switch>
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
