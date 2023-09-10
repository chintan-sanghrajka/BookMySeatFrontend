import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./../../common/helper.js";

export const bookTicket = createAsyncThunk(
  "bookTicket",
  async (
    { eventId, totalPrice, totalTickets, userId, paymentId },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${BASE_URL}book-tickets`, {
        userId: userId,
        eventId: eventId,
        totalPrice: totalPrice,
        totalTickets: totalTickets,
        paymentId: paymentId,
      });
      return res.data.status;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTickets = createAsyncThunk(
  "getTickets",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}get-tickets`, {
        userId: args,
      });
      return res.data.bookingList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cancelTickets = createAsyncThunk(
  "cancelTickets",
  async ({ bookingId, totalTickets }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}cancel-tickets`, {
        bookingId: bookingId,
        totalTickets: totalTickets,
      });
      return res.data.status;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
