import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItemType = {
  id: string;
  image: string;
  price: number;
  size: number;
  title: string;
  type: string;
  count: number;
  idx: number;
};

interface ICartSliceState {
  items: CartItemType[];
  totalPrice: number;
}

const initialState: ICartSliceState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<CartItemType>) => {
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
    itemIncrease: (state, action: PayloadAction<string>) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          item.count++;
          state.totalPrice += item.price;
        }
        return item;
      });
    },
    itemDecrease: (state, action: PayloadAction<string>) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          item.count--;
          state.totalPrice -= item.price;
        }
        return item;
      });
    },
    removeItem: (state, action: PayloadAction<CartItemType>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      state.items.splice(action.payload.idx, 1);
      state.totalPrice = item
        ? state.totalPrice - item.price * item.count
        : state.totalPrice;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

export const { addItems, itemDecrease, itemIncrease, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
