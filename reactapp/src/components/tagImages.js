import React, {createRef} from 'react';
import Dropzone from 'react-dropzone';
import "../styles/image_uploader.css";
import "../styles/tag_images.css";
import Geocode from "react-geocode";
import PropTypes from 'prop-types';
import {firebaseCollectionName, firebaseUser, firestore_collection, storage} from "../firebaseconfig";
import {nav} from "../utils/nav";
import uuid from 'uuid';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {Helmet} from "react-helmet/es/Helmet";

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
/** TODO Google API is not currently used.
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
            progress: [],
            images_src: [],
            error_code: null,
            message: null,
            add_images_flag: false
        };
        this.removeFile = this.removeFile.bind(this);
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
        });

        /** Initialize progress bars */
        let progress_bars = Array(files.length).fill(0);
        this.setState({progress: progress_bars});
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
         *  TODO: The user experience can be improved by 1) showing a progress bar to indicate images uploaded
         **/
        e.preventDefault();
        //Upload Files One by One
        let file_count = 0;
        for (let file of this.state.files) {
            let file_description = this.state["tags_" + file_count];
            let file_location = this.state["location_" + file_count];
            let file_category = this.state["category_" + file_count];
            if (file_description === undefined)
                file_description = '';
            if (file_location === undefined)
                file_location = '';
            if (file_category === undefined)
                file_category = '';
            this.uploadDropfile(file, file_description, file_location, file_category, file_count)
                .then((response) => {
                    console.log("File Successfully Uploaded");
                    nav("/thankyou");
                })
                .catch(error => {
                    console.error(error);
                    window.alert('File not successfully uploaded.');
                });
            file_count += 1;
        }
    };

    uploadDropfile = async (file, file_description, file_location, file_category, file_idx) => {
        try {
            // { firebase user } / { ID }.{ file extension }
            const uploadName = `${firebaseUser}/${uuid.v4()}.${file.name.split('.').pop()}`;
            let uploadToFirebase = storage.ref(`${firebaseCollectionName}/${uploadName}`).put(file);
            console.log(`Uploading to ${firebaseCollectionName}/${uploadName}`);
            await uploadToFirebase.on('state_changed', (snapshot) => {
                // Show progress of the image upload
                let progress_bars = this.state.progress.slice();
                // Note: The granularity measured by the firebase library only applies to big files for all others
                //The progress bar doesnt make much difference
                progress_bars[file_idx] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({progress: progress_bars});
            }, (error) => {
                console.error('upload error');
                console.error(error);
            }, () => {
                //Call this method on complete
                storage.ref(firebaseCollectionName).child(uploadName).getDownloadURL().then(url => {
                    firestore_collection.add({
                        url: url,
                        description: file_description,
                        location: file_location,
                        category: file_category
                    }).then((docRef) => {
                        console.log(`Metadata uploaded ${docRef.path}`);
                    }).catch(e => {
                        console.error('Error when sending metadata.');
                        console.error(e);
                    });
                }).catch(error => {
                    console.error('Error when checking uploaded image.');
                    console.error(error);
                })
            })
        } catch (e) {
            console.log("We are sorry something went wrong while uploading your file. Please try again later.")
        }
    };

    getAttachedFiles = (files) => {
        let all_files = this.state.files.concat(files);
        this.setState({
            files: all_files
        }, () => {
            this.loadImages(all_files);
        });
        this.setState({add_images_flag: false})

    };

    addMoreImages = (e) => {
        e.preventDefault();
        this.setState({add_images_flag: !this.state.add_images_flag})
    };

    removeFile(fileIndex) {
        if (fileIndex >= 0 && fileIndex < this.state.files.length) {
            const files = this.state.files.slice();
            const progress = this.state.progress.slice();
            const images_src = this.state.images_src.slice();
            files.splice(fileIndex, 1);
            progress.splice(fileIndex, 1);
            images_src.splice(fileIndex, 1);
            this.setState({files: files, progress: progress, images_src: images_src});
        }
    }

    render() {
        /**
         * Each image section behvaes like a form of it's own. Currently we upload
         * one image with each request. **/
        let forms_html = [];
        let image_count = 0;
        for (let form of this.state.images_src) {
            const descriptionId = `tags_${image_count}`;
            const locationId = `category_${image_count}`;
            const categoryId = `location_${image_count}`;

            let progress_bar = this.state.progress[image_count];
            let progress_style = {width: progress_bar + "%", height: 7, backgroundColor: 'rgb(35, 51, 64)'};
            const fileIndex = image_count;

            forms_html.push(<div className="col-md-3 form-col" key={image_count}>
                <form className="image-form">
                    <div className="form-group">
                        <div className="image-wrapper" style={{backgroundImage: `url(${form})`}}>
                            <div style={progress_style}/>
                        </div>
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
                                {['Flood', 'Wild Fire', 'Hurricane', 'Tornado', 'Earthquakes', 'Other']
                                    .map((category, index) => (
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
                    <div className="form-group">
                        <div className="window-close-button">
                            <button onClick={(event) => {
                                event.preventDefault();
                                this.removeFile(fileIndex);
                            }}>
                                <span><FontAwesomeIcon icon={faWindowClose}/>Delete</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>);
            image_count = image_count + 1;
        }
        return (
            <div className="row drag-drop-row">
                <Helmet>
                    <title>Upload and describe your pictures</title>
                </Helmet>
                <div className="upload-container tagzone-container">
                    <h3 className="custom-header">Upload pictures and tell us more about them</h3>
                    <h4 className="mb-4">
                        You can upload multiple files at once (Only *.jpeg and *.png images will be accepted)
                    </h4>
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
                            <div className="container">
                                <Dropzone ref={dropzoneRef} accept="image/png,image/jpeg"
                                          onDrop={this.getAttachedFiles} noClick noKeyboard>
                                    {({getRootProps, getInputProps, acceptedFiles}) => {
                                        return (
                                            <div {...getRootProps({className: 'dropzone'})}>
                                                <input {...getInputProps()} />
                                                Drag and Drop files here, or &nbsp;
                                                <span className="href-link"
                                                      onClick={openDialog}><span>Click to select files</span></span>
                                            </div>
                                        );
                                    }}
                                </Dropzone>
                            </div>
                        </div>
                    </div>
                    {/** On click on finish uploading start submitting images to the server **/}
                    {this.state.files.length ? (
                        <div className="btn btn-success btn-lg mt-2" onClick={this.handleSubmit}>
                            <strong>Finish Uploading</strong>
                        </div>
                    ) : ''}
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
export default TagImages;
