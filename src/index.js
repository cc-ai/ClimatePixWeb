import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router} from "react-router-dom";
import { CookiesProvider } from 'react-cookie'
import indexRoutes from "./indexRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./layouts/header";

ReactDOM.render(
  <CookiesProvider>
      <Header></Header>
    <Router>
      <Switch>
        {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} key={key} component={prop.component} />;
        })}
      </Switch>
    </Router>
  </CookiesProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
