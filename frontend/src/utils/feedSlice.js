import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      const refreshedFeed = state.filter((user) => user._id !== action.payload);
      return refreshedFeed;
    },
  },
});

export const { addFeed, removeUser } = feedSlice.actions;

export default feedSlice.reducer;
