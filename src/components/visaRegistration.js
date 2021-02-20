import React from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"
import { Redirect } from 'react-router-dom';


class VisaEntry extends React.Component {

    constructor(props) {
        super(props)

        this.onChangeCountry = this.onChangeCountry.bind(this)
        this.onChangeVisa = this.onChangeVisa.bind(this)
        this.onChangeRequestDate = this.onChangeRequestDate.bind(this)
        this.onChangeStatus = this.onChangeStatus.bind(this)
        this.onChangeUID = this.onChangeUID.bind(this)
        this.onChangeGuarantorName = this.onChangeGuarantorName.bind(this)
        this.onChangeGuarantorContactNumber = this.onChangeGuarantorContactNumber.bind(this)
        this.onChangeGuarantorDescription = this.onChangeGuarantorDescription.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            countries: [],
            selectedCountry: '',
            hideVisaSection: true,
            visas: [],
            selectedVisa: '',
            requestDate: '',
            statuses: [
                "Processing",
                "Approved",
                "Declined"
            ],
            selectedStatus: "Processing",
            disableSubmiit: false,
            hideUID: true,
            UID: '',
            redirectToPassport: false,
            hideSuccessMessage: true,
            guarantorName: '',
            guarantorNumber: '',
            guarantorDescription: ''
        }
    }

    componentDidMount() {
        axios.get('https://dubatravels.herokuapp.com/passport/' + this.props.match.params.id, {
            headers: {
                "x-auth-token": window.localStorage.getItem('token')
            }
        })
            .then(response => {
                // console.log(response)
                if (response.data) {

                    axios.post('https://dubatravels.herokuapp.com/visa/countries', null)
                        .then(response => {
                            this.setState({
                                countries: response.data
                            })
                        })
                }
            })
            .catch(err => {

                return;
            })

        // this.setState({
        //     selectedVisa: ''
        // })
    }

    onChangeCountry(e) {
        this.setState({
            selectedCountry: e.target.value,
            selectedVisa: ''
        })

        axios.post('https://dubatravels.herokuapp.com/visa/countries', {
            countryName: e.target.value
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        visas: response.data,
                        hideVisaSection: false,
                        selectedVisa: response.data[0].validity
                    })
                } else {
                    this.setState({
                        visas: [],
                        hideVisaSection: true,
                        selectedVisa: ''
                    })
                }
            })


    }

    onChangeVisa(e) {
        this.setState({
            selectedVisa: e.target.value
        })
    }

    onChangeStatus(e) {
        this.setState({
            selectedStatus: e.target.value
        })

        if (e.target.value === "Approved") {
            this.setState({
                hideUID: false
            })

        } else {
            this.setState({
                hideUID: true
            })
        }
    }

    onChangeRequestDate(e) {
        // console.log(e.target.value)
        this.setState({
            requestDate: e.target.value
        })
    }

    onChangeUID(e) {
        this.setState({
            UID: e.target.value
        })
    }

    onChangeGuarantorName(e) {
        this.setState({
            guarantorName: e.target.value
        })
    }
    onChangeGuarantorContactNumber(e) {
        this.setState({
            guarantorNumber: e.target.value
        })
    }
    onChangeGuarantorDescription(e) {
        this.setState({
            guarantorDescription: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            disableSubmiit: true
        })
        axios.get('https://dubatravels.herokuapp.com/passport/' + this.props.match.params.id, {
            headers: {
                "x-auth-token": window.localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data) {
                    const { findPassport } = response.data
                    const { passportNumber } = findPassport

                    const newVisa = {
                        visaCountry: this.state.selectedCountry,
                        visaDuration: this.state.selectedVisa,
                        status: this.state.selectedStatus,
                        requestDate: new Date(this.state.requestDate),
                        UID: this.state.UID,
                        passportNumber,
                        lastUpdate: new Date(),
                        guarantorName: this.state.guarantorName,
                        guarantorNumber: this.state.guarantorNumber,
                        guarantorDescription: this.state.guarantorDescription,
                    }

                    axios.post('https://dubatravels.herokuapp.com/visa/visaAdd', newVisa, {
                        headers: {
                            "x-auth-token": window.localStorage.getItem('token')
                        }
                    })
                        .then(response => {
                            if (response.data) {
                                this.setState({
                                    hideSuccessMessage: false,
                                })
                                setTimeout(() => {
                                    this.setState({
                                        redirectToPassport: true
                                    })
                                }, 2000);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {

        if (this.state.redirectToPassport) {
            return <Redirect to={`/passport/${this.props.match.params.id}`} />
        }

        return (
            <div>
                <div className="page-heading-container">
                    <h3>
                        Visa
                    </h3>
                </div>
                <form
                    onSubmit={this.onSubmit}
                >
                    <div className="form-group">
                        <label>Country*</label>
                        <select
                            className="form-control"
                            required
                            onChange={this.onChangeCountry}
                            value={this.state.selectedCountry}
                        >
                            {
                                this.state.countries.map(country => {
                                    return <option
                                        key={country.countryName}
                                        value={country.countryName}
                                    >
                                        {country.countryName}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div
                        hidden={this.state.hideVisaSection}
                    >
                        <div className="form-group">
                            <label>Visa*</label>
                            <select
                                className="form-control"
                                required
                                autoFocus
                                onChange={this.onChangeVisa}
                                value={this.state.selectedVisa}
                            >
                                {
                                    this.state.visas.map(visa => {
                                        return <option
                                            key={visa.visaName}
                                            value={visa.validity}
                                        >
                                            {visa.visaName}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                className="form-control"
                                onChange={this.onChangeStatus}
                                value={this.state.selectedStatus}
                            >
                                {
                                    this.state.statuses.map(status => {
                                        return <option
                                            key={status}
                                            value={status}
                                        >
                                            {status}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Request Date*</label>
                            <input
                                className="form-control"
                                type="date"
                                required
                                value={this.state.requestDate}
                                onChange={this.onChangeRequestDate}
                            />
                        </div>
                        <div hidden={this.state.hideUID} className="form-group">
                            <label>UID*</label>
                            <input
                                className="form-control"
                                type="number"
                                value={this.state.UID}
                                onChange={this.onChangeUID}
                            />
                        </div>
                        <div>
                            <div>
                                <label>Guarantor Name*</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    required
                                    value={this.state.guarantorName}
                                    onChange={this.onChangeGuarantorName}
                                />
                            </div>
                            <div>
                                <label>Guarantor Contact Number*</label>
                                <input
                                    className="form-control"
                                    type="tel"
                                    required
                                    value={this.state.guarantorNumber}
                                    onChange={this.onChangeGuarantorContactNumber}
                                />
                            </div>
                            <div>
                                <label>Guarantor Description</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={this.state.guarantorDescription}
                                    onChange={this.onChangeGuarantorDescription}
                                />
                            </div>
                        </div>
                        <input type="submit" disabled={this.state.disableSubmiit} value="Add Visa" className="btn btn-primary" />
                    </div>
                </form>
                <div
                    hidden={this.state.hideSuccessMessage}
                    className="success-message"
                >
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                        <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm7 7.457l-9.005 9.565-4.995-5.865.761-.649 4.271 5.016 8.24-8.752.728.685z" />
                    </svg>
                    <label>Success!</label>
                </div>
            </div>
        )
    }
}

export default VisaEntry;