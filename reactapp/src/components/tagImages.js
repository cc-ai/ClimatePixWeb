import React, {createRef} from 'react';
import Dropzone from 'react-dropzone';
import {withCookies} from "react-cookie";
import "../styles/image_uploader.css";
import "../styles/tag_images.css";
import axios from 'axios';
import Geocode from "react-geocode";
import PropTypes from 'prop-types';
import {storage,firestore_collection} from "../firebaseconfig";

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
const geocode_api_key = process.env.REACT_APP_GOOGLE_API_KEY;
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
        if (this.props.location.state)
            this.loadImages(this.props.location.state.files);
    }

    /** When we are routed to this page after uploading images earlier, we receive a list of HTML file objects. To display
     * the images for preview we need to create a URL object that can be passed to the src of img html element
     * This method iterates through all the files and generates a list of img URLs to display
     * **/
    loadImages = (files) => {
        let images_src = [];
        for (let file of files) {
            images_src.push(URL.createObjectURL(file))
        }
        this.setState({
            files: files
        });
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
        let file_count = 0;
        for (let file of this.state.files) {
            let file_description = this.state["tags_" + file_count];
            let file_location = this.state["location_" + file_count];
            let file_category = this.state["category_" + file_count];
            this.uploadDropfile(file, file_description, file_location, file_category).then((response) => {
                console.log(response)
            });
            file_count += 1;
        }
    };

    uploadDropfile=(file, file_description, file_location) =>{
    let uploadURL = null
    let uploadToFirebase = storage.ref(`images/${file.name}`).put(file)
    uploadToFirebase.on('state_changed',(snapshot)=>{
        // Show progress of the image upload
    },(error)=>{
        console.log(error)
    },()=>{
        //Call this method on complete
        storage.ref('images').child(file.name).getDownloadURL().then(url => {
            uploadURL = url
            firestore_collection.add({
                url:uploadURL,
                description:file_description,
                location:file_location
            })
        })
    })
}

    getAttachedFiles = (files) => {
        let all_files = this.state.files.concat(files);
        this.setState({
            files: all_files
        }, () => {
            this.loadImages(all_files)
        });
        this.setState({add_images_flag: false})

    };

    addMoreImages = (e) => {
        e.preventDefault();
        this.setState({add_images_flag: !this.state.add_images_flag})
    };

    render() {
        /** TODO: Implement a progress bar to show how many images are uploaded
         * Each image section behvaes like a form of it's own. Currently we upload
         * one image with each request. **/
        let forms_html = [];
        let image_count = 0;
        for (let form of this.state.images_src) {
            const descriptionId = `tags_${image_count}`;
            const locationId = `category_${image_count}`;
            const categoryId = `location_${image_count}`;
            forms_html.push(<div className="col-md-3 form-col" key={image_count}>
                <form className="image-form">
                    <div className="form-group">
                        <div className="image-wrapper" style={{backgroundImage: `url(${form})`}}/>
                    </div>
                    <div className="form-group">
                        <label className="sr-only" htmlFor={descriptionId}>Description</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text input-text">Description</span>
                            </div>
                            <input name={descriptionId} id={descriptionId} type="text" className="form-control"
                                   placeholder="Describe the image" onChange={this.onInputChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="sr-only" htmlFor={categoryId}>Category</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text input-text">Category</span>
                            </div>
                            <select name={categoryId} id={categoryId} onChange={this.onInputChange}
                                    className="form-control custom-select">
                                {[
                                    'Flood',
                                    'Wild Fire',
                                    'Hurricane',
                                    'Tornado',
                                    'Earthquakes',
                                    'Other'
                                ].map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="sr-only" htmlFor={locationId}>Location</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text input-text">Location</span>
                            </div>
                            <input name={locationId} id={locationId} type="text" className="form-control"
                                   placeholder="Location of the image" onChange={this.onInputChange}/>
                        </div>
                    </div>
                </form>
            </div>);
            image_count = image_count + 1;
        }
        return (
            <div className="row drag-drop-row">
            <div className="upload-container tagzone-container">
                <h3 className="custom-header">Tell us more about these images</h3>
                {/** If there is a message from the api request show this underneath the header **/}
                {this.state.message ? <div className="row">
                </div> : <div/>}
                <div className="row">
                    {/** Add forms and image previews to the DOM **/}
                    {forms_html}
                    <div className="col-md-3 form-col">
                        {/** Another dropzone component to allow users to add more images while adding the metadata **/}
                        {/** Show the upload section if the add images flag is set to true. This flag is toggled
                         by the addMoreImages method **/}
                        {this.state.add_images_flag === true ? <div className="upload-container">
                                <Dropzone className="dropzone-container" ref={dropzoneRef} accept="image/png, image/jpg"
                                          onDrop={this.getAttachedFiles} noClick noKeyboard>
                                    {({getRootProps, getInputProps, acceptedFiles}) => {
                                        return (
                                            <div className="container">
                                                <div {...getRootProps({className: 'dropzone'})}>
                                                    <input {...getInputProps()} />
                                                    <span className="href-link"
                                                          onClick={openDialog}><span>Click to select files</span></span>
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
                <div className="fancy-button bg-gradient1" onClick={this.handleSubmit}>
                    <span>Finish Uploading</span>
                </div>
            </div>
            </div>
        );
    }
}

TagImages.displayName = "Tag Images with Description And GeoTags";
TagImages.propTypes = {
    /** List of image File objects. */
    files: PropTypes.array
};
TagImages.defaultProps = {
    files: []
};
export default withCookies(TagImages);
