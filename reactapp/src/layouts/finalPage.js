import React from 'react';
import "../styles/final_page.css";
import {Helmet} from "react-helmet/es/Helmet";
import {Link} from "react-router-dom";
import Header from "../components/header";

/** Renders the final page with a thank you message.
 * **/
export class FinalPage extends React.Component {

    render() {

        return (
            <div>
                <Helmet>
                    <title>Thanks!</title>
                </Helmet>
                <Header/>
                <div className="upload-container thank-you">
                    <h3>
                        Thank you for your contribution!<br/>
                        For more information about the project,&nbsp;
                        <a target="_blank" rel="noopener noreferrer"
                           className="learn-more"
                           href="https://mila.quebec/en/ai-society/visualizing-climate-change/">
                            <strong>click here</strong>
                        </a>.
                    </h3>
                    <div className="w-75 m-auto">
                        <p className="mt-5">
                            <Link className="btn btn-success" to='/uploadwithtags'>
                                <strong>Upload more</strong>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
