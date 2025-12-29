// src/components/Routes/Auth.js (adjust path if different)
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase'; // compat auth from firebase.js
import { useSelector, useDispatch } from 'react-redux';
import * as a from '../../actions';
import { clearAdmin } from '../../reducers/admin-reducer';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState(null);
  const isAdmin = useSelector(state => state.admin);

  useEffect(() => {
    // compat-style auth listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const plainUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
        };

        // set local state
        setCurrentUser(plainUser);

        // update redux - Redux Toolkit action expects payload
        dispatch(a.updateCurrentUser(plainUser));

        // admin check
        if (plainUser.email === 'admin@email.com') {
          dispatch(a.isAdmin());
        } else {
          // Clear admin if not admin user
          dispatch(clearAdmin());
        }
      } else {
        // user signed out
        setCurrentUser(null);
        dispatch(a.updateCurrentUser(null));
        dispatch(clearAdmin());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  console.log('isAdmin:', isAdmin);
  console.log('currentUser:', currentUser);

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

