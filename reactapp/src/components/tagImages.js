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
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Helmet} from "react-helmet/es/Helmet";
import {FancyBox} from "./fancyBox";
import axios from 'axios';
import {AgreementContext} from "./agreementContext";
import Header from "./header";

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
const geocode_api_key = process.env.REACT_APP_GOOGLE_API_KEY;
Geocode.setApiKey(geocode_api_key);

class FileMonitor {
    constructor(files, metadata) {
        this.files = files;
        this.metadata = metadata;
        this.progress = Array(metadata.length).fill(0);
        this.uploadNames = Array(metadata.length).fill(null);
        this.metadataSent = Array(metadata.length).fill(false);
    }

    setProgress(index, value) {
        this.progress[index] = value;
        this.sendMetadataIfPossible(index);
    }

    setFinished(index, uploadName) {
        this.uploadNames[index] = uploadName;
        this.sendMetadataIfPossible(index);
    }

    sendMetadataIfPossible(index) {
        if (this.progress[index] === 100 && this.uploadNames[index] !== null) {
            console.log(`[${index}] sending metadata.`);
            const file_description = this.metadata[index].file_description;
            const file_location = this.metadata[index].file_location;
            const file_category = this.metadata[index].file_category;
            const uploadName = this.uploadNames[index];
            storage.ref(firebaseCollectionName).child(uploadName).getDownloadURL().then(url => {
                return firestore_collection.add({
                    url: url,
                    description: file_description,
                    location: file_location,
                    category: file_category
                })
            }).then((docRef) => {
                console.log(`[${index}] metadata uploaded: ${docRef.path}`);
                this.metadataSent[index] = true;
                this.terminateIfPossible();
            }).catch(e => {
                console.error(`[${index}] error when sending metadata.`);
                console.error(e);
            })
        }
    }

    terminateIfPossible() {
        for (let value of this.metadataSent) {
            if (!value)
                return;
        }
        console.log(`All files and metadata sent.`);
        nav("/thankyou");
    }

    start() {
        for (let i = 0; i < this.metadata.length; ++i)
            this.uploadFile(i);
    }

    async uploadFile(index) {
        try {
            console.log(`[${index}] sending file.`);
            const file = this.files[index];
            // { firebase user } / { ID }.{ file extension }
            const uploadName = `${firebaseUser}/${uuid.v4()}.${file.name.split('.').pop()}`;
            let uploadToFirebase = storage.ref(`${firebaseCollectionName}/${uploadName}`).put(file);
            await uploadToFirebase.on('state_changed', (snapshot) => {
                // Show progress of the image upload
                const progressBar = document.getElementById(`progress-${index}`);
                if (progressBar) {
                    const progressWrapper = progressBar.parentNode;
                    if (progressWrapper.style.display === 'none') {
                        progressWrapper.style.display = 'flex';
                    }
                    const step = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    progressBar.style.width = `${step}%`;
                    progressBar.setAttribute('aria-valuenow', parseInt(step));
                    this.setProgress(index, parseInt(step));
                }
            }, (error) => {
                console.error(`Error while uploading file ${index}.`);
                console.error(error);
            }, () => {
                console.log(`File uploaded: ${firebaseCollectionName}/${uploadName}`);
                this.setFinished(index, uploadName);
            });
        } catch (e) {
            console.log("We are sorry something went wrong while uploading your file. Please try again later.");
        }
    };
}

/** Renders a Component that loads the images uploaded in the previous page/home page and displays a previous and
 * renders an input form for each image to enter description and geo tags
 * **/
export class TagImages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            images_src: [],
            error_code: null,
            message: null,
            add_images_flag: false,
            showAgreement: false,
            license: null,
            sending: false
        };
        this.loadLicense = this.loadLicense.bind(this);
        this.onChangeShowAgreement = this.onChangeShowAgreement.bind(this);
        this.loadImages = this.loadImages.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAttachedFiles = this.getAttachedFiles.bind(this);
        this.removeFile = this.removeFile.bind(this);
    }

    loadLicense() {
        if (this.state.license)
            return;
        const url = `${process.env.PUBLIC_URL}/LICENSE`;
        axios({
            method: 'get',
            url: url,
            responseType: 'txt'
        })
            .then(reponse => {
                // Is this possible?
                if (!reponse)
                    throw new Error(`No image available for address ${url}`);
                this.setState({license: reponse.data});
            })
            .catch(error => {
                console.error(error);
            });
    }

    onChangeShowAgreement(value) {
        this.setState({showAgreement: value});
    }

    /** When we are routed to this page after uploading images earlier, we receive a list of HTML file objects. To display
     * the images for preview we need to create a URL object that can be passed to the src of img html element
     * This method iterates through all the files and generates a list of img URLs to display
     * **/
    loadImages(files) {
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
    };

    /** When there is a change in the input attached to an images, see the event and attach the data entered to the state object
     * **/
    onInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit(e) {
        /** Method called after hitting finish uploading. Using
         * current files in this.state.files and the input name tags send image and their meta data to the
         * uploadDropfile method Note, we are currently uploading one image at a time to avoid large data uploads.
         **/
        e.preventDefault();
        //Upload Files One by One
        this.setState({sending: true});
        const metadata = this.state.files.map((file, fileIndex) => {
            let file_description = this.state["tags_" + fileIndex];
            let file_location = this.state["location_" + fileIndex];
            let file_category = this.state["category_" + fileIndex];
            if (file_description === undefined)
                file_description = '';
            if (file_location === undefined)
                file_location = '';
            if (file_category === undefined)
                file_category = '';
            return {
                file_description: file_description,
                file_location: file_location,
                file_category: file_category
            };
        });
        const fileMonitor = new FileMonitor(this.state.files, metadata);
        fileMonitor.start();
    };

    getAttachedFiles(files) {
        let all_files = this.state.files.concat(files);
        this.setState({
            files: all_files
        }, () => {
            this.loadImages(all_files);
        });
        this.setState({add_images_flag: false})

    };

    removeFile(fileIndex) {
        if (fileIndex >= 0 && fileIndex < this.state.files.length) {
            const files = this.state.files.slice();
            const images_src = this.state.images_src.slice();
            files.splice(fileIndex, 1);
            images_src.splice(fileIndex, 1);
            this.setState({files: files, images_src: images_src});
        }
    }

    render() {
        /**
         * Each image section behvaes like a form of it's own. Currently we upload
         * one image with each request. **/
        const agreement = this.context;
        let forms_html = [];
        let image_count = 0;
        for (let form of this.state.images_src) {
            const descriptionId = `tags_${image_count}`;
            const categoryId = `category_${image_count}`;
            const locationId = `location_${image_count}`;
            const fileIndex = image_count;

            forms_html.push(<div className="col-md-3 form-col" key={image_count}>
                <form className="image-form">
                    <div className="form-group">
                        <div className="image-wrapper" style={{backgroundImage: `url(${form})`}}>
                            <div className="progress" style={{display: 'none'}}>
                                <div className="progress-bar"
                                     id={`progress-${fileIndex}`}
                                     role="progressbar"
                                     aria-valuenow="0"
                                     aria-valuemin="0"
                                     aria-valuemax="100"/>
                            </div>
                            <div className="window-close-button">
                                <button onClick={(event) => {
                                    event.preventDefault();
                                    this.removeFile(fileIndex);
                                }}>
                                    <span><FontAwesomeIcon icon={faTrashAlt}/></span>
                                </button>
                            </div>
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
                </form>
            </div>);
            image_count = image_count + 1;
        }
        return (
            <div>
                <Helmet>
                    <title>Upload and describe your pictures</title>
                </Helmet>
                <Header/>
                <div>
                    <div className="upload-container">
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
                        {this.state.files.length && !this.state.sending ? (
                            <div className="upload-form-wrapper">
                                <form>
                                    <div className="form-check">
                                        <input type="checkbox"
                                               className="form-check-input"
                                               id="agree-license"
                                               checked={agreement.get()}
                                               onChange={(event) => agreement.set(event.target.checked)}/>
                                        <strong>
                                            <label className="form-check-label" htmlFor="agree-license">
                                                I agree with the&nbsp;
                                            </label>
                                            <span className="link-license"
                                                  onClick={() => this.onChangeShowAgreement(true)}>
                                            license
                                        </span>.
                                        </strong>
                                    </div>
                                </form>
                                <button className="finish-uploading btn btn-success btn-lg mt-2 mb-4"
                                        disabled={!agreement.get()}
                                        onClick={this.handleSubmit}>
                                    <strong>Finish Uploading</strong>
                                </button>
                            </div>
                        ) : ''}
                    </div>
                    {this.state.showAgreement && (
                        <FancyBox title={'LICENSE'} onClose={() => this.onChangeShowAgreement(false)}>
                        <pre className="license">
                            {this.state.license ? this.state.license : `Loading agreement ...`}
                        </pre>
                        </FancyBox>
                    )}
                </div>
            </div>
        );
    }

    componentWillMount() {
        if (this.props.location.state)
            this.loadImages(this.props.location.state.files);
    }

    componentDidMount() {
        this.loadLicense();
    }
}

TagImages.contextType = AgreementContext;
TagImages.displayName = "Tag Images with Description And GeoTags";
TagImages.propTypes = {
    /** List of image File objects. */
    files: PropTypes.array
};
TagImages.defaultProps = {
    files: []
};
