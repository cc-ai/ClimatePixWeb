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
					Contribute to this project by uploading and tagging pictures
				</h3>
				<p>
                    <span className="button btn btn-success btn-lg" onClick={this.props.loadTagsForm}>
                        <strong>Upload</strong>
                    </span>
				</p>
			</div>
		)

	}
}

UploadButton.propTypes = {
	loadTagsForm: PropTypes.func.isRequired
};
