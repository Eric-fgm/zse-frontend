import { configureStore } from "@reduxjs/toolkit";
import { reduxBatch } from "@manaflair/redux-batch";
import logger from "redux-logger";
import rootReducer from "app/store/rootReducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [reduxBatch],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
