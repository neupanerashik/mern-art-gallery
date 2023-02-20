import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  },

  reducers: {
    addToCart: (state, action) => {
      const art = action.payload;
      const find = state.cartItems.find(item => item.id === art.id);

      if(find === undefined){
        state.cartItems.push(art);  
      }else{
        const newCartItems = state.cartItems.filter(item => item.id !== art.id);
        state.cartItems = newCartItems;  
      }

      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    deleteFromCart: (state, action) => {
      const newCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
      state.cartItems = newCartItems;
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToCart, deleteFromCart} = cartSlice.actions

export default cartSlice.reducer