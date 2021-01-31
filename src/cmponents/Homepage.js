import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            installOn: 'i',
            hide: true
        }
    }

    componentDidMount() {
        console.log(window.navigator.userAgent)
        let agent = window.navigator.userAgent
        if (window.navigator.userAgent.toLowerCase().includes('iphone')) {
            agent = 'iphone ' + window.navigator.userAgent
            this.setState({
                installOn: 'ios',
                hide: false
            })
        } else if (window.navigator.userAgent.toLowerCase().includes('chrome')) {
            agent = window.navigator.userAgent
        }
        else if (window.navigator.userAgent.toLowerCase().includes('android')) {
            agent = window.navigator.userAgent
        }
        else {
            // agent = 'something else'
            agent = window.navigator.userAgent
        }
        axios.post('https://dubatravels.herokuapp.com/user/agent', {
            "user": agent
        })


        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
        }

        function error(err) {
            console.log(`ERROR(${err.code}): ${err.message}`);
            return console.log('ok nvm')
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    render() {
        return (
            <div>
                <div className="homepage">
                    <img className="homepage-logo" src="/logo.png" alt="Duba Travels Logo" width="200vw" />
                    <div className="homepage-header-container">
                        <h1 className="homepage-header"> Remote Office Portal</h1>
                    </div>
                    <div>
                        <h4 className="homepage-install-msg">Please install the WebApp to proceed further.</h4>
                    </div>
                    <div hidden={this.state.hide}>
                        <br />
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" /></svg>
                    </div>
                    <div hidden={this.state.hide}>
                        <br />
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>                    </div>
                    <div hidden={this.state.hide}>
                        <Link to={`/install/${this.state.installOn}`}>
                            <h5 className="homepage-install-link">
                                How to install?
                            </h5>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;