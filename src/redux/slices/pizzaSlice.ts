import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";
import { SortType } from "./filterSlice";

enum StatusEnum {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type SearchPizzaParams = {
  category: string;
  order: string;
  sortProperty: string;
  search: string;
  currentPage: string;
};

type PizzaType = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

interface PizzaSliceState {
  items: PizzaType[];
  status: StatusEnum | "";
}

export const fetchPizzas = createAsyncThunk<PizzaType[], SearchPizzaParams>(
  "users/fetchPizzaStatus",
  async (params) => {
    const { category, order, sortProperty, search, currentPage } = params;
    const { data } = await axios.get<PizzaType[]>(
      `https://629601fd810c00c1cb6d3288.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortProperty}&order=${order}${search}`
    );
    return data;
  }
);

const initialState: PizzaSliceState = {
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
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = StatusEnum.LOADING;
      state.items = [];
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<PizzaType[]>) => {
        state.status = StatusEnum.SUCCESS;
        state.items = action.payload;
      }
    );
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = StatusEnum.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizzas;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
