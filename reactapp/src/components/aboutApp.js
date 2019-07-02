import React from 'react';
import {TopLink} from "./TopLInk";
import '../styles/aboutApp.css';
import figure from '../images/android-app.png';


export class AboutApp extends React.Component {
	render() {
		return (
			<div className="section-about-app-wrapper d-flex flex-column" id="about-app">
				<div className="section-about-app flex-grow-1 d-flex flex-column">
					<div className="row flex-grow-1">
						<div className="col-lg-3"/>
						<div className="col-lg-6">
							<div className="about-app row align-items-center py-5">
								<div className="about-app-text col-lg">
									<h4 className="about-app-text-header pl-4">THE APP</h4>
									<div className="about-app-text-content pl-4">
										Use ClimatePix to help us collect images of
										places impacted by climate change!
									</div>
									<div>
										<a target="_blank" rel="noopener noreferrer"
										   href='https://play.google.com/store/apps/details?id=com.mila.floodreport&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
											<img className="img-fluid w-75" alt='Get it on Google Play'
												 src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/>
										</a>
									</div>
								</div>
								<div className="about-app-image col-lg text-left pl-4 pl-lg-0 text-lg-right">
									<img className="img-fluid w-50" src={figure}/>
								</div>
							</div>
						</div>
						<div className="col-lg-3 pt-5 pb-3">
							<TopLink/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
