import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Navbar from "./components/Navbar"
import searchPAssport from './components/searchPassport'
import PassportEntry from './components/passportRegistration'
import VisaEntry from './components/visaRegistration'
import Register from './components/register'
import Login from "./components/login";
import Logout from "./components/Logout";
import LoggedIn from './components/LoggedIn'

import Home from './components/Homepage'
import Install from './components/install/Install'
import startPWA from './components/startpaw';

import userContext from "./context/userContext";

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      token: '',
      test: 'this is a test context',
      homepage: '/login'
    }

  }

  componentDidMount() {

    const sessionToken = window.sessionStorage.getItem("session_token");
    let session_token
    // console.log()
    if (sessionToken) {
      session_token = sessionToken
    } else {
      session_token = undefined
      if (window.location.pathname !== '/startpwa') {
        window.location = "/startpwa"
      }
    }

    let token = window.localStorage.getItem('token');
    if (!token) {
      window.localStorage.setItem('token', '')
      token = ""
    }

    axios.post('https://dubatravels.herokuapp.com/user/verify', null, {
      headers: {
        "x-auth-token": token
      }
    })
      .then(response => {
        if (response.data) {
          axios.get('https://dubatravels.herokuapp.com/user', {
            headers: {
              "x-auth-token": token,
              "session_token": session_token
            }
          })
            .then(response => {
              if (response.data) {
                this.setState({
                  user: response.data,
                  token: token,
                  homepage: '/loggedin'
                })
              } else {
                this.setState({
                  user: '',
                  token: '',
                  homepage: '/login'
                })
              }
            })
        }
      })

  }


  render() {

    if (window.matchMedia('(display-mode: standalone)').matches) {

      return (
        <userContext.Provider value={this.state}>
          <Router>
            <div className="App">
              <Navbar />
              <div className="container">
                <Switch>
                  <Route path='/' exact component={startPWA} />
                  <Route path='/search' component={searchPAssport} />
                  <Route path='/passport' component={PassportEntry} />
                  <Route path='/visa/:id' component={VisaEntry} />
                  <Route path='/register' component={Register} />
                  <Route path='/login' component={Login} />
                  <Route path='/logout' component={Logout} />
                  <Route path='/startpwa' component={startPWA} />
                  <Route path='/loggedin' component={LoggedIn} />
                </Switch>
              </div>
            </div>
          </Router>
        </userContext.Provider>
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
