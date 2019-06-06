import React from 'react';
import "../styles/final_page.css";
import {Helmet} from "react-helmet/es/Helmet";
import PropTypes from 'prop-types';

/** Renders the final page with a thank you message.
 * **/
export class FinalPage extends React.Component {

    render() {

        return (
            <main>
                <Helmet>
                    <title>Thanks!</title>
                </Helmet>
                <div className="upload-container thank-you">
                    <h3 className="custom-header">Thank you for your contribution!<br/></h3>
                    <h4>
                        For more information about the project,&nbsp;
                        <a target="_blank" rel="noopener noreferrer"
                           className="learn-more"
                           href="https://mila.quebec/en/ai-society/visualizing-climate-change/">
                            <strong>click here</strong>
                        </a>.
                    </h4>
                    <div className="w-75 m-auto">
                        <p className="mt-5">
                            <button className="btn btn-success" onClick={this.props.loadTagsForm}>
                                <strong>Upload more</strong>
                            </button>
                        </p>
                    </div>
                </div>
            </main>
        );
    }
}

FinalPage.propTypes = {
    loadTagsForm: PropTypes.func.isRequired
};