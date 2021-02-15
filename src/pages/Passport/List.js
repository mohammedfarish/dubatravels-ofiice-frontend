import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class List extends Component {

    constructor(props) {
        super(props)

        this.state = {
            passports: []
        }
    }

    componentDidMount() {
        axios.get('https://dubatravels.herokuapp.com/passport/list', {
            headers: {
                "x-auth-token": window.localStorage.getItem('token')
            }
        }).then(response => {
            this.setState({
                passports: response.data
            })
        })
    }

    render() {
        return (
            <div>
                <div className="page-heading-container">
                    <h1>
                        List
                    </h1>
                </div>
                <div>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Nationality</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.passports.map(passport => {
                                    return (
                                        <tr
                                            key={passport._id}
                                        >
                                            <td>{passport.passportHolderFirstName} {passport.passportHolderLastName}</td>
                                            <td>{passport.nationality}</td>
                                            <td>
                                                <Link to={`/passport/${passport._id}`}>
                                                    Passport
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
