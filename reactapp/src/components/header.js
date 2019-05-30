import React from "react";
import {withCookies} from "react-cookie";
import logo from "../images/earthlogo.png";
import "../styles/header.css";
import {HashLink} from "react-router-hash-link";
import {Link} from "react-router-dom";

/**
 * Renders a NavBar Header. To be displayed across all layouts.
 * TODO: The links in the header nav currently dont take you to the appropriate sections on the page. Update them.
 */
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark teal mb-4 pageNavHeader" id="home">
                <a className="navbar-brand" href="#"><img className="logoImg" src={logo}/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* TODO : To allow navigation to each div add id's to the div containers */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span
                                className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <HashLink smooth className="nav-link" to="/#about-us">Who are we ? </HashLink>
                        </li>
                        <li className="nav-item">
                            <HashLink smooth className="nav-link" to="/#about-project">What is this project ?</HashLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )

    }
}

Header.displayName = "Navigation bar at the top";
export default withCookies(Header);
