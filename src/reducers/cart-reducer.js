// src/reducers/cart-reducer.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add it with quantity 1
        state.push({
          ...item,
          quantity: 1
        });
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      return state.filter(item => item.id !== itemId);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find(cartItem => cartItem.id === id);
      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          return state.filter(cartItem => cartItem.id !== id);
        }
        item.quantity = quantity;
      }
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.find(cartItem => cartItem.id === itemId);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.find(cartItem => cartItem.id === itemId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove item if quantity would be 0
          return state.filter(cartItem => cartItem.id !== itemId);
        }
      }
    },
    clearCart: () => [],
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  incrementQuantity, 
  decrementQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;

