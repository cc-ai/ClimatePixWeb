import React from 'react';
import "../styles/image_uploader.css";
import {AboutUS} from "../components/aboutUs";
import {TopLink} from "../components/TopLInk";
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
		if (!main)
			return;
		const nav = main.getElementsByTagName('nav')[0];
		if (!nav)
			return;
		const aboutWrapper = main.getElementsByClassName('section-about-wrapper')[0];
		if (!aboutWrapper)
			return;
		const about = main.getElementsByClassName('section-about')[0];
		if (!about)
			return;
		const remainingHeight = window.innerHeight - nav.clientHeight;
		aboutWrapper.style.minHeight = `${remainingHeight}px`;
		if (remainingHeight >= about.clientHeight) {
			aboutWrapper.style.paddingTop = 0;
			aboutWrapper.style.marginTop = 0;
		} else {
			aboutWrapper.style.paddingTop = `${nav.clientHeight}px`;
			aboutWrapper.style.marginTop = `-${nav.clientHeight}px`;
		}
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
					<div className="up-screen pb-5">
						{component}
					</div>
					<div className="section-about-wrapper" id="about">
						<div className="section-about">
							<div className="row">
								<div className="col-lg-3"/>
								<div className="col-lg-6">
									<AboutUS/>
								</div>
								<div className="col-lg-3">
									<TopLink/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}
}
