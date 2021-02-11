import React from 'react';

class Logout extends React.Component {

    componentDidMount() {
        window.localStorage.setItem("token", "");
        setTimeout(() => {
            window.location = "/login"
        }, 1000);
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default Logout;