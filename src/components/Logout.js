import React from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {

    componentDidMount() {
        window.localStorage.setItem("token", "");
    }

    render() {
        return setTimeout(() => {
            <Redirect to="/login" />
        }, 1000);
    }
}

export default Logout;