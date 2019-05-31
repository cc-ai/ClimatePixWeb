import  firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
        apiKey: "AIzaSyDzXQcHJK_NYLXSKtf45C6Skz_9WRBBbLY",
        authDomain: "ccai-46e86.firebaseapp.com",
        databaseURL: "https://ccai-46e86.firebaseio.com",
        projectId: "ccai-46e86",
        storageBucket: "ccai-46e86.appspot.com",
        messagingSenderId: "391004789804",
        appId: "1:391004789804:web:9fcc67c4bd849e4d"
    };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firestore_collection = firebase.firestore().collection("images/");
export {
    storage, firestore_collection
}
