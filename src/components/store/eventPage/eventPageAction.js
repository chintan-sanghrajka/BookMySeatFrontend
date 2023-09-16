import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./../../common/helper.js";

export const getEvent = createAsyncThunk(
  "getEvent",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}get-event`, {
        eventId: args,
      });
      return res.data.event[0];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMoreEvent = createAsyncThunk(
  "getMoreEvent",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}get-events`, {
        categoryId: "",
        keys: args,
        reqType: "keys",
        limit: 4,
      });
      return res.data.eventList;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
