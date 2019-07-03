import React from 'react';
import "../styles/mainPage.css";
import {AboutUS} from "../components/aboutUs";
import {AboutApp} from "../components/aboutApp";
import {Helmet} from "react-helmet/es/Helmet";
import Header from "../components/header";
import {UploadButton} from "../components/uploadButton";
import {TagImages} from "../components/tagImages";
import {FinalPage} from "./finalPage";

var ResizeSensor = require('css-element-queries/src/ResizeSensor');

/** Beginning of the React component MainPage Layout. Currently this page will load a header and called upload images. Once
 the images are uploaded , the page will load the tag images component **/
export class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 'upload'
		};
		this.showUpload = this.showUpload.bind(this);
		this.showTagImages = this.showTagImages.bind(this);
		this.showThanks = this.showThanks.bind(this);
	}

	static updateMainPageComponents() {
		const main = document.getElementsByTagName('main')[0];
		const nav = main.getElementsByTagName('nav')[0];
		const aboutWrapper = main.getElementsByClassName('section-about-wrapper')[0];
		const about = main.getElementsByClassName('section-about')[0];
		const aboutAppWrapper = main.getElementsByClassName('section-about-app-wrapper')[0];
		const aboutApp = main.getElementsByClassName('section-about-app')[0];
		const remainingHeight = window.innerHeight - nav.clientHeight;
		aboutWrapper.style.minHeight = `${remainingHeight}px`;
		aboutAppWrapper.style.minHeight = `${nav.clientHeight + remainingHeight}px`;
		if (remainingHeight >= about.clientHeight) {
			aboutWrapper.style.paddingTop = 0;
			aboutWrapper.style.marginTop = 0;
		} else {
			aboutWrapper.style.paddingTop = `${nav.clientHeight}px`;
			aboutWrapper.style.marginTop = `-${nav.clientHeight}px`;
		}
		aboutAppWrapper.style.paddingTop = `${nav.clientHeight}px`;
		aboutAppWrapper.style.marginTop = `-${nav.clientHeight}px`;
		/*
		if (remainingHeight >= aboutApp.clientHeight) {
			aboutAppWrapper.style.paddingTop = 0;
			aboutAppWrapper.style.marginTop = 0;
		} else {
			aboutAppWrapper.style.paddingTop = `${nav.clientHeight}px`;
			aboutAppWrapper.style.marginTop = `-${nav.clientHeight}px`;
		}
		*/
	}

	componentDidMount() {
		document.body.onresize = MainPage.updateMainPageComponents;
		var element = document.getElementsByTagName('nav')[0];
		new ResizeSensor(element, function () {
			MainPage.updateMainPageComponents();
		});
		MainPage.updateMainPageComponents();
	}

	showUpload() {
		this.setState({currentPage: 'upload'})
	}

	showTagImages() {
		this.setState({currentPage: 'tag'})
	}

	showThanks() {
		this.setState({currentPage: 'thanks'})
	}

	render() {
		let component = '';
		if (this.state.currentPage === 'upload')
			component = <UploadButton loadTagsForm={this.showTagImages}/>;
		else if (this.state.currentPage === 'tag')
			component = <TagImages loadThanks={this.showThanks}/>;
		else if (this.state.currentPage === 'thanks')
			component = <FinalPage loadTagsForm={this.showTagImages}/>;
		return (
			<main id="home">
				<Helmet>
					<title>Welcome to ClimateChange.AI</title>
				</Helmet>
				<Header/>
				<div className="main-page">
					<div className="up-screen d-flex flex-column">
						{component}
					</div>
					<AboutApp/>
					<AboutUS/>
				</div>
			</main>
		);
	}
}
