import React, {createRef} from 'react';
import Dropzone from 'react-dropzone';
import {withCookies} from "react-cookie";
import "../styles/image_uploader.css";
import "../styles/tag_images.css";
import axios, {post} from 'axios';
import Geocode from "react-geocode";


// Enable or disable logs. Its optional.
Geocode.enableDebug();

//Replace with your api key
const geocode_api_key = "AIzaSyAna5N6fVGHuVmczSgeNfQdBaG-alpGVmQ"
Geocode.setApiKey(geocode_api_key);
//Beginning of the React component ImageUploader
class TagImages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            forms_data: [],
            images_src: [],
            error_code:null,
            message:null
        }
    }

    componentWillMount() {
        this.loadImages(this.props.files)
    }

    loadImages = (files) => {
        //Files are html file objects
        //Make image urls from the files so we can preview them
        let images_src = []
        for (let file of files) {
            images_src.push(URL.createObjectURL(file))
        }
        this.setState({
            files:files
        })
        this.setState({
            images_src: images_src
        })
    }
    onInputChange = (event) => {
            this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        //Upload Files One by One
        let file_count = 0
        for (let file of this.state.files) {
            let file_description = this.state["tags_"+file_count]
            let file_location = this.state["location_"+file_count]
            this.uploadDropfile(file,file_description,file_location).then((response) => {
                console.log(response)
            })
        }
    }
    uploadDropfile(file,file_description,file_location) {
        const url = 'http://127.0.0.1:5000/upload_file';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('file_description', file_description);
        formData.append('file_location', file_location);

        // Get latidude & longitude from address. If you get request denied, reach out i will help debug
        Geocode.fromAddress(file_location).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
          },
          error => {
            console.error(error);
          }
        );
        //Set some headers, Acess controll allow origin allows you to upload files from loclahost:3000 (where react runs) to
        //http://127.0.0.1:5000 where flask is running.
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
        }
        //axios is a request library used for react to perform HTTP POST/GET requests easily.
        //url - is the post url
        //formData - is the data you wanted to post
        //config is http headers of a http request.
        //in .then method , the response object is the response from your flask url
        console.log("Data being posted")
        for (var pair of formData.entries()) {
                 console.log(pair[0]+ ', ' + pair[1]);
}

        return axios.post(url, formData, config).then(response => {
            this.setState({
                    error_code:response["response_code"],
                    message:response["message"]
                })
        })
    }
    render() {
        let forms_html = []
        let image_count = 0
        for (let form of this.state.images_src) {
            forms_html.push(<div className="col-md-4">
                <form>
                    <div className={"row"}>
                        <img height={"300"} width={"300"} src={form}/>
                    </div>
                    <div className={"row add-top-padding"}>

                        <div className="input-group ">
                            <div className="input-group-prepend">
                                <span style={{'color':'white'}} className="input-group-text input-text">Description</span>
                            </div>
                            <input className="basic-slide" id="tags" name={"tags_" + image_count.toString()} type="text"
                                   placeholder="Describe the image" onChange={this.onInputChange} />
                        </div>


                    </div>
                    <div className={"row add-top-padding"}>

                         <div className="input-group">
                            <div className="input-group-prepend">
                                <span style={{'color':'white'}}  className="input-group-text input-text">Location</span>
                            </div>
                           <input className="basic-slide" id="tags" name={"location_" + image_count.toString()} type="text"
                                   placeholder="Location of the image" onChange={this.onInputChange} />
                        </div>

                    </div>

                </form>
            </div>)
            image_count = image_count + 1
        }
        return (
            <div className="container tagzone-container">
                {this.state.message ?<div className="row">
                </div>:<div></div>}
                <div className="row">
                    {forms_html}
                </div>
                <a href="#" className="fancy-button bg-gradient1"
                   onClick={this.handleSubmit}><span>Finish Uploading</span></a>
            </div>
        );
    }
}

export default withCookies(TagImages);
