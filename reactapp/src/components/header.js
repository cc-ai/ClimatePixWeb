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
		this.state = {
			scrolled: false,
			aboutVisible: false
		};
		this.updateNavOnScroll = this.updateNavOnScroll.bind(this);
	}

	static localToGlobal(_el) {
		/**
		 * Reference (2019/06/25): https://stackoverflow.com/a/1350681
		 * */
		let target = _el,
			target_width = target.offsetWidth,
			target_height = target.offsetHeight,
			gleft = 0,
			gtop = 0,
			rect = {};

		const moonwalk = function (_parent) {
			if (!!_parent) {
				gleft += _parent.offsetLeft;
				gtop += _parent.offsetTop;
				moonwalk(_parent.offsetParent);
			} else {
				return rect = {
					top: target.offsetTop + gtop,
					left: target.offsetLeft + gleft,
					bottom: (target.offsetTop + gtop) + target_height,
					right: (target.offsetLeft + gleft) + target_width
				};
			}
		};
		moonwalk(target.offsetParent);
		return rect;
	}

	updateNavOnScroll() {
		const nav = document.getElementsByTagName('nav')[0];
		const about = document.getElementsByClassName('section-about')[0];
		const windowOffset = window.pageYOffset + window.innerHeight;
		const aboutOffset = Header.localToGlobal(about).top + 50;
		let aboutVisible = windowOffset > aboutOffset;
		let scrolled = window.pageYOffset > nav.clientHeight;
		this.setState({scrolled, aboutVisible});
	}

	componentDidMount() {
		document.body.onscroll = this.updateNavOnScroll;
		this.updateNavOnScroll();
	}

	render() {
		return (
			<nav className={`navbar fixed-top navbar-expand-lg navbar-dark mb-4 pageNavHeader ${this.state.scrolled ? 'scrolled' : ''}`}>
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
						<li className={`nav-item ${this.state.aboutVisible ? '' : 'active'}`}>
                            <span className="nav-link button" onClick={() => scrollToElement('home')}>
                                Home
								{this.state.aboutVisible ? '' : (<span className="sr-only">(current)</span>)}
                            </span>
						</li>
						<li className={`nav-item ${this.state.aboutVisible ? 'active' : ''}`}>
							<span className="nav-link button" onClick={() => scrollToElement('about')}>
								About us
								{this.state.aboutVisible ? (<span className="sr-only">(current)</span>) : ''}
							</span>
						</li>
					</ul>
				</div>
			</nav>
		)
	}
}

Header.displayName = "Navigation bar at the top";
export default Header;
