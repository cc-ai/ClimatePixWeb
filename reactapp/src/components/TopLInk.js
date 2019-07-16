import React from "react";
import {scrollToElement} from "../utils/scroll";
import PropTypes from 'prop-types';

export class TopLink extends React.Component {
	render() {
		return (
			<div className="text-right">
				<button onClick={() => scrollToElement('home')}
						className={`top-link btn btn-outline-${this.props.white ? 'light' : 'dark'}`}>&#9650;</button>
			</div>
		);
	}
}

TopLink.propTypes = {
	white: PropTypes.bool
};
