import React from "react";
import logo from "../images/earthlogo.png";
import "../styles/header.css";
import {HashLink} from "react-router-hash-link";
import {Link} from "react-router-dom";

/**
 * Renders a NavBar Header. To be displayed across all layouts.
 */
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark mb-4 pageNavHeader">
                <span className="navbar-brand">
                    <Link to="/">
                        <img className="logoImg" alt="ClimateChange.AI" src={logo}/>
                    </Link>
                </span>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <HashLink smooth className="nav-link" to="/#home">
                                Home <span className="sr-only">(current)</span>
                            </HashLink>
                        </li>
                        <li className="nav-item">
                            <HashLink smooth className="nav-link" to="/#about">About us</HashLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

    static updateNavOnScroll() {
        console.log('Header.updateNavOnScroll');
        const nav = document.getElementsByTagName('nav')[0];
        if (window.pageYOffset <= nav.clientHeight) {
            nav.classList.remove('scrolled');
        } else {
            nav.classList.add('scrolled');
        }
    }

    componentDidMount() {
        console.log('Header.componentDidMount');
        document.body.onscroll = Header.updateNavOnScroll;
        Header.updateNavOnScroll();
    }
}

Header.displayName = "Navigation bar at the top";
export default Header;
