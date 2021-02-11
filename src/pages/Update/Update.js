import axios from 'axios'
import React, { Component } from 'react'

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
            passportNumber: '',
            approveDate: '',
            activeDate: '',
            declineDate: '',
            hideApproveDate: true,
            hideDeclineDate: true,
            hideActiveDate: true,
            lockUID: true,
            hideUID: true,
            UID: ''
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
                    console.log(response.data)

                    this.setState({
                        passportNumber: response.data.passportNumber,
                        selectedStatus: response.data.visaStatus
                    })

                    if (response.data.visaUID) {
                        this.setState({
                            lockUID: true
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
            selectedStatus: e.target.value
        })

        if (e.target.value === "Approved") {
            this.setState({
                hideApproveDate: false,
                hideDeclineDate: true,
                hideActiveDate: true,
                hideUID: false
            })
        } else if (e.target.value === "Active") {
            this.setState({
                hideApproveDate: true,
                hideDeclineDate: true,
                hideActiveDate: false,
                hideUID: false
            })
        } else if (e.target.value === "Declined") {
            this.setState({
                hideApproveDate: true,
                hideDeclineDate: false,
                hideActiveDate: true,
                hideUID: true
            })
        } else {
            this.setState({
                hideApproveDate: true,
                hideDeclineDate: true,
                hideActiveDate: true,
                hideUID: true
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

    }

    render() {
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
                        <label>UID</label>
                        <input
                            type="text"
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
                            <label>Aproval Date</label>
                            <input
                                type="date"
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
                            <label>Active Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={this.state.activeDate}
                                onChange={this.onChangeActiveDate}
                            />
                        </div>
                    </div>
                    <div
                        hidden={this.state.hideDeclineDate}
                    >
                        <div className="form-group">
                            <label>Decline Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={this.state.declineDate}
                                onChange={this.onChangeDeclineDate}
                            />
                        </div>
                    </div>
                    <input type="submit" value="Update" className="btn btn-primary" />
                </form>
            </div>
        )
    }
}
