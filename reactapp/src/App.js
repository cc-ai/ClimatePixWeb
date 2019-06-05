import React from 'react';
import './App.css';
import {Route, Router, Switch} from "react-router-dom";
import {history} from "./utils/history";
import Header from "./components/header";
import indexRoutes from "./indexRoutes";
import {AgreementContext} from "./components/agreementContext";

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
                <Router history={history}>
                    <div className="container-fluid">
                        <Switch>
                            {indexRoutes.map((prop, key) => {
                                return <Route path={prop.path} key={key} component={prop.component}/>;
                            })}
                        </Switch>
                    </div>
                </Router>
            </AgreementContext.Provider>
        );
    }
}
