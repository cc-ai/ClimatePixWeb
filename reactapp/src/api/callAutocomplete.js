export function callAutocomplete(address, googleContext, onresult, onerror) {
	const addressForUrl = address;
	// Add a random string at the end to prevent browser for using the cache.
	googleContext.autocomplete.getPlacePredictions(
		{input: addressForUrl, types: ['(cities)'], sessionToken: googleContext.sessionToken},
		(predictions, status) => {
		if (status !== googleContext.google.maps.places.PlacesServiceStatus.OK) {
			if (onerror)
				onerror(new Error(`Unable to get autocompletion for ${addressForUrl}. Status ${status}.`));
			return;
		}
		const descriptions = [];
		predictions.forEach(function (prediction) {
			descriptions.push(prediction.description);
			if (onresult) {
				onresult(descriptions);
			}
		});
	});
}
