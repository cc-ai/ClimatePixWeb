import React from "react";
import {withCookies} from "react-cookie";
import logo from "../images/logo.png";
import "../styles/header.css";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};


    }


    render() {
        return (
            <div className="navbar pageNavHeader">
                <div className="container-fluid">
                    <div className="row header-row">

                        <div className="col-md-2">
                            <img src={logo} className="logoImg" alt=""/>
                        </div>
                        <div className="col-md-4">

                        </div>
                    </div>
                </div>
            </div>)

    }
}

export default withCookies(Header);
