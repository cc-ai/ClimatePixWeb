import React from 'react';
import PropTypes from 'prop-types';
import '../styles/fancyBox.css';

const TIMES = '\u00D7';

export class FancyBox extends React.Component {
	render() {
		const onClickFancyBox = (event) => {
			if (event.hasOwnProperty('cancelBubble'))
				event.cancelBubble = true;
			if (event.stopPropagation)
				event.stopPropagation();
		};
		return (
			<div className="fancy-wrapper" onClick={this.props.onClose}>
				<div className="fancy-box container d-flex flex-column" onClick={onClickFancyBox}>
					<div className="row fancy-bar">
						<div className="col-9 align-self-center fancy-title">
							<strong>{this.props.title}</strong>
						</div>
						<div className="col-3 fancy-button">
							<button className="btn btn-danger" onClick={this.props.onClose}>
								<strong>{TIMES}</strong>
							</button>
						</div>
					</div>
					<div className="flex-grow-1 fancy-content">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}


FancyBox.propTypes = {
	title: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired
};
