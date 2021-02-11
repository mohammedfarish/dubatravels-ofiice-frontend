import React from 'react';
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
        // let agent = window.navigator.userAgent
        if (window.navigator.userAgent.toLowerCase().includes('iphone')) {
            this.setState({
                installOn: 'ios',
                hide: false
            })
        } else if (window.navigator.userAgent.toLowerCase().includes('android')) {
            this.setState({
                installOn: 'android',
                hide: false
            })
        }
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
                    </div>
                    <div hidden={this.state.hide}>
                        <Link to={`/install/#${this.state.installOn}`}>
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