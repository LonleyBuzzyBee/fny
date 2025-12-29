// src/reducers/edit-reducer.js
import { createSlice } from '@reduxjs/toolkit';

const editSlice = createSlice({
  name: 'editing',
  initialState: false,
  reducers: {
    startEditing: () => true,
    stopEditing: () => false,
    toggleEditing: (state) => !state,
  },
});

export const { startEditing, stopEditing, toggleEditing } = editSlice.actions;
export default editSlice.reducer;
