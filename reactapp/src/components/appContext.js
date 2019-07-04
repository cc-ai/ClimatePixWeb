import React from 'react';

export const AppContext = React.createContext({
	getAgreement: () => {
	},
	setAgreement: () => {
	},
	google: null,
	geocoder: null,
	autocomplete: null,
	autocompleteSessionToken: null,
	sessionID: null
});
