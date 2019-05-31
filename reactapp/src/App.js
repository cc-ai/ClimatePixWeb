import React from 'react';
import './App.css';
import {Router, Route, Switch} from "react-router-dom";
import {history} from "./utils/history";
import Header from "./components/header";
import indexRoutes from "./indexRoutes";

export class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div className="container-fluid">
                    <Header/>
                    <Switch>
                        {indexRoutes.map((prop, key) => {
                            return <Route path={prop.path} key={key} component={prop.component}/>;
                        })}
                    </Switch>
                </div>
            </Router>
        );
    }
}
