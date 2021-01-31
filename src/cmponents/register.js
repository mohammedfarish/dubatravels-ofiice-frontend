import React from 'react';
import axios from 'axios';

class Register extends React.Component {

    constructor(props) {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordCheck = this.onChangePasswordCheck.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            displayName: '',
            passwordCheck: '',
            warning: '',
            disableRegisterButton: ''
        }
    }

    componentDidMount() {

        // axios.get('https://beta.mohammedfarish.com/v1/dummy.json')
        //     .then(response => {
        //         console.log(response.data)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

        this.setState({
            username: "",
            password: "",
            passwordCheck: "",
            displayName: "",
            disableRegisterButton: true
        })
    }

    onChangeDisplayName(e) {
        this.setState({
            displayName: e.target.value
        })

        if (this.state.password.length > 5 &&
            this.state.username.length > 3 &&
            this.state.username !== this.state.password) {
            if (this.state.passwordCheck === this.state.password) {
                this.setState({
                    disableRegisterButton: false
                })
            } else {
                this.setState({
                    disableRegisterButton: true
                })
            }
        } else {
            this.setState({
                disableRegisterButton: true
            })
        }

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
            warning: ''
        });

        if (this.state.password.length > 5 &&
            this.state.username.length > 3 &&
            this.state.username !== this.state.password) {
            if (this.state.passwordCheck === this.state.password) {
                this.setState({
                    disableRegisterButton: false
                })
            } else {
                this.setState({
                    disableRegisterButton: true
                })
            }
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
            this.state.username.length > 3 &&
            this.state.username !== this.state.password) {
            if (this.state.passwordCheck === e.target.value) {
                this.setState({
                    disableRegisterButton: false
                })
            } else {
                this.setState({
                    disableRegisterButton: true
                })
            }
        } else {
            this.setState({
                disableRegisterButton: true
            })
        }

    }

    onChangePasswordCheck(e) {
        this.setState({
            passwordCheck: e.target.value,
            warning: ''
        })

        if (this.state.password.length > 5 &&
            this.state.username.length > 3 &&
            this.state.username !== this.state.password) {
            if (e.target.value === this.state.password) {
                this.setState({
                    disableRegisterButton: false
                })
            } else {
                this.setState({
                    disableRegisterButton: true
                })
            }
        } else {
            this.setState({
                disableRegisterButton: true
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            passwordCheck: this.state.passwordCheck,
            displayName: this.state.displayName
        }

        if (user.password.length < 5) {
            return this.setState({
                warning: 'Passwords should be having a minimum of 6 characters.'
            })
        }

        // console.log(user);

        axios.post('https://dubatravels.herokuapp.com/user/register', user)
            .then(res => {
                console.log(res)
                if (res.data === "Success!") {
                    this.setState({
                        username: "",
                        password: "",
                        passwordCheck: "",
                        displayName: "",
                        disableRegisterButton: true,
                        warning: `Your account has been created successfully. Please wait while the system admin reviews your request, to activate.`,
                    })

                    // window.location = ''
                } else {
                    this.setState({
                        warning: res.data,
                        disableRegisterButton: true
                    })
                }
            })

    }

    render() {
        return (
            <div>
                <h1> User Registration</h1>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            autoFocus
                            placeholder="Johnny Bravo"
                            className="form-control"
                            value={this.state.displayName}
                            onChange={this.onChangeDisplayName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Username*</label>
                        <input
                            type="text"
                            placeholder="johnny123"
                            required
                            autoComplete="false"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password*</label>
                        <input
                            type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Retype Password*</label>
                        <input
                            type="password"
                            required
                            className="form-control"
                            value={this.state.passwordCheck}
                            onChange={this.onChangePasswordCheck}
                        />
                    </div>
                    <div className="form-group">
                        {this.state.warning}
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" disabled={this.state.disableRegisterButton} />
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;