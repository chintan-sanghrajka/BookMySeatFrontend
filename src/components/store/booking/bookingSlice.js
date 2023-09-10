import { createSlice } from "@reduxjs/toolkit";
import { bookTicket, getTickets, cancelTickets } from "./bookingAction.js";

const initialState = {
  bookingList: [],
  isLoading: false,
  success: null,
  error: null,
};

export const bookingListSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [bookTicket.pending]: (state) => {
      state.isLoading = true;
    },
    [bookTicket.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
    },
    [bookTicket.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getTickets.pending]: (state) => {
      state.isLoading = true;
    },
    [getTickets.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bookingList = action.payload;
    },
    [getTickets.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [cancelTickets.pending]: (state) => {
      state.isLoading = true;
    },
    [cancelTickets.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
    },
    [cancelTickets.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export default bookingListSlice.reducer;
