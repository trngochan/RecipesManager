import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./RootReducer"; // Import rootReducer

const store = configureStore({
  reducer: rootReducer, // Chỉ định rootReducer cho store
});

export default store;
