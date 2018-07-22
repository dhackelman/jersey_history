import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';


//
// const database = firebase
//   .initializeApp(config)
//   .database()
//   .ref();



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
