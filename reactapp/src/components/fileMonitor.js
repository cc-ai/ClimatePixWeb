import {firebaseCollectionName, firebaseUser, firestore_collection, storage} from "../firebaseconfig";
import uuid from "uuid";

function padInt(value, length) {
	let representation = `${value}`;
	let padding = '';
	if (length > representation.length) {
		for (let i = 0; i < (length - representation.length); ++i)
			padding += '0';
	}
	return `${padding}${representation}`;
}

export class FileMonitor {
	constructor(sessionID, files, metadata, onEnd, onError) {
		const currentTime = new Date();
		const y = currentTime.getFullYear();
		const m = currentTime.getMonth();
		const d = currentTime.getDate();
		const h = currentTime.getHours();
		const min = currentTime.getMinutes();
		const s = currentTime.getSeconds();
		const millis = currentTime.getMilliseconds();
		const datePieces = [padInt(y, 4), padInt(m, 2), padInt(d, 2)];
		const timePieces = [padInt(h, 2), padInt(min, 2), padInt(s, 2), padInt(millis, 3)];
		this.files = files;
		this.metadata = metadata;
		this.progress = Array(metadata.length).fill(0);
		this.uploadNames = Array(metadata.length).fill(null);
		this.metadataSent = Array(metadata.length).fill(false);
		this.onEnd = onEnd;
		this.onError = onError;
		this.sessionID = sessionID;
		this.dateFormat = `${datePieces.join('-')}-at-${timePieces.join('-')}`;
	}

	getFullSessionID() {
		return `${firebaseUser}/${this.sessionID}`;
	}

	getUploadID() {
		return `${this.getFullSessionID()}/${this.dateFormat}`;
	}

	setProgress(index, value) {
		this.progress[index] = value;
		this.sendMetadataIfPossible(index);
	}

	setFinished(index, uploadName) {
		this.uploadNames[index] = uploadName;
		this.sendMetadataIfPossible(index);
	}

	sendMetadataIfPossible(index) {
		if (this.progress[index] === 100 && this.uploadNames[index] !== null) {
			console.log(`[${index}] sending metadata.`);
			const file_location = this.metadata[index].file_location;
			const file_category = this.metadata[index].file_category;
			const uploadName = this.uploadNames[index];
			storage.ref(firebaseCollectionName).child(uploadName).getDownloadURL().then(url => {
				return firestore_collection.add({
					url: url,
					location: file_location,
					category: file_category
				})
			}).then((docRef) => {
				console.log(`[${index}] metadata uploaded.`);
				this.metadataSent[index] = true;
				this.terminateIfPossible();
			}).catch(e => {
				console.error(`[${index}] error when sending metadata.`);
				console.error(e);
			})
		}
	}

	terminateIfPossible() {
		for (let value of this.metadataSent) {
			if (!value)
				return;
		}
		console.log(`All files and metadata sent.`);
		if (this.onEnd)
			this.onEnd(this.getFullSessionID(), this.dateFormat);
	}

	start() {
		for (let i = 0; i < this.metadata.length; ++i)
			this.uploadFile(i);
	}

	async uploadFile(index) {
		try {
			console.log(`[${index}] sending file.`);
			const file = this.files[index];
			// { firebase user } / { ID }.{ file extension }
			const uploadName = `${this.getUploadID()}/${uuid.v4()}.${file.name.split('.').pop()}`;
			let uploadToFirebase = storage.ref(`${firebaseCollectionName}/${uploadName}`).put(file);
			await uploadToFirebase.on('state_changed', (snapshot) => {
				// Show progress of the image upload
				const progressBar = document.getElementById(`progress-${index}`);
				if (progressBar) {
					const progressWrapper = progressBar.parentNode;
					if (progressWrapper.style.display === 'none') {
						progressWrapper.style.display = 'flex';
					}
					const step = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					progressBar.style.width = `${step}%`;
					progressBar.setAttribute('aria-valuenow', parseInt(step));
					this.setProgress(index, parseInt(step));
				}
			}, (error) => {
				console.error(`Error while uploading file ${index}.`);
				console.error(error);
			}, () => {
				console.log(`[${index}] File uploaded.`);
				this.setFinished(index, uploadName);
			});
		} catch (e) {
			const errorMessage = `Something went wrong while uploading your file. Please try again later.`;
			console.log(`[${index}] ${errorMessage}`);
			if (this.onError)
				this.onError(errorMessage);
		}
	};
}
