
// src/reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';

import formVisibleReducer from './form-visible-reducer';
import selectedItemReducer from './selected-item-reducer';
import editReducer from './edit-reducer';
import adminReducer from './admin-reducer';
import currentUserReducer from './current-user-reducer';
import cartReducer from './cart-reducer';

import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

// If you want landing page reducer later, you can add it here
// import landingPageReducer from './landing-page-reducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,

  formVisibleOnPage: formVisibleReducer,
  editing: editReducer,
  selectedItem: selectedItemReducer,
  currentUser: currentUserReducer,
  admin: adminReducer,
  cart: cartReducer,

  // landingPage: landingPageReducer,
});

export default rootReducer;

