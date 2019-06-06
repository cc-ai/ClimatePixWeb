import React from 'react';
import "../styles/image_uploader.css";
import {AboutUS} from "../components/aboutUs";
import {TopLink} from "../components/TopLInk";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet/es/Helmet";
import Header from "../components/header";
import UploadButton from "../components/uploadButton";
import {TagImages} from "../components/tagImages";

/** Beginning of the React component MainPage Layout. Currently this page will load a header and called upload images. Once
 the images are uploaded , the page will load the tag images component **/
export class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            open_tag_images:false,
            images_uploaded: false
        }
    }

    openTagImages = () => {
        this.setState({open_tag_images:true})
    }
    render() {
        return (
            <div>
                <Helmet>
                    <title>Welcome to ClimateChange.AI</title>
                </Helmet>
                <div className="main-page">
                    <div className="up-screen d-flex flex-column">
                        <Header/>
                        {this.state.open_tag_images === true ? <TagImages/> : <UploadButton loadTagsForm={this.openTagImages}/> }
                    </div>
                    <div className="section-about-wrapper">
                        <div className="section-about">
                            <div className="row">
                                <div className="col-md-3"/>
                                <div className="col-md-6">
                                    <AboutUS/>
                                </div>
                                <div className="col-md-3">
                                    <TopLink/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
