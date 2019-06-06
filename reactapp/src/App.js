import React from 'react';
import './App.css';
import {AgreementContext} from "./components/agreementContext";
import {MainPage} from "./layouts/mainPage";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agree: false
        };
        this.getAgreement = this.getAgreement.bind(this);
        this.setAgreement = this.setAgreement.bind(this);
    }

    getAgreement() {
        return this.state.agree;
    }

    setAgreement(agreement) {
        this.setState({agree: agreement});
    }

    render() {
        const context = {
            get: this.getAgreement,
            set: this.setAgreement
        };
        return (
            <AgreementContext.Provider value={context}>
                <div className="container-fluid">
                    <MainPage/>
                </div>
            </AgreementContext.Provider>
        );
    }
}
