import React, { Component } from 'react'
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css"
import { Redirect } from 'react-router-dom';


export default class AddPassport extends Component {
    constructor(props) {
        super(props)

        this.onChangeFirstName = this.onChangeFirstName.bind(this)
        this.onChangeSecondName = this.onChangeSecondName.bind(this)
        this.onChangeLastName = this.onChangeLastName.bind(this)
        this.onChangeDateOfExpiry = this.onChangeDateOfExpiry.bind(this)
        this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this)
        this.onChangeNationality = this.onChangeNationality.bind(this)
        this.redirectToPassport = this.redirectToPassport.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            passportNumber: '',
            firstName: '',
            secondName: '',
            lastName: '',
            dateOfExpiry: '',
            dateOfBirth: '',
            nationality: '',
            nationalityList: [],
            redirectToPassport: false,
            passportLink: '',
            lockAllFields: false,
            hideNextSectionButtons: true,
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        if (id) {

            this.setState({
                passportNumber: id,
                nationalityList: [
                    "",
                    "Afghan",
                    "Albanian",
                    "Algerian",
                    "American",
                    "Andorran",
                    "Angolan",
                    "Antiguans",
                    "Argentinean",
                    "Armenian",
                    "Australian",
                    "Austrian",
                    "Azerbaijani",
                    "Bahamian",
                    "Bahraini",
                    "Bangladeshi",
                    "Barbadian",
                    "Barbudans",
                    "Batswana",
                    "Belarusian",
                    "Belgian",
                    "Belizean",
                    "Beninese",
                    "Bhutanese",
                    "Bolivian",
                    "Bosnian",
                    "Brazilian",
                    "British",
                    "Bruneian",
                    "Bulgarian",
                    "Burkinabe",
                    "Burmese",
                    "Burundian",
                    "Cambodian",
                    "Cameroonian",
                    "Canadian",
                    "Cape Verdean",
                    "Central African",
                    "Chadian",
                    "Chilean",
                    "Chinese",
                    "Colombian",
                    "Comoran",
                    "Congolese",
                    "Costa Rican",
                    "Croatian",
                    "Cuban",
                    "Cypriot",
                    "Czech",
                    "Danish",
                    "Djibouti",
                    "Dominican",
                    "Dutch",
                    "East Timorese",
                    "Ecuadorean",
                    "Egyptian",
                    "Emirian",
                    "Equatorial Guinean",
                    "Eritrean",
                    "Estonian",
                    "Ethiopian",
                    "Fijian",
                    "Filipino",
                    "Finnish",
                    "French",
                    "Gabonese",
                    "Gambian",
                    "Georgian",
                    "German",
                    "Ghanaian",
                    "Greek",
                    "Grenadian",
                    "Guatemalan",
                    "Guinea-Bissauan",
                    "Guinean",
                    "Guyanese",
                    "Haitian",
                    "Herzegovinian",
                    "Honduran",
                    "Hungarian",
                    "I-Kiribati",
                    "Icelander",
                    "Indian",
                    "Indonesian",
                    "Iranian",
                    "Iraqi",
                    "Irish",
                    "Israeli",
                    "Italian",
                    "Ivorian",
                    "Jamaican",
                    "Japanese",
                    "Jordanian",
                    "Kazakhstani",
                    "Kenyan",
                    "Kittian and Nevisian",
                    "Kuwaiti",
                    "Kyrgyz",
                    "Laotian",
                    "Latvian",
                    "Lebanese",
                    "Liberian",
                    "Libyan",
                    "Liechtensteiner",
                    "Lithuanian",
                    "Luxembourger",
                    "Macedonian",
                    "Malagasy",
                    "Malawian",
                    "Malaysian",
                    "Maldivan",
                    "Malian",
                    "Maltese",
                    "Marshallese",
                    "Mauritanian",
                    "Mauritian",
                    "Mexican",
                    "Micronesian",
                    "Moldovan",
                    "Monacan",
                    "Mongolian",
                    "Moroccan",
                    "Mosotho",
                    "Motswana",
                    "Mozambican",
                    "Namibian",
                    "Nauruan",
                    "Nepalese",
                    "New Zealander",
                    "Nicaraguan",
                    "Nigerian",
                    "Nigerien",
                    "North Korean",
                    "Northern Irish",
                    "Norwegian",
                    "Omani",
                    "Pakistani",
                    "Palauan",
                    "Panamanian",
                    "Papua New Guinean",
                    "Paraguayan",
                    "Peruvian",
                    "Polish",
                    "Portuguese",
                    "Qatari",
                    "Romanian",
                    "Russian",
                    "Rwandan",
                    "Saint Lucian",
                    "Salvadoran",
                    "Samoan",
                    "San Marinese",
                    "Sao Tomean",
                    "Saudi",
                    "Scottish",
                    "Senegalese",
                    "Serbian",
                    "Seychellois",
                    "Sierra Leonean",
                    "Singaporean",
                    "Slovakian",
                    "Slovenian",
                    "Solomon Islander",
                    "Somali",
                    "South African",
                    "South Korean",
                    "Spanish",
                    "Sri Lankan",
                    "Sudanese",
                    "Surinamer",
                    "Swazi",
                    "Swedish",
                    "Swiss",
                    "Syrian",
                    "Taiwanese",
                    "Tajik",
                    "Tanzanian",
                    "Thai",
                    "Togolese",
                    "Tongan",
                    "Trinidadian or Tobagonian",
                    "Tunisian",
                    "Turkish",
                    "Tuvaluan",
                    "Ugandan",
                    "Ukrainian",
                    "Uruguayan",
                    "Uzbekistani",
                    "Venezuelan",
                    "Vietnamese",
                    "Welsh",
                    "Yemenite",
                    "Zambian",
                    "Zimbabwean"
                ]
            })

        } else {
            window.location = "/"
        }

    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }
    onChangeSecondName(e) {
        this.setState({
            secondName: e.target.value
        })
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }

    onChangeDateOfExpiry(e) {
        this.setState({
            dateOfExpiry: e.target.value
        })
    }
    onChangeDateOfBirth(e) {
        this.setState({
            dateOfBirth: e.target.value
        })
    }

    onChangeNationality(e) {
        this.setState({
            nationality: e.target.value
        })
    }

    redirectToPassport() {
        this.setState({
            redirectToPassport: true
        })
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            lockAllFields: true
        })
        const token = window.localStorage.getItem("token")
        const session_token = window.sessionStorage.getItem('session_token')
        if (token) {
            axios.post('https://dubatravels.herokuapp.com/user/verify', null, {
                headers: {
                    "x-auth-token": token,
                }
            })
                .then(response => {
                    // console.log(response.data)
                    if (response.data) {

                        axios.get('https://dubatravels.herokuapp.com/user/', {
                            headers: {
                                "x-auth-token": token,
                                "session_token": session_token
                            }
                        })
                            .then(response => {
                                const passport = {
                                    passportNumber: this.state.passportNumber,
                                    firstName: this.state.firstName,
                                    secondName: this.state.secondName,
                                    lastName: this.state.lastName,
                                    nationality: this.state.nationality,
                                    dateOfExpiry: new Date(this.state.dateOfExpiry),
                                    dateOfBirth: new Date(this.state.dateOfBirth),
                                    entryBy: response.data._id
                                }

                                axios.post("https://dubatravels.herokuapp.com/passport/add", passport, {
                                    headers: {
                                        'x-auth-token': window.localStorage.getItem('token')
                                    }
                                })
                                    .then(response => {
                                        if (response.data) {
                                            this.setState({
                                                passportLink: `/passport/${response.data.fetchPassport}`
                                            })

                                            setTimeout(() => {
                                                this.setState({
                                                    redirectToPassport: true
                                                })
                                            }, 2000);
                                        }
                                    })
                                    .catch(() => {
                                        return;
                                    })

                            })

                    }
                })
        }



    }

    render() {

        if (this.state.redirectToPassport) {
            return <Redirect to={this.state.passportLink} />
        }

        return (
            <div>
                <div className="page-heading-container">
                    <h1>
                        Add New Passport
                    </h1>
                </div>
                <form
                    onSubmit={this.onSubmit}
                >
                    <div className="form-group">
                        <label>Passport Number</label>
                        <input
                            type="text"
                            readOnly
                            required
                            className="form-control"
                            value={this.state.passportNumber}
                        />
                    </div>
                    <div className="form-group">
                        <label>First Name*</label>
                        <input
                            readOnly={this.state.lockAllFields}
                            autoFocus
                            autoCorrect="false"
                            autoComplete="false"
                            type="text"
                            required
                            className="form-control"
                            placeholder="eg: John"
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Second Name</label>
                        <input
                            readOnly={this.state.lockAllFields}
                            autoCorrect="false"
                            autoComplete="false"
                            type="text"
                            className="form-control"
                            placeholder="eg: John"
                            value={this.state.secondName}
                            onChange={this.onChangeSecondName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name*</label>
                        <input
                            readOnly={this.state.lockAllFields}
                            autoCorrect="false"
                            autoComplete="false"
                            type="text"
                            required
                            className="form-control"
                            placeholder="eg: John"
                            value={this.state.lastName}
                            onChange={this.onChangeLastName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Nationality*</label>
                        <select
                            readOnly={this.state.lockAllFields}
                            required
                            className="form-control"
                            onChange={this.onChangeNationality}
                            value={this.state.nationality}
                        >
                            {
                                this.state.nationalityList.map(nationality => {
                                    return <option
                                        key={nationality}
                                        value={nationality}>
                                        {nationality}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date of Birth*</label>
                        <input
                            readOnly={this.state.lockAllFields}
                            autoCorrect="false"
                            autoComplete="false"
                            required
                            type="date"
                            className="form-control"
                            placeholder="eg: 2026"
                            value={this.state.dateOfBirth}
                            onChange={this.onChangeDateOfBirth}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date of Expiry*</label>
                        <input
                            readOnly={this.state.lockAllFields}
                            autoCorrect="false"
                            autoComplete="false"
                            required
                            type="date"
                            className="form-control"
                            placeholder="eg: 2026"
                            value={this.state.dateOfExpiry}
                            onChange={this.onChangeDateOfExpiry}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Passport" disabled={this.state.lockAllFields} className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
