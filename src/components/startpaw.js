import React from 'react';
import axios from 'axios';

class startPWA extends React.Component {
    constructor(props) {
        super(props)

        this.onClickRefresh = this.onClickRefresh.bind(this)

        this.state = {
            hideMessage: 0,
            leadingScreen: 0,
            loader: 0,
            loadingMessage: '',
            reloadMessage: 0,
            longitude: '',
            latitude: '',
            accuracy: ''
        }
    }

    componentDidMount() {

        axios.get(`https://freegeoip.app/json/`)
            .then(response => {
                const { ip, country_code } = response.data
                const userAgent = navigator.userAgent

                this.setState({
                    leadingScreen: 1,
                    loadingMessage: 'connecting to the server'
                })

                var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };
                const success = (pos) => {
                    var crd = pos.coords;

                    this.setState({
                        longitude: crd.longitude,
                        latitude: crd.latitude,
                        accuracy: crd.accuracy
                    })

                }

                const error = (err) => {
                    // console.log(`ERROR(${err.code}): ${err.message}`);
                    return;
                }

                navigator.geolocation.getCurrentPosition(success, error, options);

                setTimeout(() => {

                    this.setState({
                        hideMessage: 1,
                        loader: 1
                    })

                    setTimeout(() => {

                        if (this.state.longitude &&
                            this.state.latitude &&
                            this.state.accuracy) {

                            const details = {
                                ip,
                                country_code,
                                userAgent,
                                longitude: this.state.longitude,
                                latitude: this.state.latitude,
                                accuracy: this.state.accuracy
                            };
                            axios.post('http://192.168.1.18:5000/session', details)
                                .then(response => {

                                    const { session_token } = response.data

                                    if (session_token) {

                                        const existingSession = window.sessionStorage.getItem('session_token')

                                        if (!existingSession) {
                                            window.sessionStorage.setItem('session_token', session_token)
                                        }

                                        this.setState({
                                            leadingScreen: 0,
                                            hideMessage: 0,
                                        })

                                        window.location = `/${response.data.next}`

                                    } else {
                                        return this.setState({
                                            loader: 0,
                                            loadingMessage: 'The server is not responding.',
                                            reloadMessage: 1
                                        })
                                    }

                                })
                                .catch(err => {
                                    return this.setState({
                                        loader: 0,
                                        loadingMessage: 'Cannot connect to the server.',
                                        reloadMessage: 1
                                    })
                                })
                        } else {
                            this.setState({
                                loader: 0,
                                loadingMessage: 'enable location access',
                                reloadMessage: 1
                            })
                        }
                    }, 3000);

                }, 1000);

            })
            .catch(err => {
                window.location = "/offline.html"
                console.log(err)
            })


    }

    onClickRefresh() {
        window.location.reload()
    }

    render() {
        return (
            <div>
                <div className="App pwa-start-page" style={{ opacity: this.state.leadingScreen, transitionDuration: "0.25s" }}>
                    <div>
                        <img src="/logo.png" alt="logo" width="200vw" />
                    </div>
                    <img src="/loading.gif" alt="loading" style={{ opacity: this.state.loader, transitionDuration: "0.25s" }} width="200vw" />
                    <p style={{ opacity: this.state.hideMessage, transitionDuration: "0.75s" }}>{this.state.loadingMessage}</p>
                    <div
                    >
                        <h4
                            className="loader-retry"
                            onClick={this.onClickRefresh}
                            style={{ opacity: this.state.reloadMessage, transitionDuration: "1s" }}
                        > retry connecting</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default startPWA;