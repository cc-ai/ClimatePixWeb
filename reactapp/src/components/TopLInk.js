import React from "react";
import {scrollToElement} from "../utils/scroll";

export class TopLink extends React.Component {
    render() {
        return (
            <div className="text-right py-4">
                <button onClick={() => scrollToElement('home')}
                        className="top-link btn btn-outline-dark">&#9650;</button>
            </div>
        );
    }
}
