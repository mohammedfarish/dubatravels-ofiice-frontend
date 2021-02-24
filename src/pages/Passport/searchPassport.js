import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";
import './passport.css'

export default class searchPassport extends Component {

    constructor(props) {
        super(props)

        this.onChangePassportNumber = this.onChangePassportNumber.bind(this)
        this.onPassportAdd = this.onPassportAdd.bind(this)
        this.onClickCancelSearch = this.onClickCancelSearch.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            loggedin: true,
            passportNumber: '',
            passportNumberFieldReadOnly: false,
            passportLink: '',
            redirectToPassport: false,
            hideAddPassportSection: true,
            redirectToAddPassport: false,
            hideSearchResult: true,
            passportHolderFirstName: '',
            passportHolderLastName: '',
            nationality: '',
            hideCancelButton: true
        }
    }

    componentDidMount() {
        const token = window.localStorage.getItem("token")
        if (token) {
            axios.post('https://dubatravels.herokuapp.com/user/verify', null, {
                headers: {
                    "x-auth-token": token
                }
            })
                .then(response => {
                    if (response.data) {
                        this.setState({
                            loggedin: true
                        })
                    } else {
                        window.location = "/"
                        this.setState({
                            loggedin: false
                        })
                    }
                })
                .catch(() => {
                    window.location = "/"
                    this.setState({
                        loggedin: false
                    })
                })
        }
    }

    onChangePassportNumber(e) {
        this.setState({
            passportNumber: e.target.value.toUpperCase()
        })
    }

    onPassportAdd() {

        if (!window.localStorage.getItem("token") ||
            !window.sessionStorage.getItem("session_token")) {
            return window.location = "/startpwa";
        }

        const passport = {
            passportNumber: this.state.passportNumber.toUpperCase()
        }

        if (passport.passportNumber.length > 4) {
            this.setState({
                passportLink: `/passport/add/${this.state.passportNumber.toUpperCase()}`,
                redirectToAddPassport: true
            })
        }
    }

    onClickCancelSearch() {
        this.setState({
            passportNumber: '',
            passportNumberFieldReadOnly: false,
            passportLink: '',
            redirectToPassport: false,
            hideAddPassportSection: true,
            redirectToAddPassport: false,
            hideSearchResult: true,
            passportHolderFirstName: '',
            passportHolderLastName: '',
            hideCancelButton: true
        })
    }

    onSubmit(e) {
        e.preventDefault();
        if (!window.localStorage.getItem("token") ||
            !window.sessionStorage.getItem("session_token")) {
            return window.location = "/startpwa";
        }

        const passport = {
            passportNumber: this.state.passportNumber.toUpperCase()
        }

        if (passport.passportNumber.length > 4) {

            this.setState({
                passportNumber: this.state.passportNumber.toUpperCase(),
                passportNumberFieldReadOnly: true,
            })


            axios.post(`https://dubatravels.herokuapp.com/passport/search`, passport, {
                headers: {
                    "x-auth-token": window.localStorage.getItem('token')
                }
            })
                .then(response => {

                    if (response.data) {

                        setTimeout(() => {
                            this.setState({
                                passportLink: `/passport/${response.data._id}`,
                                passportHolderFirstName: response.data.passportHolderFirstName,
                                passportHolderLastName: response.data.passportHolderLastName,
                                nationality: response.data.nationality,
                                hideSearchResult: false,
                                hideCancelButton: false
                            })
                        }, 1000);

                    } else {
                        this.setState({
                            hideAddPassportSection: false,
                            hideCancelButton: false
                        })
                    }
                })
                .catch(() => {
                    this.setState({
                        hideAddPassportSection: false,
                        hideCancelButton: false
                    })
                })
        }

    }

    render() {

        if (this.state.redirectToPassport) {
            return <Redirect to={this.state.passportLink} />
        }
        if (this.state.redirectToAddPassport) {
            return <Redirect to={this.state.passportLink} />
        }

        if (this.state.loggedin) {
            return (
                <div>
                    <h1 className="page-heading-container">Passport Search</h1>
                    <div>

                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Passport Number</label>
                                <input
                                    type="text"
                                    autoFocus
                                    required
                                    readOnly={this.state.passportNumberFieldReadOnly}
                                    className="form-control search-box"
                                    value={this.state.passportNumber}
                                    onChange={this.onChangePassportNumber}
                                    placeholder="Search..."
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    disabled={this.state.passportNumberFieldReadOnly}
                                    type="submit"
                                    value="Search"
                                    className="btn btn-primary"
                                />
                            </div>
                        </form>
                    </div>
                    <div
                        hidden={this.state.hideAddPassportSection}
                    >
                        <p>Passport information not found.</p>
                        <div className="form-group">
                            <input
                                type="button"
                                value="Add Passport"
                                className="btn btn-primary"
                                onClick={this.onPassportAdd}
                            />
                        </div>
                    </div>
                    <div
                        className="search-result-section"
                        hidden={this.state.hideSearchResult}
                    >
                        <div>
                            <Link
                                to={this.state.passportLink}
                                className="passport-select">
                                <div className="passport-search-result">
                                    <div>
                                        <h5 className="passport-select">{this.state.passportHolderFirstName} {this.state.passportHolderLastName}</h5>
                                        <span>{this.state.nationality}</span>
                                    </div>
                                    <h5>Select</h5>
                                </div>
                            </Link>
                        </div>
                    </div >
                    <div className="search-cancel-button"
                        hidden={this.state.hideCancelButton}
                    >
                        <input
                            type="button"
                            value="Cancel"
                            className="btn btn-primary"
                            onClick={this.onClickCancelSearch}
                        />
                    </div>
                </div >
            )
        } else {
            return <Redirect to="/login" />
        }

    }
}

