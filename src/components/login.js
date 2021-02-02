import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'

class Login extends React.Component {

    constructor(props) {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.redirectLogin = this.redirectLogin.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            warning: '',
            disableRegisterButton: '',
            userIP: '',
            userCountryCode: '',
            logedin: false
        }
    }

    componentDidMount() {
        if (window.localStorage.getItem("token")) {
            axios.post('https://travels.mohammedfarish.com/user/verify', null, {
                headers: {
                    "x-auth-token": window.localStorage.getItem("token")
                }
            })
                .then(response => {
                    console.log(response.data)
                    if (response.data) {
                        this.setState({
                            logedin: true
                        })
                    } else {
                        this.setState({
                            logedin: false
                        })
                    }
                })
                .catch(err => {
                    this.setState({
                        logedin: false
                    })
                })
        }

        // axios.get('https://beta.mohammedfarish.com/v1/dummy.json')
        //     .then(response => {
        //         console.log(response.data)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

        // console.log(this.props)

        axios.get(`https://freegeoip.app/json/`)
            .then(response => {
                const { ip, country_code } = response.data
                this.setState({
                    userIP: ip,
                    userCountryCode: country_code
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    userIP: ''
                })
            })

        this.setState({
            username: "",
            password: "",
            disableRegisterButton: true,
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
            warning: ''
        });

        if (this.state.password.length > 5 &&
            this.state.username.length > 3) {
            this.setState({
                disableRegisterButton: false
            })
        } else {
            this.setState({
                disableRegisterButton: true
            })
        }

    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
            warning: ''
        })

        if (this.state.password.length > 5 &&
            this.state.username.length > 3) {
            this.setState({
                disableRegisterButton: false
            })
        } else {
            this.setState({
                disableRegisterButton: true
            })
        }

    }

    redirectLogin() {
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    onSubmit(e) {
        e.preventDefault();

        if (!window.sessionStorage.getItem("session_token")) {
            return window.location = "/startpwa";
        }

        const session_token = window.sessionStorage.getItem("session_token")

        const user = {
            username: this.state.username,
            password: this.state.password,
            userIP: this.state.userIP,
            userCountryCode: this.state.userCountryCode,
            session_token
        }

        if (user.password.length < 5) {
            return this.setState({
                warning: 'Passwords should be having a minimum of 6 characters.'
            })
        }

        axios.post('https://dubatravels.herokuapp.com/user/login', user)
            .then(res => {

                if (res.data) {
                    if (res.data.message === "Success!") {
                        this.setState({
                            disableRegisterButton: true
                        })
                        const existingToken = window.localStorage.getItem('token')
                        if (existingToken) {
                            window.localStorage.removeItem('token')
                        }
                        window.localStorage.setItem('token', res.data.token)
                        return this.redirectLogin()
                    } else {
                        this.setState({
                            warning: res.data,
                            password: "",
                            disableRegisterButton: true
                        })
                    }
                } else {
                    this.setState({
                        username: "",
                        password: "",
                        disableRegisterButton: true
                    })
                }
            })

    }

    render() {
        if (this.state.logedin) {
            return <Redirect to="/loggedin" />
        } else {
            return (
                <div>
                    <div className="page-heading-container">
                        <h1 className="page-heading" > Login</h1>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                required
                                autoFocus
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                required
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                            />
                        </div>
                        <div className="form-group">
                            {this.state.warning}
                        </div>
                        <div className="form-group buttons">
                            <input type="submit" value="Login" className="btn btn-primary" disabled={this.state.disableRegisterButton} />
                            <Link to="/register" >
                                {/* <input className="btn btn-primary" value="Register" onChange="" /> */}
                            </Link>
                        </div>
                    </form>
                </div >
            )
        }
    }
}

export default Login;