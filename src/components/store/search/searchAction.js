import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./../../common/helper.js";

export const getEventListSearch = createAsyncThunk(
  "getSearchMovies",
  async (argument, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}get-events`, {
        categoryId: "",
        limit: 25,
        keys: argument,
        reqType: "keys",
      });
      return res.data.eventList;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
