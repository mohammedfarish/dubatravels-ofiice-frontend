import axios from 'axios'
import React, { Component } from 'react'

import './visa.css'

export default class Visa extends Component {

    constructor(props) {
        super(props)

        this.onSelectCountry = this.onSelectCountry.bind(this)
        this.onChangeVisaName = this.onChangeVisaName.bind(this)
        this.onChangeVisaValidity = this.onChangeVisaValidity.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            countries: [],
            selecedCountry: '',
            hideVisaDetailsSection: true,
            visaName: '',
            visaValidity: '',
            hideSuccessMessage: true,
        }
    }

    componentDidMount() {
        axios.post('https://dubatravels.herokuapp.com/visa/countries', null)
            .then(response => {
                this.setState({
                    countries: response.data
                })
            })
            .catch(() => {
                return;
            })
    }

    onSelectCountry(e) {
        this.setState({
            selecedCountry: e.target.value,
            hideVisaDetailsSection: false,
            visaName: '',
            visaValidity: '',
            hideSuccessMessage: true
        })
    }

    onChangeVisaName(e) {
        this.setState({
            visaName: e.target.value,
            hideSuccessMessage: true
        })
    }
    onChangeVisaValidity(e) {
        this.setState({
            visaValidity: e.target.value,
            hideSuccessMessage: true
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const newVisa = {
            countryName: this.state.selecedCountry,
            visa: {
                visaName: this.state.visaName,
                validity: this.state.visaValidity
            }
        }
        axios.post('https://dubatravels.herokuapp.com/visa/countries', newVisa)
            .then(response => {
                if (response.data) {
                    this.setState({
                        selecedCountry: e.target.value,
                        visaName: '',
                        visaValidity: '',
                        hideSuccessMessage: false
                    })
                }
            })

    }

    render() {
        return (
            <div>
                <div className="page-heading-container">
                    <h3>Add Visa</h3>
                </div>
                <div>
                    <form>
                        <div className="form-group">
                            <label>Country*</label>
                            <select
                                className="form-control"
                                required
                                value={this.state.selecedCountry}
                                onChange={this.onSelectCountry}
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
                    </form>
                </div>
                <div hidden={this.state.hideVisaDetailsSection}>
                    <form
                        onSubmit={this.onSubmit}
                    >
                        <div className="form-group">
                            <label>Visa Name*</label>
                            <input
                                className="form-control"
                                type="text"
                                required
                                value={this.state.visaName}
                                onChange={this.onChangeVisaName}
                            />
                        </div>
                        <div className="form-group">
                            <label>Days Valid*</label>
                            <input
                                className="form-control"
                                type="number"
                                required
                                min="1"
                                value={this.state.visaValidity}
                                onChange={this.onChangeVisaValidity}
                            />
                        </div>
                        <input type="submit" value="Add Visa" className="btn btn-primary" />
                    </form>
                </div>
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
