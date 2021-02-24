import React from 'react'
import userContext from '../../context/userContext'
import { Link } from 'react-router-dom';

import './loggedin.css'

class LoggedIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            displayName: '',
            username: '',
            hideUpdate: true,
            updateMessage: 'update local app'
        }
    }

    componentDidMount() {
        console.log(process.env)
        const capitalize = ([first, ...rest], lowerRest = false) =>
            first.toUpperCase() +
            (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

        const currentVersion = process.env.REACT_APP_VERCEL_GIT_COMMIT_SHA
        if (currentVersion) {
            let updateMessage = process.env.REACT_APP_VERCEL_GIT_COMMIT_MESSAGE
            updateMessage = updateMessage.split('\n').slice(1).join(' ')
            const cachedVersion = window.localStorage.getItem('app_version')
            if (cachedVersion) {
                if (currentVersion !== cachedVersion) {
                    this.setState({
                        hideUpdate: false,
                        updateMessage: capitalize(updateMessage)
                    })
                }
            } else {
                window.localStorage.setItem('app_version', currentVersion);
            }
        } else {
            let updateMessage = process.env.REACT_APP_VERCEL_GIT_COMMIT_MESSAGE
            if (updateMessage) {
                updateMessage = updateMessage.split('\n').slice(1).join(' ')
            } else {
                updateMessage = this.state.updateMessage
            }
            this.setState({
                hideUpdate: false,
                updateMessage: capitalize(updateMessage)
            })
        }

        this.checkLoggedin = setInterval(() => {
            if (!window.localStorage.getItem("token") ||
                !window.sessionStorage.getItem("session_token")) {
                return window.location = "/startpwa"
            }
        }, 2000);

    }

    componentWillUnmount() {
        clearInterval(this.checkLoggedin)
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
                        <label className="loggenin-section-label">Customer</label>
                        <div>
                            <Link to="/search" style={{ textDecoration: 'none' }}>
                                <div className="loggedin-option-container">
                                    <h2 className="loggedin-option">
                                        Search Passport
                                    </h2>
                                </div>
                            </Link>
                            <Link to="/passport/list" style={{ textDecoration: 'none' }}>
                                <div className="loggedin-option-container">
                                    <h2 className="loggedin-option">
                                        Passports
                                    </h2>
                                </div>
                            </Link>
                            <Link to="/visa/pending" style={{ textDecoration: 'none' }}>
                                <div className="loggedin-option-container">
                                    <h2 className="loggedin-option">
                                        Pending Visas
                                    </h2>
                                </div>
                            </Link>
                            {/* <Link to="/passport/list" style={{ textDecoration: 'none' }}>
                                <div className="loggedin-option-container">
                                    <h2 className="loggedin-option">
                                        Other Option
                                    </h2>
                                </div>
                            </Link> */}

                            <br />

                            <div >
                                <label className="loggenin-section-label">Vendor</label>
                                <Link to="/add/visa" style={{ textDecoration: 'none' }}>
                                    <div className="loggedin-option-container">
                                        <h2 className="loggedin-option">
                                            Visas
                                        </h2>
                                    </div>
                                </Link>
                            </div>

                            <br />

                            <div
                                hidden={this.state.hideUpdate}
                            >
                                <label className="loggenin-section-label">Update Available</label>
                                <div
                                    onClick={() => {
                                        const currentVersion = process.env.VERSION
                                        if (currentVersion) {
                                            window.localStorage.setItem('app_version', currentVersion)
                                        }
                                        window.location.reload()
                                    }}>
                                    <div className="loggedin-update-message">
                                        <p>Update note: {this.state.updateMessage}</p>
                                    </div>
                                    <div className="loggedin-option-container">
                                        <h2 className="loggedin-option">
                                            Update
                                        </h2>
                                    </div>
                                </div>
                            </div>

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