import React from 'react';
import './App.css';
import {AppContext} from "./components/appContext";
import {MainPage} from "./layouts/mainPage";
import Script from 'react-load-script';
import uuid from "uuid";

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			agree: false,
			google: null,
			geocoder: null,
			autocomplete: null,
			autocompleteSessionToken: null,
			sessionID: uuid.v4()
		};
		this.getAgreement = this.getAgreement.bind(this);
		this.setAgreement = this.setAgreement.bind(this);
	}

	loadGoogleContext() {
		const google = window.google;
		const geocoder = new google.maps.Geocoder();
		const autocomplete = new google.maps.places.AutocompleteService();
		const autocompleteSessionToken = new google.maps.places.AutocompleteSessionToken();
		this.setState({google, geocoder, autocomplete, autocompleteSessionToken});
	}

	getAgreement() {
		return this.state.agree;
	}

	setAgreement(agreement) {
		this.setState({agree: agreement});
	}

	render() {
		const context = {
			getAgreement: this.getAgreement,
			setAgreement: this.setAgreement,
			google: this.state.google,
			geocoder: this.state.geocoder,
			autocomplete: this.state.autocomplete,
			autocompleteSessionToken: this.state.autocompleteSessionToken,
			sessionID: this.state.sessionID
		};
		return (
			<AppContext.Provider value={context}>
				<div className="app container-fluid">
					<MainPage/>
					<Script async defer
							url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
							onLoad={() => this.loadGoogleContext()}/>
				</div>
			</AppContext.Provider>
		);
	}
}
