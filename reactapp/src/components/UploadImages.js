import React, {Component, createRef} from 'react';
import Dropzone from 'react-dropzone';
import "../styles/image_uploader.css";

/* Setup for dropzone component. createRef is for creating access/reference to the HTML page's DOM */
const dropzoneRef = createRef();
/* Define a function openDialog, that can open the file picker when you click the button to select files from a folder to upload*/

const openDialog = () => {
    /* Note that the ref is set async so it might be null at some point */
    if (dropzoneRef.current) {
        dropzoneRef.current.open()
    }
};
/** Renders a Component that allows you to upload images.
 * TODO: After upload, show the files being upload before taking people to the next page
 * **/
export default class UploadImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    /** Method called when a new file is dropped or selected using the upload section
     files is an array of File objects  = https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file */
    onDrop = (files) => {
        this.setState({
            files: this.state.files.concat(files),
        });
    };

    /** Method called upload button is submitted.
     e is the input event that is automatically passed for this ui event */
    handleSubmit = (e) => {
        e.preventDefault(); /* Stop form submit */
        /* Iterate through to submit all files */
        this.props.fileLoader(this.state.files)
    };

    render() {
        return (
            <div className="upload-container">
                <h3 className="custom-header">Contribute to this project by uploading and tagging pictures</h3>
                <Dropzone className="dropzone-container" ref={dropzoneRef} accept="image/png, image/jpg"
                          onDrop={this.onDrop} noClick noKeyboard>
                    {({getRootProps, getInputProps, acceptedFiles}) => {
                        return (
                            <div className="container">
                                <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <h3>Drag and Drop files here to upload</h3>
                                    <p className="smallP">You can upload multiple files at once(Only *.jpeg and
                                        *.png images will be
                                        accepted)</p>

                                    <span className="href-link"
                                          onClick={openDialog}><span>Click to select files</span></span>
                                </div>
                            </div>);
                    }}
                </Dropzone>
                {/*<button type="submit" className="upload-button" onClick={this.handleSubmit}>Upload Image</button>*/}
                <div className="fancy-button bg-gradient1"
                     onClick={this.handleSubmit}><span>Upload & Continue</span></div>
            </div>
        );
    }
}