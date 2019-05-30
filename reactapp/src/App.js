import React from 'react';
import './App.css';
import {CookiesProvider} from "react-cookie";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/header";
import indexRoutes from "./indexRoutes";

export class App extends React.Component {
    render() {
        return (
            <CookiesProvider>
                <Router>
                    <div className="container-fluid">
                        <Header/>
                        <Switch>
                            {indexRoutes.map((prop, key) => {
                                return <Route path={prop.path} key={key} component={prop.component}/>;
                            })}
                        </Switch>
                    </div>
                </Router>
            </CookiesProvider>
        );
    }
}
