import React from 'react'
import userContext from '../context/userContext'
import { Link } from 'react-router-dom';

class LoggedIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            displayName: '',
            username: ''
        }
    }

    componentDidMount() {

        setInterval(() => {
            if (!window.localStorage.getItem("token") ||
                !window.sessionStorage.getItem("session_token")) {
                return window.location = "/startpwa"
            }
        }, 2000);

    }

    render() {
        return (
            <userContext.Consumer>
                {(context) => (
                    <div>
                        <div className="page-heading-container">
                            <div>
                                <h1>
                                    {context.user.displayName || "loading"}
                                </h1>
                                <p>
                                    {context.user.userType || "loading"}
                                </p>
                            </div>
                        </div>
                        <div>
                            <Link to="/search" style={{ textDecoration: 'none' }}>
                                <div className="loggedin-option-container">
                                    <h2 className="loggedin-option">
                                        Search Passport
                                    </h2>
                                </div>
                            </Link>
                            <Link to="/search" style={{ textDecoration: 'none' }}>
                                <div className="loggedin-option-container">
                                    <h2 className="loggedin-option">
                                        Other Option
                                    </h2>
                                </div>
                            </Link>

                            <br />
                            <div>
                                <Link
                                    to="/logout"
                                    style={{ textDecoration: 'none' }}>
                                    <div className="loggedin-option-container">
                                        <h2 className="loggedin-option">
                                            Log Out
                                    </h2>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </userContext.Consumer>
        )
    }
}

export default LoggedIn