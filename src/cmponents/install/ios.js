import React from 'react';

class iOS extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }



    render() {
        return (
            <div>
                <div className="install-page">
                    <div className="intsall-header-container">
                        <h1 className="homepage-header"> How to install the Duba Remote Office Portal on iOS?</h1>
                    </div>
                    <div className="install-step-section">
                        <h4 className="install-step homepage-install-msg">Step 1</h4>
                        <p>On the bottom of the screen, hit the Share button.</p>
                        <img className="install-image" src="/images/install/ios1.webp" alt="Select Share" width="300vw" />
                    </div>
                    <div className="install-step-section">
                        <h4 className="install-step homepage-install-msg">Step 2</h4>
                        <p>Click on the "Add to Homescreen" button.</p>
                        <img className="install-image" src="/images/install/ios2.webp" alt="Select Share" width="300vw" />
                    </div>
                    <div className="install-step-section">
                        <h4 className="install-step homepage-install-msg">Step 3</h4>
                        <p>In the pop up card, press "Add"</p>
                        <img className="install-image" src="/images/install/ios3.webp" alt="Select Share" width="300vw" />
                    </div>
                    <div className="install-step-section">
                        <h4 className="install-step homepage-install-msg">Done</h4>
                        <p>The App has been installed in your phone.</p>
                        <img className="install-image" src="/images/install/ios4.webp" alt="Select Share" width="300vw" />
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}

export default iOS;