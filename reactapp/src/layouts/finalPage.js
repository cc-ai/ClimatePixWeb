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
				<h4>
					For more information about the project,&nbsp;
					<a target="_blank" rel="noopener noreferrer"
					   className="href-link"
					   href="https://mila.quebec/en/ai-society/visualizing-climate-change/">
						<strong>click here</strong>
					</a>.
				</h4>
				<div className="w-75 m-auto">
					<p className="mt-5">
						<button className="btn btn-success" onClick={this.props.loadTagsForm}>
							<strong>Upload more</strong>
						</button>
					</p>
				</div>
			</div>
		);
	}
}

FinalPage.propTypes = {
	loadTagsForm: PropTypes.func.isRequired
};
