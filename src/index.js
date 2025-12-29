// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './components/App';
// import { configureStore } from '@reduxjs/toolkit';
// import {Provider} from 'react-redux';
// import rootReducer from './reducers/index';
// import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
// import { createFirestoreInstance } from 'redux-firestore';
// import {app} from "./firebase";
// import firebase from "firebase/app"
// // import 'firebase/auth';
// import './index.css';
// import { Buffer } from 'buffer';
// window.Buffer = Buffer;


// const store = configureStore(rootReducer);

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// )

// src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
// import { createFirestoreInstance } from 'redux-firestore';

// import App from './components/App';
// import firebase from './firebase';
// import store from './store';

// const rrfConfig = {
//   userProfile: 'users',
//   useFirestoreForProfile: true,
// };

// const rrfProps = {
//   firebase,
//   config: rrfConfig,
//   dispatch: store.dispatch,
//   createFirestoreInstance,
// };

// ReactDOM.render(
//   <Provider store={store}>
//     <ReactReduxFirebaseProvider {...rrfProps}>
//       <App />
//     </ReactReduxFirebaseProvider>
//   </Provider>,
//   document.getElementById('root')
// );

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import App from './components/App';   // ⬅️ lives in src/components/App.js
import firebase from './firebase';    // ⬅️ default export from firebase.js
import store from './store';          // ⬅️ src/store.js

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

