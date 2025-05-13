import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import favoriteSlice from './slices/favoriteSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorite: favoriteSlice
  },
});