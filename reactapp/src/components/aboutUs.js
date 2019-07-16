import React from "react";
import {TopLink} from "./TopLInk";
import '../styles/aboutUs.css';
import facebookIcon from '../images/facebook-icon.png';

/**
 * Content for About Us Section on the landing/home page.
 */
export class AboutUS extends React.Component {
	render() {
		return (
			<div className="section-about-wrapper d-flex flex-column" id="about">
				<div className="section-about flex-grow-1">
					<div className="row">
						<div className="col-lg-3"/>
						<div className="col-lg-6">
							<div className="about-us py-5">
								<h2>ABOUT</h2>
								<p>
									The VICC (Visualizing the Impact of Climate Change)
									project is an interdisciplinary project aimed at creating images of
									accurate, vivid, and personalized outcomes of climate change. Our goal is to use
									cutting-edge machine learning techniques to produce images of how neighborhoods and
									houses will look like following the effects of global warming. By creating a more
									visceral understanding of the effects of climate change, we aim to strengthen public
									support for necessary actions and motivate people to make impactful decisions. As a
									prototype, we first focus on modeling flood consequences on homes.
								</p>
								<p className="more-info">
									Our project aims to raise awareness and conceptual understanding
									of climate change by bringing the future closer. More info&nbsp;
									<a target="_blank" rel="noopener noreferrer"
									   className="href-link"
									   href="https://mila.quebec/en/ai-society/visualizing-climate-change/">
										here
									</a>.
								</p>
								<p className="social-links">
									Follow us on Facebook! <a target="_blank" rel="noopener noreferrer"
															  href="https://fb.me/visualizingclimatechange">
									<img alt="Follow us on Facebook" src={facebookIcon}/></a>
								</p>
							</div>
						</div>
						<div className="col-lg-3 pt-5 pb-3">
							<TopLink white={true}/>
						</div>
					</div>
				</div>
			</div>
		)

	}
}

AboutUS.displayName = 'About US Section - Landing Page (mainPage.js)';
