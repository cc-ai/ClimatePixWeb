import React from "react";

/**
 * Content for About Us Section on the landing/home page.
 * TODO: Edit about us section content with the appropriate content
 */
class AboutProject extends React.Component {
    render() {
        return (
            <div className="row about-us" id="about-project">
                <h2> What is this project ? </h2>
                <p className="bigP text-center">
                    Our project aims to raise awareness and conceptual understanding
                    of climate change by bringing the future closer. More info &nbsp;
                    <strong><a target="_blank" href="https://mila.quebec/en/ai-society/visualizing-climate-change/">here</a></strong>.
                </p>
            </div>
        )

    }
}

export default AboutProject;
