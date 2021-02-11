import React from 'react';
import { Link } from 'react-router-dom'
import userContext from '../context/userContext'
class Navbar extends React.Component {

    render() {
        if (window.location.pathname === '/startpwa' ||
            window.location.pathname === '/') {
            return null;
        } else {
            return (
                <userContext.Consumer>
                    {(context) => (
                        <header id="header">
                            <nav className="header-container" >
                                <div className="header-logo">
                                    <Link to={context.homepage} >
                                        <img src="/header-logo.png" alt="duba logo" width="200vw" />
                                    </Link>
                                </div>

                                <div className="header-components">
                                    <ul className="navbar-nav mr-auto">
                                        {/* <button className="btn btn-primary"
                                            onClick={() => {
                                                window.localStorage.clear()
                                                window.location.reload()
                                            }}>
                                            Log Out
                                        </button> */}
                                        {/* <li className="">
                                            <Link onClick={() => {
                                                window.localStorage.clear()
                                                window.location.reload()
                                            }} className="nav-link">Log Out</Link>
                                        </li> */}
                                        {/* <li className="navbar-item">
                                            <Link to="/create" className="nav-link">Create Exercise</Link>
                                            </li>
                                            <li className="navbar-item">
                                            <Link to="/user" className="nav-link">Create User</Link>
                                        </li> */}
                                    </ul>
                                </div>
                            </nav>
                        </header>
                    )}
                </userContext.Consumer>
            )
        }
    }
}

export default Navbar;