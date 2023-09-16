import { createSlice } from "@reduxjs/toolkit";
import { getEventList } from "./eventListAction.js";

const initialState = {
  eventsList: [],
  isLoading: false,
  success: null,
  error: null,
};

export const eventListSlice = createSlice({
  name: "homeEvent",
  initialState,
  reducers: {},
  extraReducers: {
    [getEventList.pending]: (state) => {
      state.isLoading = true;
    },
    [getEventList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.eventsList = action.payload;
    },
    [getEventList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default eventListSlice.reducer;
