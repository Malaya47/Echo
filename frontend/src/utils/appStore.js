import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import connectionsReducer from "./connectionsSlice";
import requestsReducer from "./requestsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
  },
});

export default store;
