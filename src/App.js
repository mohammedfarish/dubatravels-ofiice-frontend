import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Navbar from "./components/Navbar"
import searchPAssport from './pages/Passport/searchPassport'
import Passport from './pages/Passport/Passport'
import VisaEntry from './components/visaRegistration'
import Register from './components/register'
import Login from "./components/login";
import Logout from "./components/Logout";
import LoggedIn from './pages/Logged In/LoggedIn'

import Home from './components/Homepage'
import Install from './components/install/Install'
import startPWA from './components/startpwa';

import AddPassport from './pages/Passport/AddPassport';
import AddVisa from './pages/Add/Visa';
import VisaUpdate from './pages/Visa/Update'

import userContext from "./context/userContext";
import PendingVisa from './pages/Visa/PendingVisa';
import List from './pages/Passport/List';
import Visa from './pages/Visa/Visa';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: '',
      token: '',
      homepage: '/login'
    }

  }


  componentDidMount() {

    if (window.matchMedia('(display-mode: standalone)').matches) {

      const sessionToken = window.sessionStorage.getItem("session_token");
      let session_token
      if (sessionToken) {
        session_token = sessionToken
      } else {
        session_token = undefined
        if (window.location.pathname === '/startpwa' ||
          window.location.pathname === '/checklogin') {

        } else {
          window.location = "/startpwa"

        }
      }


      let token = window.localStorage.getItem('token');
      if (token) {
        // console.log('test')
        // window.localStorage.setItem('token', '')
        // token = ""
        axios.post('https://dubatravels.herokuapp.com/user/verify', null, {
          headers: {
            "x-auth-token": token
          }
        })
          .then(response => {
            // console.log(response.data)
            if (response.data) {
              axios.get('https://dubatravels.herokuapp.com/user', {
                headers: {
                  "x-auth-token": token,
                  "session_token": session_token
                }
              })
                .then(response => {
                  setTimeout(() => {

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
                  }, 2000);
                })
            } else {
              if (window.location.pathname === "/startpwa" ||
                window.location.pathname === "/login") {
                return;
              } else {
                window.localStorage.setItem('token', '');
                window.location = "/login"
              }
            }
          })
      }


      const header = document.getElementById("header");
      if (header) {
        const sticky = header.offsetTop;
        const scrollCallBack = window.addEventListener("scroll", () => {
          if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
          } else {
            header.classList.remove("sticky");
          }
        });
        return () => {
          window.removeEventListener("scroll", scrollCallBack);
        };
      }

    }
  }


  render() {
    if (window.matchMedia('(display-mode: standalone)').matches) {

      if (this.state.user) {
        return (
          <userContext.Provider value={this.state}>
            <Router>
              <div>
                <Navbar />
                <div className="App">
                  <div className="container">
                    <Switch>
                      <Route path='/' exact component={LoggedIn} />
                      <Route path='/search' component={searchPAssport} />
                      <Route path='/visa/add/:id' component={VisaEntry} />
                      <Route path='/visa/update/:id' component={VisaUpdate} />
                      <Route path='/visa/pending' component={PendingVisa} />
                      <Route path='/passport/list' exact component={List} />
                      <Route path='/passport/add/:id' exact component={AddPassport} />
                      <Route path='/passport/:id' exact component={Passport} />
                      <Route path='/visa/:id' exact component={Visa} />
                      <Route path='/add/visa' exact component={AddVisa} />
                      <Route path='/logout' component={Logout} />
                      <Route path='/loggedin' component={LoggedIn} />
                      <Route path='/startpwa' component={startPWA} />
                    </Switch>
                  </div>
                </div>
              </div>
            </Router>
          </userContext.Provider>
        );
      } else {
        return (
          <userContext.Provider value={this.state}>
            <Router>
              <div>
                <Navbar />
                <div className="App">
                  <div className="container">
                    <Switch>
                      <Route path='/' exact component={Login} />
                      <Route path='/register' component={Register} />
                      <Route path='/login' component={Login} />
                      <Route path='/startpwa' component={startPWA} />
                    </Switch>
                  </div>
                </div>
              </div>
            </Router>
          </userContext.Provider>
        );
      }

    } else {
      return (
        <Router>
          <div className="container">
            <Switch>
              <Route path='/' exact render={() => <Home />} />
              <Route path='/install/' render={() => <Install />} />
              <Route exact render={() => <Redirect to="/" />} />
            </Switch>
          </div>
        </Router>
      )
    }
  }
}

export default App;
