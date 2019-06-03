import React from 'react';
import "../styles/final_page.css";
import {Helmet} from "react-helmet/es/Helmet";

/** Renders the final page with a thank you message.
 * TODO: Make GDPR complaint.
 * **/
class FinalPage extends React.Component {

    render() {

        return (
            <div className="upload-container">
                <Helmet>
                    <title>Thanks!</title>
                </Helmet>
                <h3>Thank you for your contribution</h3>
            </div>
        );
    }
}

export default FinalPage;
