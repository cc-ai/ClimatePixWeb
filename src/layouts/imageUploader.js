import React, {createRef} from 'react';
import Dropzone from 'react-dropzone';
import {withCookies} from "react-cookie";
import "../styles/image_uploader.css";
import axios, {post} from 'axios';


const dropzoneRef = createRef();
const openDialog = () => {
    // Note that the ref is set async,
    // so it might be null at some point
    if (dropzoneRef.current) {
        dropzoneRef.current.open()
    }
};

const previewStyle = {
    display: 'inline',
    width: 100,
    height: 100,
};

class ImageUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }


    onDrop = (files) => {
        this.setState({
            files: this.state.files.concat(files),
        });
    }
    handleSubmit = (e) => {
        e.preventDefault() // Stop form submit
        //Iterate through to submit all files
        console.log(this.state.files)
        this.uploadDropfile(this.state.files[0]).then((response) => {
            console.log(response);
        })
    }

    uploadDropfile(file) {
        console.log("File",file)
        const url = 'http://127.0.0.1:5000/upload_file';
        const formData = new FormData();
        formData.append('file', file);
        //Use below if multiple files
        //formData.append('file[]', files[0])
        //formData.append('file[]', files[1])
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
        }
        return axios.post(url, formData, config).then(response => {

        })
    }

    render() {

        return (
            <div className="wrapper">
                <Dropzone className="dropzone-container" ref={dropzoneRef} accept="image/png, image/jpg"
                          onDrop={this.onDrop} noClick noKeyboard>
                    {({getRootProps, getInputProps, acceptedFiles}) => {
                        return (
                            <div className="container">
                                <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <p>Drag and drop the file here</p>
                                    <p className="smallP">(Only *.jpeg and *.png images will be accepted)</p>
                                    <button
                                        type="button"
                                        onClick={openDialog}
                                    >
                                        Click to select file
                                    </button>
                                </div>
                                <div className="row filesRow">
                                    <div className="col-sm-1"></div>
                                    <div className="col-md-11">
                                        <h4>Files being uploaded</h4>
                                        <ul>
                                            {acceptedFiles.map(file => (
                                                <li key={file.path}>
                                                    {file.path} - {file.size} bytes

                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                </Dropzone>
                <button type="submit" onClick={this.handleSubmit}>Upload Image</button>
            </div>
        );
    }
}

export default withCookies(ImageUploader);
