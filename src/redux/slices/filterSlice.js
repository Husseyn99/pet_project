import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: 0,
  sort: {
    name: "популярности",
    typeProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setCategory, setSort } = filterSlice.actions;

export default filterSlice.reducer;
