import { createSlice } from "@reduxjs/toolkit";
import { getEvent, getMoreEvent } from "./eventPageAction.js";

const initialState = {
  event: {},
  moreEvents: [],
  isLoading: false,
  success: null,
  error: null,
};

export const eventPageSlice = createSlice({
  name: "homeEvent",
  initialState,
  reducers: {},
  extraReducers: {
    [getEvent.pending]: (state) => {
      state.isLoading = true;
    },
    [getEvent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
    },
    [getEvent.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getMoreEvent.pending]: (state) => {
      state.isLoading = true;
    },
    [getMoreEvent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.moreEvents = action.payload;
    },
    [getMoreEvent.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default eventPageSlice.reducer;
