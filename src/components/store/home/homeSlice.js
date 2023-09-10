import { createSlice } from "@reduxjs/toolkit";
import {
  getHomeMovies,
  getHomeSports,
  getHomeEvents,
  getCategories,
} from "./homeActions.js";

const initialState = {
  moviesList: [],
  sportsList: [],
  eventsList: [],
  categories: [],
  isLoading: false,
  success: null,
  error: null,
};

export const homeEventSlice = createSlice({
  name: "homeEvent",
  initialState,
  reducers: {},
  extraReducers: {
    [getHomeMovies.pending]: (state) => {
      state.isLoading = true;
    },
    [getHomeMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.moviesList = action.payload;
    },
    [getHomeMovies.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    [getHomeSports.pending]: (state) => {
      state.isLoading = true;
    },
    [getHomeSports.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.sportsList = action.payload;
    },
    [getHomeSports.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getHomeEvents.pending]: (state) => {
      state.isLoading = true;
    },
    [getHomeEvents.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.eventsList = action.payload;
    },
    [getHomeEvents.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
    [getCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default homeEventSlice.reducer;
