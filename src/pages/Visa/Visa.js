import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import VisaSVG from '../../images/document.svg'
export default class Visa extends Component {
    constructor(props) {
        super(props)

        this.onClickUpdate = this.onClickUpdate.bind(this)

        this.state = {
            visaUID: '',
            visaCountry: '',
            passportNumber: '',
            visaStatus: '',
            visaDuration: '',
            guarantorName: '',
            guarantorNumber: '',
            guarantorDescription: '',
            redirectToVisaUpdate: false,
            hideVisa: true,
            hideLoading: false
        }
    }

    componentDidMount() {
        setTimeout(() => {

            axios.get('https://dubatravels.herokuapp.com/visa/fetch/' + this.props.match.params.id, {
                headers: {
                    "x-auth-token": window.localStorage.getItem('token')
                }
            })
                .then(response => {
                    // console.log(response.data)
                    this.setState({
                        visaUID: response.data.visaUID || "Not obtained",
                        visaCountry: response.data.visaCountry,
                        passportNumber: response.data.passportNumber,
                        visaStatus: response.data.visaStatus,
                        visaDuration: response.data.visaDuration,
                    })
                    axios.post('https://dubatravels.herokuapp.com/visa/guarantor', {
                        guarantorId: response.data.guarantorId
                    }, {
                        headers: {
                            "x-auth-token": window.localStorage.getItem('token')
                        }
                    }).then(response => {
                        this.setState({
                            guarantorName: response.data.name,
                            guarantorNumber: response.data.contactNumber,
                            guarantorDescription: response.data.description,
                            hideVisa: false,
                            hideLoading: true
                        })
                    })
                })
        }, 2000);
    }

    onClickUpdate() {
        this.setState({
            redirectToVisaUpdate: true
        })
    }

    render() {
        if (this.state.redirectToVisaUpdate) {
            return <Redirect to={`/visa/update/${this.props.match.params.id}`} />
        }
        return (
            <div className="">
                <div className="page-loading" hidden={this.state.hideLoading}>
                    <img src={VisaSVG} alt="loading" width="100vw" />
                    <br />
                    <br />
                    <br />
                    <h4>
                        Loading Visa
                    </h4>
                </div>
                <div
                    hidden={this.state.hideVisa}
                >
                    <div className="page-heading-container">
                        <h3>
                            Visa Details
                    </h3>
                    </div>
                    <div className="passport-details">
                        <div className="detail">
                            <label className="passport-label">Visa Country</label>
                            <p>{this.state.visaCountry}</p>
                        </div>
                        <div className="detail">
                            <label className="passport-label">Visa UID</label>
                            <p>{this.state.visaUID}</p>
                        </div>
                        <div className="detail">
                            <label className="passport-label">Status</label>
                            <p>{this.state.visaStatus}</p>
                        </div>
                        <div className="detail">
                            <label className="passport-label">Valifity</label>
                            <p>{this.state.visaDuration} Days</p>
                        </div>
                        <div className="detail">
                            <label className="passport-label">Passport Number</label>
                            <p>{this.state.passportNumber}</p>
                        </div>
                        <div className="detail">
                            <label className="passport-label">Guarantor Name</label>
                            <p>{this.state.guarantorName}</p>
                        </div>
                        <div className="detail">
                            <label className="passport-label">Guarantor Contact Number</label>
                            <p
                                onClick={() => {
                                    window.location = `tel:${this.state.guarantorNumber}`
                                }}
                            >{this.state.guarantorNumber}</p>
                        </div>
                        <div className="detail">
                            <label className="passport-label">Guarantor Description</label>
                            <p>{this.state.guarantorDescription}</p>
                        </div>
                        <div className="visa-add-button">
                            <input
                                type="button"
                                value="Update"
                                className="btn btn-primary"
                                onClick={this.onClickUpdate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
