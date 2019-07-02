import React from "react";
import "../styles/header.css";
import PropTypes from 'prop-types';

export class UploadButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<h3>
					Depict accurate and personalized outcomes of climate change using AI.
					Help us collect images of flooded houses and streets to train our climate model.
				</h3>
				<p>
                    <span className="button btn btn-danger btn-lg" onClick={this.props.loadTagsForm}>
                        UPLOAD YOUR PHOTOS
                    </span>
				</p>
			</div>
		)

	}
}

UploadButton.propTypes = {
	loadTagsForm: PropTypes.func.isRequired
};
