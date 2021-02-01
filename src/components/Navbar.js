import React from 'react';
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

    render() {
        if (window.location.pathname === '/startpwa' ||
            window.location.pathname === '/' ||
            window.location.pathname.startsWith('/install/')) {
            return null;
        } else {
            return (
                <nav className="header-container" >
                    <Link to="/login" className="header-logo" >
                        {/* Duba Travels */}
                        <img src="/header-logo.png" alt="duba logo" width="200vw" />
                    </Link>
                    <div className="header-components">
                        <ul className="navbar-nav mr-auto">
                            {/* <li className="">
                            <Link to="/search" className="nav-link">Search Clients</Link>
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
            )
        }
    }
}

export default Navbar;