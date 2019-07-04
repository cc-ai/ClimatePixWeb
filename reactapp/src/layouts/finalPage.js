import React from 'react';
import "../styles/final_page.css";
import {Helmet} from "react-helmet/es/Helmet";
import PropTypes from 'prop-types';

/** Renders the final page with a thank you message.
 * **/
export class FinalPage extends React.Component {

	render() {

		return (
			<div className="final-page">
				<Helmet>
					<title>Thanks!</title>
				</Helmet>
				<h3>Thank you for your contribution!<br/></h3>
				<div>
					<div>
						If you want to make any updates regarding images you just uploaded,
						please contact us with following information (keep it preciously!):
					</div>
					<div className="upload-info">
						<div className="row">
							<div className="col-md text-md-right">Session ID:</div>
							<div className="col-md text-md-left"><strong><code>{this.props.sessionID}</code></strong>
							</div>
						</div>
						<div className="row">
							<div className="col-md text-md-right">Upload ID:</div>
							<div className="col-md text-md-left"><strong><code>{this.props.uploadID}</code></strong>
							</div>
						</div>
					</div>
				</div>
				<p>
					For more information about the project,&nbsp;
					<a target="_blank" rel="noopener noreferrer"
					   className="href-link"
					   href="https://mila.quebec/en/ai-society/visualizing-climate-change/">
						<strong>click here</strong>
					</a>.
				</p>
				<div className="w-75 m-auto">
					<p className="mt-5">
						<span className="button btn btn-danger" onClick={this.props.loadTagsForm}>
							UPLOAD MORE
						</span>
					</p>
				</div>
			</div>
		);
	}
}

FinalPage.propTypes = {
	loadTagsForm: PropTypes.func.isRequired,
	sessionID: PropTypes.string.isRequired,
	uploadID: PropTypes.string.isRequired,
};
