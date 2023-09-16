import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./../../common/helper.js";

export const getEventList = createAsyncThunk(
  "getHomeMovies",
  async ({ reqType, argument }, { rejectWithValue }) => {
    try {
      if (reqType === "cat") {
        const res = await axios.put(`${BASE_URL}get-events`, {
          categoryId: argument,
          limit: 25,
          keys: "",
          reqType: reqType,
        });
        return res.data.eventList;
      } else if (reqType === "keys") {
        const res = await axios.put(`${BASE_URL}get-events`, {
          categoryId: "",
          limit: 25,
          keys: argument,
          reqType: reqType,
        });
        return res.data.eventList;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
