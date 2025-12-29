// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // RRF dispatches actions with Firebase User objects, etc.
        ignoredActions: [
          '@@reactReduxFirebase/LOGIN',
          '@@reactReduxFirebase/SET_PROFILE',
          '@@reactReduxFirebase/SET_AUTH',
          '@@reactReduxFirebase/SET_LISTENER',
          '@@reactReduxFirebase/UNSET_LISTENER',
          // Ignore redux-firestore error actions
          '@@redux-firestore/ERROR',
          '@@redux-firestore/LISTENER_ERROR',
          '@@redux-firestore/GET_ERROR',
          '@@redux-firestore/SET_ERROR',
          '@@redux-firestore/ADD_ERROR',
          '@@redux-firestore/UPDATE_ERROR',
          '@@redux-firestore/DELETE_ERROR',
        ],
        ignoredPaths: ['firebase', 'firestore'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
