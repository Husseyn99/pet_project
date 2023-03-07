import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0
      );
    },
    itemIncrease: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          item.count++;
          state.totalPrice += item.price;
        }
        return item;
      });
    },
    itemDecrease: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          if (item.count > 0) {
            item.count--;
            state.totalPrice -= item.price;
          }
        }
        return item;
      });
    },
    removeItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      state.items.splice(action.payload.idx, 1);
      state.totalPrice = state.totalPrice - item.price * item.count;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) => state.cart.items.find((item) => item.id === id);

export const { addItems, itemDecrease, itemIncrease, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
