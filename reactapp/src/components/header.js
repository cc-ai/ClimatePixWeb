import React from "react";
import logo from "../images/earthlogo.png";
import "../styles/header.css";
import {scrollToElement} from "../utils/scroll";

/**
 * Renders a NavBar Header. To be displayed across all layouts.
 */
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static updateNavOnScroll() {
        const nav = document.getElementsByTagName('nav')[0];
        if (window.pageYOffset <= nav.clientHeight) {
            nav.classList.remove('scrolled');
        } else {
            nav.classList.add('scrolled');
        }
    }

    componentDidMount() {
        document.body.onscroll = Header.updateNavOnScroll;
        Header.updateNavOnScroll();
    }

    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark mb-4 pageNavHeader">
                <span className="navbar-brand">
                    <img className="logoImg" alt="ClimateChange.AI" src={logo} onClick={() => scrollToElement('home')}/>
                </span>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <span className="nav-link button" onClick={() => scrollToElement('home')}>
                                Home <span className="sr-only">(current)</span>
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link button" onClick={() => scrollToElement('about')}>About us</span>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

Header.displayName = "Navigation bar at the top";
export default Header;
