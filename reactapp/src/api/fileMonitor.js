import firebase from 'firebase/app';
import {firebaseUploadCollection, firebaseUploadCollectionName, storage} from "../firebaseconfig";
var mime = require('mime-types');

export class FileMonitor {
	constructor(files, metadata, onEnd, onError, onProgress) {
		this.files = files;
		this.metadata = metadata;
		this.progress = Array(metadata.length).fill(0);
		this.uploadNames = Array(metadata.length).fill(null);
		this.onEnd = onEnd;
		this.onError = onError;
		this.onProgress = onProgress;
		this.uploadID = null;
		this.imageInfo = [];
	}

	error(exception, info) {
		const errorMessage = `Something went wrong while uploading your files (${info}). Please try again later!`;
		console.error(errorMessage);
		console.exception(exception);
		if (this.onError)
			this.onError(errorMessage);
	}

	setProgress(index, value) {
		if (this.onProgress)
			this.onProgress(index, value);
		this.progress[index] = value;
		this.sendMetadataIfPossible(index);
	}

	setFinished(index, uploadName) {
		this.uploadNames[index] = uploadName;
		this.sendMetadataIfPossible(index);
	}

	sendMetadataIfPossible(index) {
		if (this.progress[index] === 100 && this.uploadNames[index] !== null) {
			const file_location = this.metadata[index].file_location;
			const file_category = this.metadata[index].file_category;
			const uploadName = this.uploadNames[index];
			storage.ref(uploadName).getDownloadURL().then(url => {
				this.imageInfo.push({
					path: uploadName,
					url: url,
					location: file_location,
					category: file_category
				});
				console.log(`[${index}] metadata registered for upload.`);
				this.terminateIfPossible();
			}).catch(e => {
				this.error(e, `unable to register metadata for file no. ${index}`);
			})
		}
	}

	terminateIfPossible() {
		if (this.imageInfo.length !== this.files.length)
			return;
		console.log(`Sending metadata.`);
		firebaseUploadCollection.doc(this.uploadID).update({
			images: this.imageInfo
		}).then((docRef) => {
			console.log(`Metadata sent, upload terminated.`);
			if (this.onEnd)
				this.onEnd(this.uploadID);
		}).catch(e => {
			this.error(e, 'unable to save metadata');
		});
	}

	start() {
		console.log(`Generating upload ID.`);
		firebaseUploadCollection.add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			images: null
		}).then(ref => {
			this.uploadID = ref.id;
			console.log(`Generated upload ID: ${this.uploadID}`);
			for (let i = 0; i < this.metadata.length; ++i)
				this.uploadFile(i);
		}).catch(e => {
			this.error(e, 'unable to generate upload ID');
		});
	}

	async uploadFile(index) {
		try {
			console.log(`[${index}] sending file.`);
			const file = this.files[index];
			const uploadName = `${firebaseUploadCollectionName}/${this.uploadID}/${index}.${mime.extension(file.type)}`;
			await storage.ref(uploadName).put(file).on('state_changed', (snapshot) => {
				const step = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				this.setProgress(index, Math.round(step));
			}, (error) => {
				this.error(error, `file no. ${index}`);
			}, () => {
				console.log(`[${index}] File uploaded.`);
				this.setFinished(index, uploadName);
			});
		} catch (e) {
			this.error(e, `file no. ${index}`);
		}
	};
}
