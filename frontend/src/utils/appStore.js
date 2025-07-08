import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import connectionsReducer from "./connectionsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    connections: connectionsReducer,
  },
});

export default store;
