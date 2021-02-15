import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class Update extends Component {
    constructor(props) {
        super(props)

        this.onChangeStatus = this.onChangeStatus.bind(this)
        this.onChangeActiveDate = this.onChangeActiveDate.bind(this)
        this.onChangeApprovalDate = this.onChangeApprovalDate.bind(this)
        this.onChangeDeclineDate = this.onChangeDeclineDate.bind(this)
        this.onChangeUID = this.onChangeUID.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            statuses: [
                "Processing",
                "Approved",
                "Active",
                "Declined"
            ],
            selectedStatus: '',
            defaulStatus: '',
            passportNumber: '',
            approveDate: '',
            activeDate: '',
            declineDate: '',
            hideApproveDate: true,
            hideDeclineDate: true,
            hideActiveDate: true,
            lockUID: true,
            hideUID: true,
            UID: '',
            approveDateRequired: false,
            activeDateRequired: false,
            declineDateRequired: false,
            UIDRequired: false,
            warningMessage: '',
            redirectBackToPassport: false,
            passportLink: ''
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.post("https://dubatravels.herokuapp.com/visa/update/" + id, null, {
            headers: {
                "x-auth-token": window.localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data) {
                    // console.log(response.data)

                    this.setState({
                        passportNumber: response.data.passportNumber,
                        selectedStatus: response.data.visaStatus,
                        defaulStatus: response.data.visaStatus,
                    })

                    if (response.data.visaUID) {
                        this.setState({
                            lockUID: true,
                            hideUID: false,
                            UID: response.data.visaUID
                        })
                    } else {
                        this.setState({
                            lockUID: false
                        })

                    }
                }
            })
    }

    onChangeStatus(e) {

        this.setState({
            selectedStatus: e.target.value,
            warningMessage: ''
        })

        if (e.target.value === "Approved") {
            this.setState({
                hideApproveDate: false,
                hideDeclineDate: true,
                hideActiveDate: true,
                hideUID: false,
                approveDateRequired: true,
                activeDateRequired: false,
                declineDateRequired: false,
                UIDRequired: true
            })
        } else if (e.target.value === "Active") {
            this.setState({
                hideApproveDate: true,
                hideDeclineDate: true,
                hideActiveDate: false,
                hideUID: false,
                approveDateRequired: false,
                activeDateRequired: true,
                declineDateRequired: false,
                UIDRequired: true
            })
        } else if (e.target.value === "Declined") {
            this.setState({
                hideApproveDate: true,
                hideDeclineDate: false,
                hideActiveDate: true,
                hideUID: true,
                approveDateRequired: false,
                activeDateRequired: false,
                declineDateRequired: true,
                UIDRequired: false
            })
        } else {
            this.setState({
                hideApproveDate: true,
                hideDeclineDate: true,
                hideActiveDate: true,
                hideUID: true,
                approveDateRequired: false,
                activeDateRequired: false,
                declineDateRequired: false,
                UIDRequired: false
            })
        }

    }

    onChangeActiveDate(e) {
        this.setState({
            activeDate: e.target.value
        })
    }

    onChangeDeclineDate(e) {
        this.setState({
            declineDate: e.target.value
        })
    }

    onChangeApprovalDate(e) {
        this.setState({
            approveDate: e.target.value
        })
    }

    onChangeUID(e) {
        this.setState({
            UID: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.selectedStatus !== this.state.defaulStatus) {
            const newUpdate = {
                status: this.state.selectedStatus,
                passportNumber: this.state.passportNumber,
                approveDate: new Date(this.state.approveDate),
                activeDate: new Date(this.state.activeDate),
                declineDate: new Date(this.state.declineDate),
                UID: this.state.UID,
                visaId: this.props.match.params.id,
                lastUpdate: new Date()
            }

            axios.post('https://dubatravels.herokuapp.com/visa/update/' + this.props.match.params.id, newUpdate, {
                headers: {
                    "x-auth-token": window.localStorage.getItem('token')
                }
            })
                .then(response => {
                    if (response.data) {
                        // console.log(response.data)
                        axios.post(`https://dubatravels.herokuapp.com/passport/search`, { passportNumber: newUpdate.passportNumber }, {
                            headers: {
                                "x-auth-token": window.localStorage.getItem('token')
                            }
                        }).then(response => {
                            if (response.data) {
                                this.setState({
                                    passportLink: response.data._id,
                                    redirectBackToPassport: true,
                                })
                            }
                        })
                    }
                })
        } else {

            return this.setState({
                warningMessage: 'Status has not changed.'
            })
        }

    }

    render() {

        if (this.state.redirectBackToPassport) {
            return <Redirect to={`/passport/${this.state.passportLink}`} />
        }

        return (
            <div>
                <div className="page-heading-container">
                    <h3>
                        Update Visa
                    </h3>
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
                        <label>Visa Status</label>
                        <select
                            className="form-control"
                            value={this.state.selectedStatus}
                            onChange={this.onChangeStatus}
                        >
                            {
                                this.state.statuses.map(status => {
                                    return <option
                                        key={status}
                                        value={status}>
                                        {status}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div hidden={this.state.hideUID} className="form-group">
                        <label>UID*</label>
                        <input
                            type="text"
                            required={this.state.UIDRequired}
                            readOnly={this.state.lockUID}
                            className="form-control"
                            value={this.state.UID}
                            onChange={this.onChangeUID}
                        />
                    </div>
                    <div
                        hidden={this.state.hideApproveDate}
                    >
                        <div className="form-group">
                            <label>Aproval Date*</label>
                            <input
                                type="date"
                                required={this.state.approveDateRequired}
                                className="form-control"
                                value={this.state.approveDate}
                                onChange={this.onChangeApprovalDate}
                            />
                        </div>
                    </div>
                    <div
                        hidden={this.state.hideActiveDate}
                    >
                        <div className="form-group">
                            <label>Active Date*</label>
                            <input
                                type="date"
                                className="form-control"
                                required={this.state.activeDateRequired}
                                value={this.state.activeDate}
                                onChange={this.onChangeActiveDate}
                            />
                        </div>
                    </div>
                    <div
                        hidden={this.state.hideDeclineDate}
                    >
                        <div className="form-group">
                            <label>Decline Date*</label>
                            <input
                                type="date"
                                className="form-control"
                                required={this.state.declineDateRequired}
                                value={this.state.declineDate}
                                onChange={this.onChangeDeclineDate}
                            />
                        </div>
                    </div>
                    <input type="submit" value="Update" className="btn btn-primary" />
                </form>
                <span>{this.state.warningMessage}</span>
            </div>
        )
    }
}
