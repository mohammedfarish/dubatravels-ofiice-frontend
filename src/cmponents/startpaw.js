import React from 'react';
import axios from 'axios';

class startPWA extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hideMessage: 0,
            leadingScreen: 0,
            loader: 0,
            loadingMessage: '',
            reloadMessage: 0
        }
    }

    componentDidMount() {

        if (window.matchMedia('(display-mode: standalone)').matches) {

            axios.get(`https://freegeoip.app/json/`)
                .then(response => {
                    const { ip, country_code } = response.data
                    const userAgent = navigator.userAgent
                    this.onClickRefresh = this.onClickRefresh.bind(this)

                    const details = {
                        ip,
                        country_code,
                        userAgent
                    };


                    this.setState({
                        leadingScreen: 1,
                        loadingMessage: 'creating session'
                    })

                    setTimeout(() => {

                        this.setState({
                            hideMessage: 1,
                            loader: 1
                        })

                        setTimeout(() => {

                            axios.post('http://192.168.1.18:5000/user/agent/', details)
                                .then((response) => {
                                    if (response.data) {

                                        this.setState({
                                            leadingScreen: 0,
                                            hideMessage: 0,
                                        })

                                        window.location = `/${response.data}`
                                    }
                                })
                                .catch(err => {
                                    return this.setState({
                                        loader: 0,
                                        loadingMessage: 'Cannot connect to the server.',
                                        reloadMessage: 1
                                    })
                                    // window.location = "/offline.html"
                                })

                        }, 3000);

                    }, 1000);

                })
                .catch(err => {
                    window.location = "/offline.html"
                    console.log(err)
                })

        } else {
            window.location = "/"
        }

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