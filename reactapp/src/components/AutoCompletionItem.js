import React from "react";
import PropTypes from "prop-types";

export class AutoCompletionItem extends React.Component {
	render() {
		// autocomplete-active
		return (
			<div {...(this.props.active ? {className: 'autocomplete-active'} : {})}
				 {...(this.props.onClick ? {onClick: this.props.onClick} : {})}>
				{this.props.value}
			</div>
		);
	}
}

AutoCompletionItem.propTypes = {
	value: PropTypes.string.isRequired,
	active: PropTypes.bool.isRequired,
	onClick: PropTypes.func
};
