// src/reducers/form-visible-reducer.js
import { createSlice } from '@reduxjs/toolkit';

const formVisibleSlice = createSlice({
  name: 'formVisibleOnPage',
  initialState: false,
  reducers: {
    showForm: () => true,
    hideForm: () => false,
    toggleForm: (state) => !state,
  },
});

export const { showForm, hideForm, toggleForm } = formVisibleSlice.actions;
export default formVisibleSlice.reducer;
