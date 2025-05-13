import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(item => item.id === product.id);
      if (existing) {
        state.items = state.items.filter(item => item.id !== product.id); // ลบออก
      } else {
        state.items.push(product); // เพิ่มเข้า
      }
    }
  }
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;