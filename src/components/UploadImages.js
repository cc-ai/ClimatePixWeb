import React, {Component, createRef} from 'react';
import Dropzone from 'react-dropzone';
import "../styles/image_uploader.css";
import {post} from 'axios';

//Setup for dropzone component. createRef is for creating access/reference to the HTML page's DOM
const dropzoneRef = createRef();
//Define a function openDialog, that can open the file picker when you click the button to select files
//from a folder to upload
const openDialog = () => {
    // Note that the ref is set async,
    // so it might be null at some point
    if (dropzoneRef.current) {
        dropzoneRef.current.open()
    }
};
//CSS Style that can be used if you want to build a preview image component in the page
const previewStyle = {
    display: 'inline',
    width: 100,
    height: 100,
};
export default class UploadImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }
    //Method called when a new file is dropped or selected using the upload section
    //files is an array of File objects  = https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
    onDrop = (files) => {
        this.setState({
            files: this.state.files.concat(files),
        });
    }

    //Method called upload button is submitted.
    //e is the input event that is automatically passed for this ui event
    handleSubmit = (e) => {
        e.preventDefault() // Stop form submit
        //Iterate through to submit all files
        this.props.fileLoader(this.state.files)
        //upload the first file from the list of smiles(remember state.files is the only you can access the files
        //from onDrop outside of that method. (example of state functioning like a global variable)
        // this.uploadDropfile(this.state.files[0]).then((response) => {
        //     console.log(response);
        // })
    }

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

                                    <a href="#" className="href-link"
                                       onClick={openDialog}><span>Click to select files</span></a>
                                </div>
                            </div>);
                    }}
                </Dropzone>
                {/*<button type="submit" className="upload-button" onClick={this.handleSubmit}>Upload Image</button>*/}

                <a href="#" className="fancy-button bg-gradient1"
                   onClick={this.handleSubmit}><span>Upload & Continue</span></a>
            </div>
        );
    }
}