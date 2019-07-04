import React from "react";
import {AppContext} from "./appContext";
import {callAutocomplete} from "../api/callAutocomplete";
import {AutoCompletionItem} from "./AutoCompletionItem";
import PropTypes from 'prop-types';
import '../styles/location_input.css';

export class LocationInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			places: [],
			currentFocus: -1,
			autocomplete: true,
			autocompleteHasFocus: false
		};
		this.onInputFocus = this.onInputFocus.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		this.onAddressChanged = this.onAddressChanged.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.choosePlace = this.choosePlace.bind(this);
		this.hasPlaces = this.hasPlaces.bind(this);
		this.onCompletionFocus = this.onCompletionFocus.bind(this);
		this.onCompletionBlur = this.onCompletionBlur.bind(this);
	}

	onInputFocus() {
		this.setState({autocomplete: true});
	}

	onInputBlur() {
		if (!this.state.autocompleteHasFocus)
			this.setState({autocomplete: false});
	}

	onCompletionFocus() {
		this.setState({autocompleteHasFocus: true});
	}

	onCompletionBlur() {
		this.setState({autocompleteHasFocus: false});
	}

	onAddressChanged(event) {
		const value = event.target.value;
		this.props.setAddress(this.props.id, value);
		this.setState({
			currentFocus: -1,
			autocomplete: true,
			places: (value ? this.state.places : [])
		});
		if (value) {
			callAutocomplete(value, this.context, results => {
				this.setState({places: results});
			}, error => {
				console.log(error);
				this.setState({places: []});
			});
		}
	}

	onKeyDown(event) {
		if (!this.hasPlaces())
			return;
		const nbPlaces = this.state.places.length;
		let preventDefault = false;
		let addressChanged = false;
		let address = '';
		let currentFocus = this.state.currentFocus;
		let autocomplete = this.state.autocomplete;
		let autocompleteHasFocus = this.state.autocompleteHasFocus;
		if (event.keyCode === 13) { // enter
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			if (autocomplete && currentFocus !== -1) {
				address = this.state.places[currentFocus];
				autocomplete = autocompleteHasFocus = false;
				addressChanged = preventDefault = true;
			}
		} else if (event.keyCode === 27) { // escape
			autocomplete = autocompleteHasFocus = false;
		} else if (event.keyCode === 40) { // down
			/*If the arrow DOWN key is pressed, increase the currentFocus variable:*/
			++currentFocus;
			if (currentFocus >= nbPlaces)
				currentFocus = 0;
			autocomplete = preventDefault = true;
		} else if (event.keyCode === 38) { //up
			/*If the arrow UP key is pressed, decrease the currentFocus variable:*/
			--currentFocus;
			if (currentFocus < 0)
				currentFocus = nbPlaces - 1;
			autocomplete = preventDefault = true;
		}
		if (preventDefault)
			event.preventDefault();
		this.setState({
			currentFocus: currentFocus,
			autocomplete: autocomplete,
			autocompleteHasFocus: autocompleteHasFocus
		});
		if (addressChanged)
			this.props.setAddress(this.props.id, address);
	}

	choosePlace(currentFocus) {
		const address = this.state.places[currentFocus];
		this.setState({
			currentFocus: currentFocus,
			autocomplete: false,
			autocompleteHasFocus: false
		});
		this.props.setAddress(this.props.id, address);
	}

	hasPlaces() {
		return this.state.places.length > 0 && (this.state.places.length !== 1 || this.state.places[0] !== this.state.address);
	}

	render() {
		const locationId = this.props.id;
		const output = [
			<input className="form-control input"
				   id={locationId}
				   key={locationId}
				   name={locationId}
				   type="text"
				   placeholder="City of the image"
				   value={this.props.getAddress(locationId)}
				   onFocus={this.onInputFocus}
				   onBlur={this.onInputBlur}
				   onKeyDown={this.onKeyDown}
				   onChange={this.onAddressChanged}/>
		];
		if (this.state.autocomplete && this.hasPlaces()) {
			output.push(
				<div key={`autocomplete-list-${locationId}`}
					 onMouseEnter={this.onCompletionFocus}
					 onMouseLeave={this.onCompletionBlur}
					 className="autocomplete-items">
					{this.state.places.map((place, i) => (
						<AutoCompletionItem active={this.state.currentFocus === i}
											onClick={() => this.choosePlace(i)}
											value={place}
											key={i}/>))}
				</div>
			);
		}
		return output;
	}
}

LocationInput.contextType = AppContext;
LocationInput.propTypes = {
	id: PropTypes.string.isRequired,
	setAddress: PropTypes.func.isRequired,
	getAddress: PropTypes.func.isRequired
};
