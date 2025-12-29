// src/reducers/current-user-reducer.js
import { createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: null,
  reducers: {
    updateCurrentUser: (state, action) => {
      // expect a plain serializable user object or null
      return action.payload;
    },
    clearCurrentUser: () => null,
  },
});

export const { updateCurrentUser, clearCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
