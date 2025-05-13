import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    // เพิ่มสินค้าในรถเข็น
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find(item => item.id === product.id);
      
      if (existingProduct) {
        existingProduct.quantity += 1; // เพิ่มจำนวนสินค้า
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    // ลบสินค้าออกจากรถเข็น
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
    },
    // เพิ่มหรือลดจำนวนสินค้า
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.items.find(item => item.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;