import React from 'react';
import {withCookies} from "react-cookie";
import "../styles/image_uploader.css";
import UploadImages from "../components/UploadImages";
import TagImages from "../components/tagImages";
import AboutUS from "../components/aboutUs";
import AboutProject from "../components/aboutProject";


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


    getAttachedFiles = (files) => {
        this.setState({
            files: files
        }, () => {
            this.setState({images_uploaded: true})
        })

    };


    render() {

        return (
            <div>
                <div className="row drag-drop-row">
                    {this.state.images_uploaded === false ? <UploadImages fileLoader={this.getAttachedFiles}/> :
                        <TagImages files={this.state.files}/>}
                </div>
                {this.state.images_uploaded === false ?
                    <div className="row about-row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-6">
                            <AboutUS/>
                        </div>
                        <div className="col-md-3">
                        </div>
                    </div> : <div/>}
                {this.state.images_uploaded === false ?
                    <div className="row drag-drop-row">
                    </div> : <div/>}
                {this.state.images_uploaded === false ?
                    <div className="row about-row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-6">
                            <AboutProject/>
                        </div>
                        <div className="col-md-3">
                        </div>
                    </div> : <div/>}
            </div>


        );
    }
}

export default withCookies(MainPage);
