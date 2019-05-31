import React from 'react';
import {withCookies} from "react-cookie";
import "../styles/image_uploader.css";
import UploadImages from "../components/UploadImages";
import AboutUS from "../components/aboutUs";
import AboutProject from "../components/aboutProject";
import {TopLink} from "../components/TopLInk";

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
                <div className="row drag-drop-row">
                    <UploadImages/>
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

export default withCookies(MainPage);
