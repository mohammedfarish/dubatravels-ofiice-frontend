import axios from 'axios';
import React from 'react';
// import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


class VisaEntry extends React.Component {

    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassportNumber = this.onChangePassportNumber.bind(this)
        this.onChangeVisaUID = this.onChangeVisaUID.bind(this)
        this.onChangeVisaStatus = this.onChangeVisaStatus.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)

        this.state = {
            passportNumber: 'Invalid Passport',
            visaUID: '',
            status: [],
            visaStatus: '',
            validFromDate: '',
            validFromMonth: '',
            validFromYear: '',
            validFromUnix: '',
            date: new Date(),
            invalid: false
        }
    }

    componentDidMount() {

        axios.get('http://localhost:5000/passport/' + this.props.match.params.id)
            .then(response => {
                // console.log(response)
                if (response.data) {
                    this.setState({
                        passportNumber: response.data.passportNumber
                    })

                    if (response.data.passportNumber.includes('Invalid')) {
                        this.setState({
                            invalid: true
                        })
                    }
                }
            })
            .catch(err => {
                // console.log(err)
                if (err) {
                    this.setState({
                        invalid: true
                    })
                }

            })

        this.setState({
            status: ['Select Status', 'Inactive', 'Processing', 'Active'],
            visaStatus: 'select',
            invalid: true
        })
    }

    onChangePassportNumber(e) {
        this.setState({
            passportNumber: e.target.value
        })
    }

    onChangeVisaUID(e) {
        this.setState({
            visaUID: e.target.value
        })
    }

    onChangeVisaStatus(e) {
        if (e.target.value === 'Select Status') {
            this.setState({
                invalid: true
            })
        } else {
            this.setState({
                invalid: false
            })
        }
        this.setState({
            visaStatus: e.target.value,
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const passport = {
            passportNumber: this.state.passportNumber,
            passportHolderFirstName: this.state.passportHolderFirstName,
            passportHolderSecondName: this.state.passportHolderSecondName,
            passportHolderLastName: this.state.passportHolderLastName,
            yearOfExpiry: this.state.yearOfExpiry,
            visaUID: this.state.visaUID,
            visaStatus: this.state.visaStatus,
            passportHolderMobileNumber: this.state.passportHolderMobileNumber
        }

        console.log(passport);

        // axios.post('http://localhost:5000/passport/add', passport)
        //     .then(response => {
        //         console.log(response.data)
        //     })
        //     .catch((err) => {
        //         console.log('error', err)
        //     })

        this.setState({
            passportNumber: '',
            visaUID: ''
        })

        // window.location = '/'
    }

    render() {
        return (
            <div>
                <h1>Passport Details</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Passport Number*</label>
                        <input
                            type="text"
                            readOnly
                            className="form-control"
                            value={this.state.passportNumber}
                            onChange={this.onChangePassportNumber}
                            placeholder="eg: J2323876"
                        />
                    </div>
                    <div className="form-group" hidden={this.state.invalid}>
                        <label>Visa Unique ID*</label>
                        <input
                            type="number"
                            required
                            className="form-control"
                            value={this.state.visaUID}
                            onChange={this.onChangeVisaUID}
                            placeholder="eg: 674546547"
                            readOnly={this.state.invalid}
                        />
                    </div>
                    <div className="form-group">
                        <label>Visa Status*</label>
                        <select
                            // ref="userInput"
                            placeholder="select"
                            required
                            className="form-control"
                            value={this.state.visaStatus}
                            onChange={this.onChangeVisaStatus}

                        >
                            {
                                this.state.status.map(function (status) {
                                    return <option
                                        key={status}
                                        value={status}
                                    >
                                        {status
                                        }</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group" hidden={this.state.invalid}>

                        <DatePicker
                            value={this.state.date}
                            onChange={this.onChangeDate}
                            disabled={this.state.invalid}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" disabled={this.state.invalid} hidden={this.state.invalid} />
                    </div>
                </form>
            </div>
        )
    }
}

export default VisaEntry;