// src/reducers/admin-reducer.js
import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: false,
  reducers: {
    // Explicit on/off is much safer than toggling
    setAdmin: () => true,
    clearAdmin: () => false,
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
