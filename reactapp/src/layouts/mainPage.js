import React from 'react';
import "../styles/image_uploader.css";
import AboutUS from "../components/aboutUs";
import AboutProject from "../components/aboutProject";
import {TopLink} from "../components/TopLInk";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet/es/Helmet";

/** Beginning of the React component MainPage Layout. Currently this page will load a header and called upload images. Once
 the images are uploaded , the page will load the tag images component **/
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            images_uploaded: false
        }
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Welcome to ClimateChange.AI</title>
                </Helmet>
                <div className="row drag-drop-row">
                    <div className="upload-container">
                        <h3 className="custom-header">Contribute to this project by uploading and tagging pictures</h3>
                        <p>
                            <Link className="btn btn-success btn-lg" to='/uploadwithtags'>
                                <strong>Upload</strong>
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="row about-row">
                    <div className="col-md-3"/>
                    <div className="col-md-6">
                        <AboutUS/>
                    </div>
                    <div className="col-md-3">
                        <TopLink/>
                    </div>
                </div>
                <div className="row drag-drop-row"/>
                <div className="row about-row">
                    <div className="col-md-3"/>
                    <div className="col-md-6">
                        <AboutProject/>
                    </div>
                    <div className="col-md-3">
                        <TopLink/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;
