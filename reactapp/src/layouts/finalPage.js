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
				<p>
					For more information about the project,&nbsp;
					<a target="_blank" rel="noopener noreferrer"
					   className="href-link"
					   href="https://mila.quebec/en/ai-society/visualizing-climate-change/">
						<strong>click here</strong>
					</a>.
				</p>
				<p className="mt-5">
						<span className="button btn btn-danger" onClick={this.props.loadTagsForm}>
							UPLOAD MORE
						</span>
				</p>
				<div className="upload-info mt-5">
					<div>
						(*) If you want to contact us about pictures you just uploaded, please save this upload ID:
					</div>
					<div><code>{this.props.uploadID}</code></div>
				</div>
			</div>
		);
	}
}

FinalPage.propTypes = {
	loadTagsForm: PropTypes.func.isRequired,
	uploadID: PropTypes.string.isRequired
};
