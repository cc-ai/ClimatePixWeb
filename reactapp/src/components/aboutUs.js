import React from "react";

/**
 * Content for About Us Section on the landing/home page.
 */
export class AboutUS extends React.Component {
    render() {
        return (
            <div className="about-us" id="about">
                <h2> Who are we ? </h2>
                <p className="bigP">
                    The CCAI project is an interdisciplinary project aimed at creating images of accurate,
                    vivid, and personalized outcomes of climate change. Our goal is to use cutting-edge
                    machine learning techniques to produce images of how neighborhoods and houses will look
                    like following the effects of global warming. By creating a more visceral understanding
                    of the effects of climate change, we aim to strengthen public support for necessary
                    actions and motivate people to make impactful decisions. As a prototype, we first focus
                    on modeling flood consequences on homes.
                </p>
                <p className="bigP">
                    Our project aims to raise awareness and conceptual understanding
                    of climate change by bringing the future closer. More info&nbsp;
                    <strong><a target="_blank" rel="noopener noreferrer"
                               href="https://mila.quebec/en/ai-society/visualizing-climate-change/">here</a></strong>.
                </p>
            </div>
        )

    }
}

AboutUS.displayName = 'About US Section - Landing Page (mainPage.js)';
