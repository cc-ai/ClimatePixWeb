import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

firebase.initializeApp(firebaseConfig);
var firebaseUser = null;
// Listen for auth
firebase.auth().onAuthStateChanged(async user => {
	if (user) {
		firebaseUser = user.uid;
	} else {
		firebase.auth().signInAnonymously();
	}
});
firebase.auth().signInAnonymously().catch((error) => {
	console.error('Authentication error');
	console.error(error);
});


const storage = firebase.storage();
const firebaseUploadCollectionName = process.env.REACT_APP_DEV ? 'dev' : 'public';
const firebaseUploadCollection = firebase.firestore().collection(firebaseUploadCollectionName);
export {storage, firebaseUser, firebaseUploadCollection, firebaseUploadCollectionName}
