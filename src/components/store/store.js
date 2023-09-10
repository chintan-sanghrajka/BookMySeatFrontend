import { configureStore } from "@reduxjs/toolkit";
import homeEventReducer from "./home/homeSlice.js";
import eventListSlice from "./eventList/eventListSlice.js";
import eventPageSlice from "./eventPage/eventPageSlice.js";
import bookingListSlice from "./booking/bookingSlice.js";

const store = configureStore({
  reducer: {
    home: homeEventReducer,
    eventList: eventListSlice,
    eventPage: eventPageSlice,
    booking: bookingListSlice,
  },
});

export default store;
