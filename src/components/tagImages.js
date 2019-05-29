import React, {createRef} from 'react';
import Dropzone from 'react-dropzone';
import {withCookies} from "react-cookie";
import "../styles/image_uploader.css";
import "../styles/tag_images.css";
import axios, {post} from 'axios';
import Geocode from "react-geocode";
import PropTypes from 'prop-types';
/** Setup for dropzone component. createRef is for creating access/reference to the HTML page's DOM **/
const dropzoneRef = createRef();
/** Define a function openDialog, that can open the file picker when you click the button to select files from a folder to upload **/
const openDialog = () => {
    /** Note that the ref is set async so it might be null at some point **/
    if (dropzoneRef.current) {
        dropzoneRef.current.open()
    }
};

/** Enable or disable logs. Its optional **/
Geocode.enableDebug();

/** Replace with your api key **/
/** TODO:REPLACE with your key for google project - My test key is locked to my IP Address
 *
 *  **/
const geocode_api_key = "AIzaSyAna5N6fVGHuVmczSgeNfQdBaG-alpGVmQ"
Geocode.setApiKey(geocode_api_key);

/** Renders a Component that loads the images uploaded in the previous page/home page and displays a previous and
 * renders an input form for each image to enter description and geo tags
 * **/
class TagImages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            forms_data: [],
            images_src: [],
            error_code: null,
            message: null,
            add_images_flag: false
        }
    }

    componentWillMount() {
        this.loadImages(this.props.files)
    }

    /** When we are routed to this page after uploading images earlier, we receive a list of HTML file objects. To display
     * the images for preview we need to create a URL object that can be passed to the src of img html element
     * This method iterates through all the files and generates a list of img URLs to display
     * **/
    loadImages = (files) => {
        let images_src = []
        for (let file of files) {
            images_src.push(URL.createObjectURL(file))
        }
        this.setState({
            files: files
        })
        this.setState({
            images_src: images_src
        })
    };
    /** When there is a change in the input attached to an images, see the event and attach the data entered to the state object
     * **/
    onInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
    handleSubmit = (e) => {
        /** Method called after hitting finish uploading. Using
         * current files in this.state.files and the input name tags send image and their meta data to the
         * uploadDropfile method Note, we are currently uploading one image at a time to avoid large data uploads.
         * TODO: The user experience can be improved by 1) showing a progress bar to indicate images uploaded
         **/
        e.preventDefault();
        //Upload Files One by One
        let file_count = 0
        for (let file of this.state.files) {
            let file_description = this.state["tags_" + file_count]
            let file_location = this.state["location_" + file_count]
            this.uploadDropfile(file, file_description, file_location).then((response) => {
                console.log(response)
            })
        }
    }

    uploadDropfile(file, file_description, file_location) {
        const url = 'http://127.0.0.1:5000/upload_file';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('file_description', file_description);
        formData.append('file_location', file_location);

        /** Get latidude & longitude from address. If you get request denied, reach out i will help debug **/
        /** TODO: Took out the lat lang response here so the project build doesnt fail but make sure to update the api call to send the latitude and longitude instead
         * **/
        Geocode.fromAddress(file_location).then(
            response => {
                const {lat, lng} = response.results[0].geometry.location;
                formData.append('file_location', lat.toString() + "," + lng.toString());
            },
            error => {
                console.error(error);
            }
        );
        /** Set some headers, Access control to allow origin allows you to upload files from loclahost:3000 (where react runs) to
         http://127.0.0.1:5000 where flask is running. **/
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
        }

        /** Print the data being sent to the api**/
        /** TODO: Remove this in production
         * **/
        console.log("Data being posted")
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        /** axios is a request library used for react to perform HTTP POST/GET requests easily.
         url - is the post url
         formData - is the data you wanted to post
         config is http headers of a http request.
         in .then method , the response object is the response from your flask url **/
        return axios.post(url, formData, config).then(response => {
            this.setState({
                error_code: response["response_code"],
                message: response["message"]
            })
        })
    }

    getAttachedFiles = (files) => {
        let all_files = this.state.files.concat(files)
        this.setState({
            files: all_files
        }, () => {
            this.loadImages(all_files)
        })
        this.setState({add_images_flag: false})

    }

    addMoreImages = (e) => {
        e.preventDefault()
        this.setState({add_images_flag: !this.state.add_images_flag})
    }

    render() {
        /** TODO: Implement a progress bar to show how many images are uploaded
         * Each image section behvaes like a form of it's own. Currently we upload
         * one image with each request. **/
        let forms_html = []
        let image_count = 0
        for (let form of this.state.images_src) {
            forms_html.push(<div className="col-md-3 form-col">
                <form className="form add-img-padding">
                    <div className={"row add-img-padding"}>
                        <img height={"300"} width={"300"} src={form}/>
                    </div>
                    <div className={"row add-top-padding"}>
                        <div className="input-group ">
                            <div className="input-group-prepend">
                                <span style={{'color': 'white'}}
                                      className="input-group-text input-text">Description</span>
                            </div>
                            <input className="basic-slide" id="tags" name={"tags_" + image_count.toString()} type="text"
                                   placeholder="Describe the image" onChange={this.onInputChange}/>
                        </div>
                    </div>
                    <div className={"row add-top-padding"}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span style={{'color': 'white'}} className="input-group-text input-text">Location</span>
                            </div>
                            <input className="basic-slide" id="tags" name={"location_" + image_count.toString()}
                                   type="text"
                                   placeholder="Location of the image" onChange={this.onInputChange}/>
                        </div>
                    </div>
                </form>
            </div>)
            image_count = image_count + 1
        }
        return (
            <div className="upload-container tagzone-container">
                <h3 className="custom-header">Tell us more about these images</h3>
                {/** If there is a message from the api request show this underneath the header **/}
                {this.state.message ? <div className="row">
                </div> : <div></div>}
                <div className="row">
                    {/** Add forms and image previews to the DOM **/}
                    {forms_html}
                    <div className="col-md-3 form-col">
                        {/** Another dropzone component to allow users to add more images while adding the metadata **/}
                        {/** Show the upload section if the add images flag is set to true. This flag is toggled
                         by the addMoreImages method **/}
                        {this.state.add_images_flag == true ? <div className="upload-container">
                                <Dropzone className="dropzone-container" ref={dropzoneRef} accept="image/png, image/jpg"
                                          onDrop={this.getAttachedFiles} noClick noKeyboard>
                                    {({getRootProps, getInputProps, acceptedFiles}) => {
                                        return (
                                            <div className="container">
                                                <div {...getRootProps({className: 'dropzone'})}>
                                                    <input {...getInputProps()} />
                                                    <a href="#" className="href-link"
                                                       onClick={openDialog}><span>Click to select files</span></a>
                                                </div>
                                            </div>);
                                    }}
                                </Dropzone>
                            </div> :
                            <button type="button" className="btn btn-default btn-circle btn-xl"
                                    onClick={this.addMoreImages}>
                                Add More Images
                            </button>}

                    </div>
                </div>
                {/** On click on finish uploading start submitting images to the server **/}
                <a href="#" className="fancy-button bg-gradient1"
                   onClick={this.handleSubmit}><span>Finish Uploading</span></a>
            </div>
        );
    }
}
TagImages.displayName = "Tag Images with Description And GeoTags"
TagImages.propTypes = {
    /** List of image File objects. */
    files: PropTypes.array
};
TagImages.defaultProps = {
    files:[]
}
export default withCookies(TagImages);
