import React from "react";
import {HashLink} from "react-router-hash-link";

export class TopLink extends React.Component {
    render() {
        return (
            <div className="text-right py-4">
                <HashLink smooth to="/#home" className="top-link btn btn-outline-dark">&#9650;</HashLink>
            </div>
        );
    }
}
