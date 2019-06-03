import React from 'react';
import "../styles/final_page.css";
import {Helmet} from "react-helmet/es/Helmet";
import {Link} from "react-router-dom";

/** Renders the final page with a thank you message.
 * **/
class FinalPage extends React.Component {

    render() {

        return (
            <div className="upload-container">
                <Helmet>
                    <title>Thanks!</title>
                </Helmet>
                <h3>Thank you for your contribution</h3>
                <div className="w-75 m-auto">
                <p className="mt-5">
                    <a target="_blank" rel="noopener noreferrer"
                       className="btn btn-success btn-lg btn-block"
                       href="https://mila.quebec/en/ai-society/visualizing-climate-change/">
                        <strong>Learn more</strong>
                    </a>
                </p>
                <p className="mt-5">
                    <Link className="btn btn-success btn-lg btn-block" to='/uploadwithtags'>
                        <strong>Upload more</strong>
                    </Link>
                </p>
                </div>
            </div>
        );
    }
}

export default FinalPage;
