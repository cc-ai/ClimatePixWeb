import React from "react";
import "../styles/header.css";

export class UploadButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="upload-container flex-grow-1">
                <h3 className="custom-header">
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
