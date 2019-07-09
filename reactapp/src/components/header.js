import React from "react";
import PropTypes from 'prop-types';
import newLogo from '../images/ClimatePix_Logo.png';
import "../styles/header.css";
import {scrollToElement} from "../utils/scroll";
import $ from 'jquery';

/**
 * Renders a NavBar Header. To be displayed across all layouts.
 */
export class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scrolled: false,
			whatVisible: 'home',
			link: null
		};
		this.updateNavOnScroll = this.updateNavOnScroll.bind(this);
		this.goToLink = this.goToLink.bind(this);
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
		const aboutApp = document.getElementsByClassName('section-about-app')[0];
		const windowOffset = window.pageYOffset + window.innerHeight;
		const aboutOffset = Header.localToGlobal(about).top + 50;
		const aboutAppOffset = Header.localToGlobal(aboutApp).top + 50;
		let whatVisible = 'home';
		if (windowOffset > aboutOffset)
			whatVisible = 'about';
		else if (windowOffset > aboutAppOffset)
			whatVisible = 'about-app';
		let scrolled = window.pageYOffset > nav.clientHeight / 2;
		this.setState({scrolled, whatVisible});
	}

	goToLink() {
		if (this.state.link) {
			const link = this.state.link;
			this.setState({link: null}, () => {
				if (link === 'home')
					this.props.loadHome();
				else
					scrollToElement(link);
			});
		}
	}

	setLink(link) {
		this.setState({link}, () => {
			const togglerButtons = document.getElementsByClassName('navbar-toggler');
			let togglerIsVisible = false;
			if (togglerButtons) {
				togglerIsVisible = window.getComputedStyle(togglerButtons[0]).display !== 'none';
			}
			if (togglerIsVisible) {
				$('#navbarSupportedContent').collapse('toggle');
			} else {
				this.goToLink();
			}
		});
	}

	componentDidMount() {
		const collapsible = $('#navbarSupportedContent');
		collapsible.on('shown.bs.collapse', this.goToLink);
		collapsible.on('hidden.bs.collapse', this.goToLink);
		document.body.onscroll = this.updateNavOnScroll;
		this.updateNavOnScroll();
	}

	render() {
		return (
			<nav
				className={`navbar fixed-top navbar-expand-lg navbar-light mb-4 pageNavHeader ${this.state.scrolled ? 'scrolled' : ''}`}>
                <span className="navbar-brand logo-wrapper">
                    <img className="logoImg" alt="ClimateChange.AI" src={newLogo}
						 onClick={this.props.loadHome}/>
                </span>
				<button className="navbar-toggler" type="button" data-toggle="collapse"
						data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
						aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"/>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto">
						<li className={`nav-item ${this.state.whatVisible === 'home' ? 'active' : ''}`}>
                            <span className="nav-link button" onClick={() => this.setLink('home')}>
                                HOME
								{this.state.whatVisible === 'home' ? (<span className="sr-only">(current)</span>) : ''}
                            </span>
						</li>
						<li className={`nav-item ${this.state.whatVisible === 'about-app' ? 'active' : ''}`}>
                            <span className="nav-link button" onClick={() => this.setLink('about-app')}>
                                THE APP
								{this.state.whatVisible === 'about-app' ? (
									<span className="sr-only">(current)</span>) : ''}
                            </span>
						</li>
						<li className={`nav-item ${this.state.whatVisible === 'about' ? 'active' : ''}`}>
							<span className="nav-link button" onClick={() => this.setLink('about')}>
								ABOUT
								{this.state.whatVisible === 'about' ? (<span className="sr-only">(current)</span>) : ''}
							</span>
						</li>
					</ul>
				</div>
			</nav>
		)
	}
}

Header.propTypes = {
	loadHome: PropTypes.func.isRequired
};
