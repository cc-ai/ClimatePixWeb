import React from 'react';
import {withCookies} from "react-cookie";
import "../styles/image_uploader.css";

class FinalPage extends React.Component {
    render() {

        return (
            <div className="upload-container">
                <h3>Thank you for your contribution</h3>
            </div>
        );
    }
}

export default withCookies(FinalPage);
