import React from 'react';
import DatePicker from 'react-datepicker'
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"


class PassportEntry extends React.Component {

    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassportNumber = this.onChangePassportNumber.bind(this)
        this.onChangePassportHolderFirstName = this.onChangePassportHolderFirstName.bind(this)
        this.onChangePassportHolderSecondName = this.onChangePassportHolderSecondName.bind(this)
        this.onChangePassportHolderLastName = this.onChangePassportHolderLastName.bind(this)
        this.onchangeYearOfExpiry = this.onchangeYearOfExpiry.bind(this)
        this.onChangeSmartServicesOption = this.onChangeSmartServicesOption.bind(this)
        this.onChangeVisaUID = this.onChangeVisaUID.bind(this)
        this.onChangeVisaStatus = this.onChangeVisaStatus.bind(this)
        this.onChangeVisaDuration = this.onChangeVisaDuration.bind(this)

        this.state = {
            heading: '',
            intent: '',
            passportNumber: '',
            validEntry: '',
            submitButtonText: '',
            buttonInvisibility: '',
            lockPassportField: '',
            passportNotFound: '',
            newPassportFieldHidden: '',
            passportHolderFirstName: '',
            passportHolderSecondName: '',
            passportHolderLastName: '',
            passportYearOfExpiry: '',
            smartServicesOptiIn: '',
            smartServiceOTP: '',
            smartServiceOTPInvisible: '',
            newVisaFieldHidden: '',
            visaUID: '',
            visaStatus: '',
            visaStatuses: [],
            visaDuration: '',
            visaDurationOptions: [],
            visaRequestDate: new Date(),
            visaRequestDateInvisibility: '',
            visaIssueDate: new Date(),
            visaIssueDateInvisibility: '',
            visaDetailsInvisibility: '',
            updateStatus: ''
        }
    }

    componentDidMount() {

        const visaStatusesArray = ["Processing", "Confirmed", "Declined"]
        const visaDurationOptionsArray = ['30 Days', "60 Days", "90 Days"]
        this.setState({
            heading: 'Search Passport',
            intent: 'search',
            validEntry: true,
            submitButtonText: 'Search',
            buttonInvisibility: true,
            lockPassportField: false,
            passportNotFound: false,
            newPassportFieldHidden: true,
            smartServicesOptiIn: 'no',
            smartServiceOTP: '',
            smartServiceOTPInvisible: true,
            newVisaFieldHidden: true,
            visaUID: '',
            visaStatus: visaStatusesArray[0],
            visaStatuses: visaStatusesArray,
            visaDuration: visaDurationOptionsArray[0],
            visaDurationOptions: visaDurationOptionsArray,
            visaDetailsInvisibility: true
        })
    }


    onChangePassportNumber(e) {
        if (e.target.value.length > 4) {
            this.setState({
                buttonInvisibility: false
            })
        } else {
            this.setState({
                buttonInvisibility: true
            })
        }
        this.setState({
            passportNumber: e.target.value
        })
    }
    onChangePassportHolderFirstName(e) {
        this.setState({
            passportHolderFirstName: e.target.value
        })
    }
    onChangePassportHolderSecondName(e) {
        this.setState({
            passportHolderSecondName: e.target.value
        })
    }
    onChangePassportHolderLastName(e) {
        this.setState({
            passportHolderLastName: e.target.value
        })
    }

    onchangeYearOfExpiry(e) {
        this.setState({
            passportYearOfExpiry: e.target.value
        })

    }

    onChangeSmartServicesOption(e) {
        this.setState({
            smartServicesOptiIn: e.target.value
        })
    }

    onChangeVisaStatus(e) {
        this.setState({
            visaStatus: e.target.value
        })
        console.log(e.target.value)
        if (e.target.value === 'Processing') {
            this.setState({
                visaDetailsInvisibility: true,
                visaRequestDateInvisibility: false,
            })
        } else if (e.target.value === 'Confirmed') {
            this.setState({
                visaDetailsInvisibility: false,
                visaRequestDateInvisibility: true,
            })
        } else if (e.target.value === 'Declined') {
            this.setState({
                visaDetailsInvisibility: true,
                visaRequestDateInvisibility: true
            })
        }
    }

    onChangeVisaDuration(e) {
        this.setState({
            visaDuration: e.target.value
        })
    }

    onChangeVisaUID(e) {
        this.setState({
            visaUID: e.target.value
        })
    }

    onChangeVisaRequestDate(date) {
        this.setState({
            visaRequestDate: date
        })
    }

    // ===================================================

    onSubmit(e) {
        e.preventDefault();

        const passport = {
            passportNumber: this.state.passportNumber,
            passportHolderFirstName: this.state.passportHolderFirstName,
            passportHolderSecondName: this.state.passportHolderSecondName,
            passportHolderLastName: this.state.passportHolderLastName,
            yearOfExpiry: this.state.passportYearOfExpiry,
            smartServiceOpt: this.state.smartServicesOptiIn
        }

        const visa = {
            passportNumber: this.state.passportNumber,
            visaStatus: this.state.visaStatus,
            visaDuration: this.state.visaDuration,
            visaRequestDate: this.state.visaRequestDate,
            visaIssueDate: this.state.visaIssueDate,
            visaUID: this.state.visaUID,
            updateStatus: this.state.updateStatus
        }

        // console.log(passport);
        if (passport.passportNumber.length > 4) {

            if (this.state.intent === 'search') {
                axios.post(`http://192.168.1.18:5000/passport/${this.state.intent}`, passport)
                    .then(response => {
                        if (response.data.length > 0) {
                            console.log(response.data)
                            const { passportNumber } = response.data[0]
                            this.setState({
                                validEntry: true,
                                lockPassportField: true,
                                passportNumber: passportNumber,
                                intent: 'visaAdd',
                                newVisaFieldHidden: false,
                                heading: 'Visa Details',
                                updateStatus: 'tba'
                            })

                        } else {

                            this.setState({
                                passportNumber: passport.passportNumber.toUpperCase(),
                                submitButtonText: 'Add Passport',
                                intent: 'add',
                                newPassportFieldHidden: false,
                                heading: 'Add New Passport',
                                lockPassportField: true,
                                updateStatus: ''
                            })

                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }

            if (this.state.intent === 'add') {

                // console.log(this.state.intent)
                axios.post(`http://192.168.1.18:5000/passport/${this.state.intent}`, passport)
                    .then(response => {
                        if (response.data) {

                            let otp,
                                viewOTP

                            if (response.data.otp) {
                                otp = response.data.otp
                                viewOTP = false
                            } else {
                                otp = ''
                                viewOTP = true
                            }

                            this.setState({
                                passportNumber: passport.passportNumber.toUpperCase(),
                                validEntry: true,
                                lockPassportField: true,
                                newPassportFieldHidden: true,
                                heading: 'Visa Details',
                                submitButtonText: 'Confirm',
                                intent: 'visaAdd',
                                smartServiceOTPInvisible: viewOTP,
                                smartServiceOTP: otp,
                                newVisaFieldHidden: false
                            })

                        } else {
                            console.log(response.data)
                            this.setState({
                                submitButtonText: 'Add Record',
                                intent: 'newrecord'
                            })

                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }

            if (this.state.intent === 'visaAdd') {
                axios.post(`http://192.168.1.18:5000/visa/${this.state.intent}`, visa)
                    .then(response => {

                        console.log(response.data)

                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }

            this.setState({
                // buttonInvisibility: true
            })

        } else {
            this.setState({
                buttonInvisibility: false
            })
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.heading}</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group" hidden={this.state.validEntry}>
                        <label>not found</label>
                    </div>
                    <div className="form-group">
                        <label>Passport Number*</label>
                        <input
                            autoFocus
                            autoCorrect="false"
                            autoComplete="false"
                            type="text"
                            readOnly={this.state.lockPassportField}
                            required
                            className="form-control"
                            value={this.state.passportNumber}
                            onChange={this.onChangePassportNumber}
                            placeholder="eg: J2323876"
                        />
                    </div>
                    <div hidden={this.state.newPassportFieldHidden}>
                        <div className="form-group">
                            <label>First Name*</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.passportHolderFirstName}
                                onChange={this.onChangePassportHolderFirstName}
                                placeholder="eg: John"
                            />
                        </div>
                        <div className="form-group">
                            <label>Second Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.passportHolderSecondName}
                                onChange={this.onChangePassportHolderSecondName}
                                placeholder="eg: John"
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name*</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.passportHolderLastName}
                                onChange={this.onChangePassportHolderLastName}
                                placeholder="eg: John"
                            />
                        </div>
                        <div className="form-group">
                            <label>Year of Expiry*</label>
                            <input
                                type="number"
                                // required
                                className="form-control"
                                value={this.state.passportYearOfExpiry}
                                onChange={this.onchangeYearOfExpiry}
                                placeholder="eg: 2021"
                                max="2100"
                                min="2021"
                            />
                        </div>

                        <div className="form-group">
                        </div>
                        <label>Smart Services</label>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="yes"
                                    checked={this.state.smartServicesOptiIn === 'yes'}
                                    onChange={this.onChangeSmartServicesOption}
                                />
                            Yes
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="no"
                                    checked={this.state.smartServicesOptiIn === 'no'}
                                    onChange={this.onChangeSmartServicesOption}
                                />
                            No
                            </label>
                        </div>
                    </div>
                    <div>
                        <div
                            className="form-group"
                            hidden={this.state.smartServiceOTPInvisible}
                        >
                            <label>OTP</label>
                            <input
                                autoCorrect="false"
                                autoComplete="false"
                                type="text"
                                readOnly
                                className="form-control"
                                value={this.state.smartServiceOTP}
                                onChange={this.onChangePassportNumber}

                            />
                        </div>
                    </div>
                    <div
                        hidden={this.state.newVisaFieldHidden}
                    >
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                className="form-control"
                                value={this.state.visaStatus}
                                onChange={this.onChangeVisaStatus}>
                                {
                                    this.state.visaStatuses.map(function (option) {
                                        return <option
                                            key={option}
                                            value={option}>
                                            {option}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                        <div
                            hidden={this.state.visaDetailsInvisibility}
                        >
                            <div className="form-group">
                                <label>UID</label>
                                <input
                                    autoCorrect="false"
                                    autoComplete="false"
                                    type="text"
                                    className="form-control"
                                    value={this.state.visaUID}
                                    onChange={this.onChangeVisaUID}
                                    placeholder="eg: 9876998872323876"
                                />
                            </div>
                            <div className="form-group">
                                <label>UID</label>
                                <input
                                    autoCorrect="false"
                                    autoComplete="false"
                                    type="text"
                                    className="form-control"
                                    value={this.state.visaUID}
                                    onChange={this.onChangeVisaUID}
                                    placeholder="eg: 9876998872323876"
                                />
                            </div>
                        </div>
                        <div
                            hidden={this.state.visaRequestDateInvisibility}
                        >
                            <div className="form-group">
                                <label>Visa Duration</label>
                                <select
                                    className="form-control"
                                    value={this.state.visaDuration}
                                    onChange={this.onChangeVisaDuration}>
                                    {
                                        this.state.visaDurationOptions.map(function (option) {
                                            return <option
                                                key={option}
                                                value={option}>
                                                {option}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group"                            >
                                <label>Request Date</label>
                                <div>
                                    <DatePicker
                                        readOnly
                                        selected={this.state.visaRequestDate}
                                        onChange={this.onChangeVisaRequestDate} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="form-group" hidden={this.state.buttonInvisibility}>
                        <input type="submit" value={this.state.submitButtonText} className="btn btn-primary" />
                        {/* <input type="submit" value="clear" className="btn btn-primary" /> */}
                    </div>
                </form>
            </div>
        )
    }
}

export default PassportEntry;