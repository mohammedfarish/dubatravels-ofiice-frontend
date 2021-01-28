import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

// import Navbar from "./components/Navbar"
// import ExerciseList from "./components/ExerciseList"
import ExerciseEdit from "./components/ExerciseEdit"
import ExerciseCreate from "./components/ExerciseCreate"
import CreateUser from "./components/CreateUser"

import Navbar from "./cmponents/Navbar"
import searchPAssport from './cmponents/searchPassport'
import PassportEntry from './cmponents/passportRegistration'
import VisaEntry from './cmponents/visaRegistration'
import Register from './cmponents/register'
import Login from "./cmponents/login";

import Home from './cmponents/Homepage'
import iOS from './cmponents/install/ios'
import startPWA from './cmponents/startpaw';

class App extends React.Component {
  render() {

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <div className="headless">
              <Route path='/' exact component={Home} />
              <Route path='/install/ios' exact component={iOS} />
              <Route path='/startpwa' exact component={startPWA} />
            </div>
            <Route path='/edit/:id' exact component={ExerciseEdit} />
            <Route path='/create' exact component={ExerciseCreate} />
            <Route path='/user' exact component={CreateUser} />

            <Route path='/new' exact component={Home} />
            <Route path='/search' exact component={searchPAssport} />
            <Route path='/passport' exact component={PassportEntry} />
            <Route path='/visa/:id' exact component={VisaEntry} />
            <Route path='/register' exact component={Register} />
            <Route path='/login' exact component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}


export default App;
