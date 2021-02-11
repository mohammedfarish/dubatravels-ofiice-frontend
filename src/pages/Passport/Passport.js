import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css"

import './passport.css'

// import Visa from './Visas'

class Passport extends React.Component {

    constructor(props) {
        super(props)

        this.onClickUnregistered = this.onClickUnregistered.bind(this)
        this.onClickAddVisa = this.onClickAddVisa.bind(this)
        this.visaList = this.visaList.bind(this)

        this.state = {
            passportNumber: '',
            firstName: '',
            secondName: '',
            lastName: '',
            dateOfBirth: '',
            dateOfExpiry: '',
            nationality: '',
            smartServices: '',
            smartServicesUnregistered: false,
            smartServicesRegistrationNumber: '',
            showRegistrationNumber: false,
            mobileNumbers: [],
            forwardToHome: false,
            redirectToVisaAdd: false,
            passportId: '',
            visas: []
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id

        axios.get('https://dubatravels.herokuapp.com/passport/' + id, {
            headers: {
                "x-auth-token": window.localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data) {
                    const {
                        _id,
                        passportHolderFirstName,
                        passportHolderSecondName,
                        passportHolderLastName,
                        dateOfBirth,
                        dateOfExpiry,
                        nationality,
                        passportHolderMobileNumber,
                        passportNumber
                        // entryBy
                    } = response.data.findPassport
                    this.setState({
                        firstName: passportHolderFirstName,
                        secondName: passportHolderSecondName || '-',
                        lastName: passportHolderLastName,
                        dateOfBirth,
                        dateOfExpiry,
                        nationality,
                        mobileNumbers: passportHolderMobileNumber || '-',
                        passportNumber,
                        passportId: _id
                    })

                    if (response.data.unregistered) {
                        this.setState({
                            smartServices: 'Unregistered',
                            smartServicesUnregistered: true,
                            smartServicesRegistrationNumber: response.data.unregistered.OTP
                        })

                        this.checkRegistration = setInterval(() => {
                            axios.post('https://dubatravels.herokuapp.com/passport/registration', {
                                passportNumber: passportNumber
                            })
                                .then(response => {
                                    if (!response.data) {
                                        clearTimeout(this.showRegNumber)
                                        this.setState({
                                            smartServices: 'Registered',
                                            smartServicesUnregistered: false,
                                            smartServicesRegistrationNumber: ''
                                        })
                                        clearInterval(this.checkRegistration)
                                    }
                                })
                                .catch(() => {
                                    return;
                                })
                        }, 1000 * 5);
                    } else {
                        this.setState({
                            smartServices: 'Registered',
                        })
                    }

                    axios.get('https://dubatravels.herokuapp.com/visa/' + passportNumber, {
                        headers: {
                            "x-auth-token": window.localStorage.getItem('token')
                        }
                    })
                        .then(response => {
                            if (response.data[0]._id) {
                                this.setState({
                                    visas: response.data
                                })
                            } else {
                                this.setState({
                                    visas: []
                                })

                            }
                        })
                        .catch(() => {
                            this.setState({
                                visas: []
                            })
                        })

                }
            })
            .catch(() => {
                this.setState({
                    forwardToHome: true
                })
            })
    }

    componentWillUnmount() {
        clearInterval(this.checkRegistration)
    }

    onClickUnregistered() {

        if (this.state.smartServicesUnregistered) {
            if (this.state.showRegistrationNumber) {

                this.setState({
                    smartServices: 'Unregistered',
                    showRegistrationNumber: false
                })
                clearTimeout(this.showRegNumber)
            } else {
                this.setState({
                    smartServices: this.state.smartServicesRegistrationNumber,
                    showRegistrationNumber: true
                })
                this.showRegNumber = setTimeout(() => {
                    this.setState({
                        smartServices: 'Unregistered',
                        showRegistrationNumber: false
                    })
                }, 1000 * 10);
            }
        }

    }

    onClickAddVisa() {
        this.setState({
            redirectToVisaAdd: true
        })
    }

    visaList() {
        return this.state.visas.map(visa => {
            return visa
        })
    }

    render() {
        if (this.state.redirectToVisaAdd) {
            return <Redirect to={`/visa/add/${this.state.passportId}`} />
        }
        if (this.state.forwardToHome) {
            return <Redirect to="/" />
        }

        return (
            <div className="passport-page">
                <div className="page-heading-container">
                    <h3>
                        {this.state.firstName} {this.state.lastName}
                    </h3>
                    <span>{new Date().getFullYear() - new Date(this.state.dateOfBirth).getFullYear()} Years Old</span>
                </div>
                <div className="passport-details">
                    <div className="detail">
                        <label className="passport-label">Passport Number</label>
                        <p>{this.state.passportNumber}</p>
                    </div>
                    <div className="detail">
                        <label className="passport-label">First Name</label>
                        <p>{this.state.firstName}</p>
                    </div>
                    <div className="detail">
                        <label className="passport-label">Second Name</label>
                        <p>{this.state.secondName}</p>
                    </div>
                    <div className="detail">
                        <label className="passport-label">Last Name</label>
                        <p>{this.state.lastName}</p>
                    </div>
                    <div className="detail">
                        <label className="passport-label">Date of Birth</label>
                        <p>{new Date(this.state.dateOfBirth).getDate()}/{new Date(this.state.dateOfBirth).getMonth()}/{new Date(this.state.dateOfBirth).getFullYear()}</p>
                    </div>
                    <div className="detail">
                        <label className="passport-label">Date of Expiry</label>
                        <p>{new Date(this.state.dateOfExpiry).getDate()}/{new Date(this.state.dateOfExpiry).getMonth()}/{new Date(this.state.dateOfExpiry).getFullYear()}</p>
                    </div>
                    <div className="detail">
                        <label className="passport-label">Smart Service</label>
                        <p
                            style={{ cursor: 'pointer' }}
                            onClick={this.onClickUnregistered}
                        >{this.state.smartServices}</p>
                    </div>
                    <div className="detail">
                        <label className="passport-label">Mobile Number</label>
                        {
                            this.state.mobileNumbers.map(number => {
                                return <span
                                    key={number}
                                    onClick={() => {
                                        window.location = "tel:+" + number
                                    }}
                                >
                                    {number}
                                </span>
                            })
                        }
                    </div>
                </div>
                <div>
                    <div className="page-heading-container">
                        <h3>
                            Visa
                        </h3>
                    </div>
                    <div>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>Country</th>
                                    <th>Duration</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.visas.map(visa => {
                                        return (
                                            <tr
                                                key={visa._id}
                                            >
                                                <td>{visa.visaCountry}</td>
                                                <td>{visa.visaDuration} Days</td>
                                                <td>{visa.visaStatus}</td>
                                                <td>
                                                    Update
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                {/* <Visa
                                
                                /> */}
                            </tbody>
                        </table>
                    </div>
                    <div className="visa-add-button">
                        <input
                            type="button"
                            value="Add Visa"
                            className="btn btn-primary"
                            onClick={this.onClickAddVisa}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Passport;