import { createSlice } from "@reduxjs/toolkit";
import { getEventListSearch } from "./searchAction.js";

const initialState = {
  searchList: [],
  isLoading: false,
  success: null,
  error: null,
};

export const searchListSlice = createSlice({
  name: "searchEvent",
  initialState,
  reducers: {},
  extraReducers: {
    [getEventListSearch.pending]: (state) => {
      state.isLoading = true;
    },
    [getEventListSearch.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.searchList = action.payload;
    },
    [getEventListSearch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default searchListSlice.reducer;
