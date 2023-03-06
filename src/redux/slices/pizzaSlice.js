import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "users/fetchPizzaStatus",
  async (params) => {
    const { category, order, sortProperty, search, currentPage } = params;
    const { data } = await axios.get(
      `https://629601fd810c00c1cb6d3288.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortProperty}&order=${order}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
