import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import {App} from "./App";

/**

 TODO (later) add autocompletion to "location" field (use Google API calls)

 TODO (later) limit 1 image size to 10MB

 TODO (later) Big images (e.g. >20MB) are not correctly loaded. How to do with them ? Do we accept them ?

 TODO (later) Upload page: the user experience can be improved by showing a progress bar to indicate images uploaded

 TODO Warning error inside tagImages when uploading on firebase.
 Seems an issue where the web app changes page (from upload page to thankyou page):
 -----
 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak
 in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
 in Tag Images with Description And GeoTags (created by Context.Consumer)
 in Route (at App.js:16) index.js:1375
 e index.js:1375
 React 5
 uploadDropfile tagImages.js:125
 async index.esm.js:2472

 * **/

ReactDOM.render(<App/>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
