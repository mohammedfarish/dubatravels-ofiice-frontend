/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

// import Exercise from

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={'/edit/' + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

class Export extends React.Component {

    constructor(props) {
        super(props)

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { exercises: [] }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercise/')
            .then(response => {
                if (response.data.length > 0) {
                    // console.log(response.data)
                    this.setState({ exercises: response.data })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercise/' + id)
            .then(response => {
                // console.log(response.data)
                this.setState({
                    exercises: this.state.exercises.filter(el => el._id !== id)
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    exerciseList() {
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />
        })
    }

    render() {
        return (
            <div>
                <h1>Logged Execises</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Export;