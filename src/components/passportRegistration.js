import React from 'react';
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
        this.onChangePassportHolderMobileNumber = this.onChangePassportHolderMobileNumber.bind(this)

        this.state = {
            passportNumber: '',
            passportHolderFirstName: '',
            passportHolderSecondName: '',
            passportHolderLastName: '',
            yearOfExpiry: '',
            passportHolderMobileNumber: ''
        }
    }

    componentDidMount() {
        this.setState({
            status: ['Inactive', 'Processing', 'Active'],
            visaStatus: 'select',
        })
    }

    onChangePassportNumber(e) {
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
            yearOfExpiry: e.target.value
        })
    }

    onChangePassportHolderMobileNumber(e) {
        this.setState({
            passportHolderMobileNumber: e.target.value
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
            passportHolderMobileNumber: this.state.passportHolderMobileNumber
        }

        console.log(passport);

        axios.post('https://dubatravels.herokuapp.com/passport/add', passport)
            .then(response => {
                console.log(response.data)
                window.location = `/visa/${response.data}`
            })
            .catch((err) => {
                console.log('error', err)
            })


        this.setState({
            passportNumber: '',
            passportHolderFirstName: '',
            passportHolderSecondName: '',
            passportHolderLastName: '',
            yearOfExpiry: '',
            passportHolderMobileNumber: '',
        })

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
                            required
                            className="form-control"
                            value={this.state.passportNumber}
                            onChange={this.onChangePassportNumber}
                            placeholder="eg: J2323876"
                        />
                    </div>
                    <div className="form-group">
                        <label>First Name*</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.passportHolderFirstName}
                            onChange={this.onChangePassportHolderFirstName}
                            placeholder="eg: Tom"
                        />
                    </div>
                    <div className="form-group">
                        <label>Second Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.passportHolderSecondName}
                            onChange={this.onChangePassportHolderSecondName}
                            placeholder="eg: Thomas"
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name*</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.passportHolderLastName}
                            onChange={this.onChangePassportHolderLastName}
                            placeholder="eg: Riddle"
                        />
                    </div>
                    <div className="form-group">
                        <label>Year of Expiry*</label>
                        <input
                            type="number"
                            required
                            className="form-control"
                            value={this.state.yearOfExpiry}
                            onChange={this.onchangeYearOfExpiry}
                            placeholder="eg: 2021"
                            max="2100"
                            min="2021"
                        />
                    </div>
                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.passportHolderMobileNumber}
                            onChange={this.onChangePassportHolderMobileNumber}
                            placeholder="eg: 971552837463"
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default PassportEntry;