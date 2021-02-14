import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class PendingVisa extends Component {

    constructor(props) {
        super(props)

        this.state = {
            visas: []
        }
    }

    componentDidMount() {

        axios.get('https://dubatravels.herokuapp.com/visa/pending', {
            headers: {
                "x-auth-token": window.localStorage.getItem('token')
            }
        }).then(response => {

            if (response.data.length > 0) {
                // console.log(response.data)
                const fetchedVisas = []
                response.data.forEach(visa => {
                    const { passportNumber, _id, visaStatus, visaCountry, lastUpdate } = visa

                    axios.post("https://dubatravels.herokuapp.com/passport/search", {
                        "passportNumber": passportNumber
                    }, {
                        headers: {
                            "x-auth-token": window.localStorage.getItem('token')
                        }
                    }).then(response => {
                        // console.log(response.data)
                        const { passportHolderFirstName, passportHolderLastName, _id: passportId } = response.data

                        const data = {
                            "_id": _id,
                            "first_name": passportHolderFirstName,
                            "last_name": passportHolderLastName,
                            "visaStatus": visaStatus,
                            "country": visaCountry,
                            "lastupdate": lastUpdate,
                            "passportId": passportId
                        }
                        fetchedVisas.push(data)
                    })
                });
                this.checkVisas = setInterval(() => {

                    this.setState({
                        visas: fetchedVisas
                    })
                });
            }
        })

    }

    componentWillUnmount() {
        clearInterval(this.checkVisas);
    }

    render() {
        return (
            <div>
                <div className="page-heading-container">
                    <h1>
                        Pending Visas
                    </h1>
                </div>
                <div>
                    Pending Visas : {this.state.visas.length}
                </div>
                <br />
                <div>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Country</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.visas.map(visa => {
                                    return (
                                        <tr
                                            key={visa._id}
                                        >
                                            <td>{visa.first_name} {visa.last_name}</td>
                                            <td>{visa.country}</td>
                                            <td>{visa.visaStatus}</td>
                                            <td>
                                                <Link to={`/passport/${visa.passportId}`}>
                                                    Passport
                                                </Link>
                                                <br />
                                                <Link to={`/visa/update/${visa._id}`}>
                                                    Update
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
