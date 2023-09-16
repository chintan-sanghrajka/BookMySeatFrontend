import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./../../common/helper.js";

export const getHomeMovies = createAsyncThunk(
  "getHomeMovies",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}get-events`, {
        categoryId: args,
        limit: 4,
        keys: "",
        reqType: "cat",
      });
      return res.data.eventList;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getHomeSports = createAsyncThunk(
  "getHomeSports",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}get-events`, {
        categoryId: args,
        limit: 4,
        keys: "",
        reqType: "cat",
      });
      return res.data.eventList;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getHomeEvents = createAsyncThunk(
  "getHomeEvents",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}get-events`, {
        categoryId: args,
        limit: 4,
        keys: "",
        page: 1,
        reqType: "cat",
      });
      return res.data.eventList;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCategories = createAsyncThunk(
  "getCategories",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}get-categories`);
      return res.data.categoryList;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
